import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
if (!GOOGLE_CLIENT_ID) throw new Error('invalid env variable: GOOGLE_CLIENT_ID');

if (!GOOGLE_CLIENT_SECRET) throw new Error('invalid env variable: GOOGLE_CLIENT_SECRET');

const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    })
  ],
  session: {
    // 세션 쿠키의 유효 기간 (초 단위) 1일로 설정
    maxAge: 24 * 60 * 60
  }
};

export default NextAuth(options);
