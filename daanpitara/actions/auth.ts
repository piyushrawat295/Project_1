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
  role: z.enum(['ngo', 'user']), // Admin removed from public signup
  organizationName: z.string().optional(),
});

const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const AdminSigninSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  secretKey: z.string().min(1, "Security key is required"),
});

export async function signup(prevState: any, formData: FormData) {
  // Validate form fields
  const role = formData.get('role');
  
  // Custom validation for organizationName if role is ngo
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    role: role,
    organizationName: formData.get('organizationName'),
  };

  const validatedFields = SignupSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password, role: parsedRole, organizationName } = validatedFields.data;

  // Extra validation for NGO
  if (parsedRole === 'ngo' && !organizationName) {
    return {
      errors: {
        organizationName: ['Organization name is required for NGOs.'],
      },
    };
  }

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
      role: parsedRole,
      organizationName: parsedRole === 'ngo' ? organizationName : null,
    }).returning({ id: users.id });

    // Create session
    await createSession(newUser.id, parsedRole);
  } catch (error) {
    console.error('Signup Error:', error);
    return {
      message: 'Database Error: Failed to Create User.',
    };
  }

  // Redirect to home page for all roles as per user request
  redirect('/');
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

  // Prevent Admin login via standard form
  if (user.role === 'admin') {
    return {
      message: 'Admins must use the Admin Login portal.',
    };
  }

  if (!user.password) {
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

  redirect('/');
}

export async function loginAdmin(prevState: any, formData: FormData) {
  const validatedFields = AdminSigninSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    secretKey: formData.get('secretKey'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password, secretKey } = validatedFields.data;

  // Validate Secret Key
  if (secretKey !== process.env.ADMIN_SECRET_KEY) {
     return {
      message: 'Invalid Security Key.',
    };
  }

  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user || user.role !== 'admin') {
     // Don't reveal if it's user existence or role mismatch, or simplify:
     // If user doesn't exist or isn't admin, fail.
     return {
      message: 'Invalid Admin credentials.',
    };
  }

  if (!user.password) {
     return {
      message: 'Invalid Admin credentials.',
    };
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    return {
      message: 'Invalid Admin credentials.',
    };
  }

  await createSession(user.id, 'admin');
  redirect('/');
}

export async function logout() {
  await deleteSession();
  redirect('/signin');
}
