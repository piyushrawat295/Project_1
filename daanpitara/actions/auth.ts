'use server';

import { db } from '@/lib/db';
import { users, ngos } from '@/lib/schema';

import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const SignupSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
  organizationName: z.string().min(2, { message: "Organization name is required." }),
});

export async function signup(prevState: any, formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    organizationName: formData.get('organizationName'),
  };

  const validatedFields = SignupSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password, organizationName } = validatedFields.data;

  // Check if user exists
  const existingUser = await db.select().from(users).where(eq(users.email, email));
  if (existingUser.length > 0) {
    return {
      errors: {
        email: ['User with this email already exists.'],
      },
    };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  try {
    const [newUser] = await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      role: 'ngo', // Defaulting to NGO
      organizationName: organizationName,
      provider: 'credentials',
    }).returning({ id: users.id });

    // Create a shell NGO profile immediately to track onboarding progress
    if (newUser) {
      await db.insert(ngos).values({
        ownerId: newUser.id,
        name: organizationName,
        verified: false,
      });
    }
  } catch (error) {
    console.error('Signup Error:', error);
    return {
      message: 'Database Error: Failed to Create User.',
    };
  }

  redirect('/signin?success=Account created. Please log in.');
}

export async function logout() {
  redirect('/signin');
}
