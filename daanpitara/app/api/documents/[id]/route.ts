import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { documents, ngos } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import path from "path";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "@/lib/s3";

const ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { pathname } = new URL(req.url);
    const documentId = pathname.split('/').pop()?.split('?')[0];

    if (!documentId) {
      return NextResponse.json({ error: "Document ID required" }, { status: 400 });
    }

    const userId = parseInt(session.user.id);
    const userRole = (session.user as any).role;

    const docId = parseInt(documentId);
    if (isNaN(docId)) {
      return NextResponse.json({ error: "Invalid document ID" }, { status: 400 });
    }

    const doc = await db.query.documents.findFirst({
      where: eq(documents.id, docId),
    });

    if (!doc) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    let isAuthorized = false;

    if (userRole === 'admin') {
      isAuthorized = true;
    } else if (userRole === 'ngo' || userRole === 'user') {
      const ngo = await db.query.ngos.findFirst({
        where: eq(ngos.ownerId, userId),
      });

      if (ngo && ngo.id === doc.ngoId) {
        isAuthorized = true;
      }
    }

    if (!isAuthorized) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    if (!doc.url || doc.url === '#' || doc.url.startsWith('/mock/')) {
      return NextResponse.json({ error: "Document file not available" }, { status: 404 });
    }

    const objectKey = doc.url.startsWith('/') ? doc.url.substring(1) : doc.url;

    try {
      const getObjectParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: objectKey,
      };

      const command = new GetObjectCommand(getObjectParams);
      const s3Response = await s3Client.send(command);

      const ext = path.extname(doc.url).toLowerCase();
      const contentTypes: Record<string, string> = {
        '.pdf': 'application/pdf',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.doc': 'application/msword',
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      };
      const contentType = contentTypes[ext] || 'application/octet-stream';
      const filename = doc.name.replace(/[^a-zA-Z0-9.-]/g, '_') + ext;

      // Type cast the body to work with NextResponse
      const stream = s3Response.Body as unknown as ReadableStream;

      const isDownload = req.nextUrl.searchParams.get('download') === 'true';
      const dispositionType = isDownload ? 'attachment' : 'inline';

      return new NextResponse(stream, {
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': `${dispositionType}; filename="${filename}"`,
          'Content-Length': s3Response.ContentLength?.toString() || '',
          'Cache-Control': 'private, no-cache, no-store',
        },
      });
    } catch (s3Error: any) {
      if (s3Error.name === 'NoSuchKey') {
        return NextResponse.json({ error: "File not found on server" }, { status: 404 });
      }
      throw s3Error;
    }

  } catch (error) {
    console.error("Document download error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
