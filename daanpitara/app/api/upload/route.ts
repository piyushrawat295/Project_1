import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import path from "path";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

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

export const runtime = 'nodejs';
export const maxDuration = 60; // 60 seconds (max for Hobby/Pro)

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token?.sub) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = token.role as string;

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

    const MAX_PDF_SIZE = 2 * 1024 * 1024;
    const MAX_OTHER_SIZE = 10 * 1024 * 1024;

    if (file.type === 'application/pdf' && file.size > MAX_PDF_SIZE) {
      return NextResponse.json({
        error: "Compressed PDF required. Maximum size is 2MB. Please compress your PDF before uploading."
      }, { status: 400 });
    }

    if (file.type !== 'application/pdf' && file.size > MAX_OTHER_SIZE) {
      return NextResponse.json({
        error: "File too large. Maximum size is 10MB"
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

    const s3Client = await getS3Client();

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `uploads/${filename}`,
      Body: buffer,
      ContentType: file.type,
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    const url = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 500 });
  }
}
