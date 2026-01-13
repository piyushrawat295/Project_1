'use server';

import { db } from '@/lib/db';
import { users } from '@/lib/schema';

import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const SignupSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
  // role: z.enum(['ngo', 'user']), // Admin removed from public signup - Defaults to NGO now
  organizationName: z.string().min(2, { message: "Organization name is required." }), 
});

export async function signup(prevState: any, formData: FormData) {
  // Validate form fields
  // const role = formData.get('role'); // Removed role selection
  
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    // role: role,
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

    // Custom session creation removed - User will need to sign in manually or we can auto-signin (but tricky with NextAuth Credentials server-side)
    // For now, redirect to signin page or allow auto-login on client side?
    // Easiest flow: Redirect to signin with a "Account created" message.
    
  } catch (error) {
    console.error('Signup Error:', error);
    return {
      message: 'Database Error: Failed to Create User.',
    };
  }

  redirect('/signin?success=Account created. Please log in.');
}

/**
 * @deprecated Use signIn('credentials') from next-auth/react instead
 */
export async function signin(prevState: any, formData: FormData) {
  return { message: "Please use the new login form." };
}

/**
 * @deprecated Use signIn('credentials') from next-auth/react instead
 */
export async function loginAdmin(prevState: any, formData: FormData) {
    return { message: "Please use the new login form." };
}

export async function logout() {
  // await deleteSession(); // Removed
  redirect('/signin');
}
