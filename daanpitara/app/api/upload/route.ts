import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import path from "path";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "@/lib/s3";

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

const ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = (session.user as any).role;

    if (userRole !== 'admin' && userRole !== 'ngo' && userRole !== 'user') {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const data = await req.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json({
        error: "Invalid file type. Allowed: PDF, JPG, PNG, DOC, DOCX"
      }, { status: 400 });
    }

    const MAX_PDF_SIZE = 2 * 1024 * 1024; // 2MB restriction for PDFs
    const MAX_OTHER_SIZE = 10 * 1024 * 1024; // 10MB for other types

    if (file.type === 'application/pdf' && file.size > MAX_PDF_SIZE) {
      return NextResponse.json({
        error: `Compressed PDF required. Maximum size is 2MB. Please compress your PDF before uploading.`
      }, { status: 400 });
    }

    if (file.type !== 'application/pdf' && file.size > MAX_OTHER_SIZE) {
      return NextResponse.json({
        error: `File too large. Maximum size is 10MB`
      }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const originalExt = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(originalExt)) {
      return NextResponse.json({
        error: "Invalid file extension"
      }, { status: 400 });
    }

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const sanitizedOriginalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${uniqueSuffix}-${sanitizedOriginalName}`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `uploads/${filename}`,
      Body: buffer,
      ContentType: file.type,
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    const url = `/uploads/${filename}`; // We store this path in DB and use our wrapper API

    return NextResponse.json({
      success: true,
      url,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
