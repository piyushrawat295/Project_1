import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import GoogleProvider from 'next-auth/providers/google';
import LinkedInProvider from 'next-auth/providers/linkedin';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';


// Diagnostic logging
if (!process.env.NEXTAUTH_SECRET) {
  console.warn("⚠️ NEXTAUTH_SECRET is not set in environment variables. Using a fallback for development.");
}

export const authOptions: NextAuthOptions = {
  // Use env var or fallback for dev to prevent decryption errors if env is missing
  secret: process.env.NEXTAUTH_SECRET || 'fallback_secret_for_dev_only_do_not_use_in_prod',
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const dbUser = await db.query.users.findFirst({
          where: eq(users.email, credentials.email),
        });

        if (!dbUser || !dbUser.password) return null;

        const passwordsMatch = await bcrypt.compare(credentials.password, dbUser.password);

        if (!passwordsMatch) return null;

        return {
          id: dbUser.id.toString(),
          name: dbUser.name,
          email: dbUser.email,
          image: null,
          role: dbUser.role as string,
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID || '',
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
      authorization: {
        params: { scope: 'openid profile email' },
      },
      issuer: 'https://www.linkedin.com',
      jwks_endpoint: 'https://www.linkedin.com/oauth/openid/jwks',
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: 'user', // Default for type satisfaction, overridden in signIn
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'credentials') return true;
      
      if (!user.email) return false;

      let dbUser = await db.query.users.findFirst({
        where: eq(users.email, user.email),
      });

      if (!dbUser) {
        // Create new user via Social Auth - Default to NGO as per requirement
        try {
          const [newUser] = await db.insert(users).values({
            name: user.name || 'Unknown',
            email: user.email,
            role: 'ngo', // Defaulting to NGO
            provider: account?.provider || 'credentials',
            organizationName: null, // Will need to be filled later? Or maybe user is just a donor? 
                                    // User said "its for ngo so defult set for ngo". 
                                    // But social login lacks org name. 
                                    // Ideally we redirect them to an onboarding page, but for now we create as is.
          }).returning();
          dbUser = newUser;
        } catch (error) {
          console.error('Error creating user via Social Auth:', error);
          return false;
        }
      }
      
      // Inject rule into the user object so it propagates to JWT
      user.role = dbUser.role;
      user.id = dbUser.id.toString();

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
       return baseUrl;
    },
  },
};
