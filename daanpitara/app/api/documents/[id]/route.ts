import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { documents, ngos } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import path from "path";
import fs from "fs";

const ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const documentId = searchParams.get('id');

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

    const filePath = path.join(process.cwd(), 'public', doc.url);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "File not found on server" }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
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

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'private, no-cache, no-store',
      },
    });

  } catch (error) {
    console.error("Document download error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
