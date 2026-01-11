import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use 'gmail' or configure host/port manually
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOtpEmail(to: string, otp: string) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('⚠️ SETUP REQUIRED: SMTP_USER and SMTP_PASS env vars not found.');
    console.log(`📧 MOCK EMAIL TO: ${to}`);
    console.log(`🔐 OTP CODE: ${otp}`);
    return;
  }

  try {
    const info = await transporter.sendMail({
      from: `"DaanPitara Security" <${process.env.SMTP_USER}>`,
      to,
      subject: 'Your Password Reset OTP - DaanPitara',
      text: `Your OTP for password reset is: ${otp}. It expires in 10 minutes.`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #1572A1;">Password Reset Request</h2>
          <p>You requested to reset your password for DaanPitara.</p>
          <p>Your One-Time Password (OTP) is:</p>
          <h1 style="background: #f4f4f4; padding: 10px 20px; display: inline-block; letter-spacing: 5px; color: #333;">${otp}</h1>
          <p>This code expires in 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `,
    });
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    // Log OTP to console in dev anyway in case email fails
    if (process.env.NODE_ENV === 'development') {
       console.log(`📧 [FALLBACK] MOCK EMAIL TO: ${to} | OTP: ${otp}`);
    }
  }
}
