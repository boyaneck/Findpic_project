// import { db } from '@/common/firebase_yn';
import { db } from '@/common/firebase_RK';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

export const fetchGetPhotoData = async (id: string | string[]) => {
  let searchId = typeof id === 'string' ? id : id[0];

  const q = query(collection(db, 'photos'), where('id', '==', searchId));

  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => doc.data());

  return data.length > 0 ? data[0] : null;
};

export const fetchTagPhotoData = async (tags: string[]) => {
  console.log('tags', tags);
  const q = query(collection(db, 'photos'), where('tags', 'array-contains-any', tags), limit(3));

  const querySnapshot = await getDocs(q);

  const data = querySnapshot.docs.map((doc) => {
    return doc.data();
  });

  console.log(data);
  return data;
};
