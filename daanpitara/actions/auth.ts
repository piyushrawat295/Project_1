'use server';

import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { createSession, deleteSession } from '@/lib/session';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const SignupSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
  role: z.enum(['admin', 'ngo', 'user']),
});

const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function signup(prevState: any, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password, role } = validatedFields.data;

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
      role,
    }).returning({ id: users.id });

    // Create session
    await createSession(newUser.id, role);
  } catch (error) {
    return {
        message: 'Database Error: Failed to Create User.',
    }
  }

  // Redirect based on role
  if (role === 'admin') {
    redirect('/admin');
  } else if (role === 'ngo') {
    redirect('/ngo');
  } else {
    redirect('/');
  }
}

export async function signin(prevState: any, formData: FormData) {
  const validatedFields = SigninSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    return {
      message: 'Invalid email or password.',
    };
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    return {
      message: 'Invalid email or password.',
    };
  }

  await createSession(user.id, user.role);

  if (user.role === 'admin') {
    redirect('/admin');
  } else if (user.role === 'ngo') {
    redirect('/ngo');
  } else {
    redirect('/');
  }
}

export async function logout() {
  await deleteSession();
  redirect('/signin');
}
