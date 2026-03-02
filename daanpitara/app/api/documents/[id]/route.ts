import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { documents, ngos } from "@/lib/schema";
import { eq } from "drizzle-orm";
import path from "path";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

const ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'];

async function getS3Client() {
  return new S3Client({
    region: process.env.AWS_REGION || "us-east-1",
    credentials: process.env.AWS_ACCESS_KEY_ID ? {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    } : undefined,
  });
}

// CRITICAL VERCEL FIX: Force Node runtime so Vercel does not attempt to compile S3 streaming functions to Edge
export const runtime = 'nodejs';
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token?.sub) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { pathname } = new URL(req.url);
    const documentId = pathname.split('/').pop()?.split('?')[0];

    if (!documentId) {
      return NextResponse.json({ error: "Document ID required" }, { status: 400 });
    }

    const userId = parseInt(token.sub);
    const userRole = token.role as string;

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
      const s3Client = await getS3Client();

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

      const isDownload = req.nextUrl.searchParams.get('download') === 'true';
      const dispositionType = isDownload ? 'attachment' : 'inline';

      const headers = new Headers();
      headers.set('Content-Type', contentType);
      headers.set('Content-Disposition', `${dispositionType}; filename="${filename}"`);
      headers.set('Cache-Control', 'private, no-cache, no-store');

      if (s3Response.ContentLength) {
        headers.set('Content-Length', s3Response.ContentLength.toString());
      }

      // CRITICAL VERCEL FIX: Must transform Node stream to Web Stream for Next.js 14 Response
      const webStream = s3Response.Body?.transformToWebStream();

      if (!webStream) {
        throw new Error("Failed to get response body stream from S3");
      }

      return new NextResponse(webStream, { headers });
    } catch (s3Error: any) {
      console.error("S3 Error:", s3Error);
      if (s3Error.name === 'NoSuchKey' || s3Error.code === 'NoSuchKey') {
        return NextResponse.json({ error: "File not found on server" }, { status: 404 });
      }
      return NextResponse.json({ error: "Failed to fetch document" }, { status: 500 });
    }

  } catch (error) {
    console.error("Document download error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

