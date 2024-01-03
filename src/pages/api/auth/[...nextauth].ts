import { db } from '@/common/firebase_RK';
import { UserType } from '@/type/userType';
import { addDoc, collection, getDocs, query, where } from '@firebase/firestore';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
if (!GOOGLE_CLIENT_ID) throw new Error('invalid env variable: GOOGLE_CLIENT_ID');

if (!GOOGLE_CLIENT_SECRET) throw new Error('invalid env variable: GOOGLE_CLIENT_SECRET');

const addUser = async (user: UserType) => {
  try {
    // userData가 db에 있을 시 따로 추가 안 함
    const userRef = collection(db, 'users');
    const q = query(userRef, where('email', '==', user.email));
    const snapShot = await getDocs(q);
    const userArr: any = [];
    const userData = snapShot.forEach((user) => {
      userArr.push(user.data());
    });
    if (userArr.length === 1) {
      return;
    } else await addDoc(collection(db, 'users'), { ...user, liked: [] });
  } catch (err) {
    alert(err);
  }
};

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
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      addUser(user);
      return true;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(options);
