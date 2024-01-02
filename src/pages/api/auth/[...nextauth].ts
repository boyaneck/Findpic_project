import { db } from '@/common/firebase_RK';
import { addDoc, collection } from 'firebase/firestore';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

type UserType = {
  id: string;
  name: string;
  email: string;
  image: string;
};

// firebase에 유저 데이터 등록
const addUser = async (user: UserType) => {
  try {
    await addDoc(collection(db, 'users'), { ...user, liked: [] });
  } catch (err) {
    alert(err);
  }
};

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.NEXT_PUBLIC_OAUTH_C_ID as any,
      clientSecret: process.env.NEXT_PUBLIC_OAUTH_SECRET as any
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      addUser(user);
      return true;
    },
    async redirect({ url, baseUrl }: any) {
      return '/';
    },
    async session({ session, token, user }: any) {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }: any) {
      return token;
    }
  }
};

export default NextAuth(authOptions);
