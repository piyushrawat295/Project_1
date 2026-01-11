'use server';

import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq, and, gt } from 'drizzle-orm';
import { sendOtpEmail } from '@/lib/mail';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
});

const ResetPasswordSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(6, 'OTP must be 6 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export async function requestOtp(prevState: any, formData: FormData) {
  const validatedFields = ForgotPasswordSchema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email } = validatedFields.data;

  // Check if user exists
  const existingUser = await db.select().from(users).where(eq(users.email, email));
  if (existingUser.length === 0) {
    // Return success even if user doesn't exist to prevent enumeration
    return {
      message: 'If an account exists with this email, an OTP has been sent.',
    };
  }

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  // Update User
  await db.update(users)
    .set({ otpCode: otp, otpExpiresAt: expiresAt })
    .where(eq(users.email, email));

  // Send Email
  await sendOtpEmail(email, otp);

  // Redirect to verify page with email as query param (or handle in state)
  // Using redirect here might reset the form state, but we want to move to next step.
  redirect(`/verify-otp?email=${encodeURIComponent(email)}`);
}

export async function resetPassword(prevState: any, formData: FormData) {
  const email = formData.get('email') as string; // Hidden field
  
  const validatedFields = ResetPasswordSchema.safeParse({
    email: email,
    otp: formData.get('otp'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { otp, password } = validatedFields.data;

  // Find user with matching Email, OTP, and Not Expired
  const [user] = await db.select().from(users).where(
    and(
      eq(users.email, email),
      eq(users.otpCode, otp),
      gt(users.otpExpiresAt, new Date())
    )
  );

  if (!user) {
    return {
      message: 'Invalid or expired OTP.',
    };
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update User
  await db.update(users)
    .set({ 
      password: hashedPassword, 
      otpCode: null, 
      otpExpiresAt: null 
    })
    .where(eq(users.id, user.id));

  redirect('/signin?reset=success');
}
