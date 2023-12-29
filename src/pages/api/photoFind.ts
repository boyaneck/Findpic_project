// import { db } from '@/common/firebase_yn';
import { db } from '@/common/firebase_hm';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const fetchGetPhotoData = async (id: string | string[]) => {
  let searchId = typeof id === 'string' ? id : id[0];

  const q = query(collection(db, 'photos'), where('id', '==', searchId));

  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => doc.data());

  return data.length > 0 ? data[0] : null;
};

export const fetchTagPhotoData = async (tags: string[]) => {
  const q = query(collection(db, 'photos'), where('tags', 'array-contains-any', tags));

  const querySnapshot = await getDocs(q);

  const data = querySnapshot.docs.map((doc) => {
    return doc.data();
  });

  return data;
};
