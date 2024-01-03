import { db } from '@/common/firebase_RK';
import { useInfiniteQuery } from '@tanstack/react-query';
import { collection, query, where, getDocs, limit, startAt, endAt, startAfter, orderBy } from 'firebase/firestore';
import { isExist } from '../../common/utils/hook/useIsExisted';

export const fetchGetPhotoData = async (id: string | string[]) => {
  let searchId = typeof id === 'string' ? id : id[0];

  const q = query(collection(db, 'photos'), where('id', '==', searchId));

  const tempArr: any = [];
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => tempArr.push(doc.data()));

  const proceed = await isExist(tempArr);
  return proceed.length > 0 ? proceed[0] : null;
};

export const fetchTagPhotoData = async (tags: string[]) => {
  const q = query(collection(db, 'photos'), where('tags', 'array-contains-any', tags), limit(3));

  const querySnapshot = await getDocs(q);
  const tempArr: any = [];
  const data = querySnapshot.docs.map((doc) => {
    tempArr.push(doc.data());
  });
  const proceedData = await isExist(tempArr);
  return proceedData;
};

export const fetchPhotoDatabyPage = async (lastDocSnapshot: any, tags: string[], PAGE_SIZE: number = 3) => {
  let q;

  if (lastDocSnapshot) {
    q = query(
      collection(db, 'photos'),
      orderBy('id'), // 혹은 다른 정렬 기준 필드
      startAfter(lastDocSnapshot),
      limit(PAGE_SIZE)
    );
  } else {
    q = query(
      collection(db, 'photos'),
      orderBy('id'), // 혹은 다른 정렬 기준 필드
      limit(PAGE_SIZE)
    );
  }

  const querySnapshot = await getDocs(q);

  const tempArr: any = [];
  const data = querySnapshot.docs.map((doc) => tempArr.push(doc.data()));
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  const proceed = await isExist(tempArr);
  return { proceed, lastVisible };
};
