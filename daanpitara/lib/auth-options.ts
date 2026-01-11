import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import LinkedInProvider from 'next-auth/providers/linkedin';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { createSession } from '@/lib/session';

export const authOptions: NextAuthOptions = {
  providers: [
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
      if (!user.email) return false;

      let dbUser = await db.query.users.findFirst({
        where: eq(users.email, user.email),
      });

      if (!dbUser) {
        // Create new user
        try {
          const [newUser] = await db.insert(users).values({
            name: user.name || 'Unknown',
            email: user.email,
            role: 'user', 
            provider: account?.provider || 'credentials',
            organizationName: null,
          }).returning();
          dbUser = newUser;
        } catch (error) {
          console.error('Error creating user via Social Auth:', error);
          return false;
        }
      }

      // Create Custom Session (Hybrid Approach: NextAuth handles auth, we handle session)
      // This sets the cookie that the middleware looks for
      await createSession(dbUser.id, dbUser.role as 'admin' | 'ngo' | 'user');

      return true;
    },
    async redirect({ url, baseUrl }) {
      // Always redirect to home after social login
      return baseUrl;
    },
  },
};
