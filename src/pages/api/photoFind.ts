import { db } from '@/common/firebase_RK';
import { useInfiniteQuery } from '@tanstack/react-query';
import { collection, query, where, getDocs, limit, startAt, endAt, startAfter, orderBy } from 'firebase/firestore';
import { isExist } from '../../../utils/useIsExisted';

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
    // return doc.data();
  });
  const proceedData = await isExist(tempArr);
  return proceedData;
};

/* export const fetchPhotoDatabyPage = async (pageParms: number, tags: string[]) => {
  // 시작
  const PAGE_SIZE = 1;
  const from = PAGE_SIZE * pageParms;
  // 끝
  let q;
  if (from !== 0) {
    q = query(
      collection(db, 'photos'),
      // where('tags', 'array-contains-any', tags),
      orderBy('id'), // 예: 'createdAt' 필드로 정렬
      startAfter(from), // 마지막 문서의 'createdAt' 값
      limit(PAGE_SIZE)
    );
  } else {
    q = query(
      collection(db, 'photos'),
      // where('tags', 'array-contains-any', tags),
      orderBy('id'), // 예: 'createdAt' 필드로 정렬
      limit(PAGE_SIZE)
    );
  }
  
  const querySnapshot = await getDocs(q);
  console.log('docs is : ', querySnapshot.docs);
  const data = querySnapshot.docs.map((doc) => {
    return doc.data();
  });
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  // return { data, lastVisible };
  return data;
};
 */

export const fetchPhotoDatabyPage = async (lastDocSnapshot: any, tags: string[], PAGE_SIZE: number = 3) => {
  let q;
  console.log({ tags, PAGE_SIZE });
  if (lastDocSnapshot) {
    q = query(
      collection(db, 'photos'),
      // where('tags', 'array-contains-any', tags),
      orderBy('id'), // 혹은 다른 정렬 기준 필드
      startAfter(lastDocSnapshot),
      limit(PAGE_SIZE)
    );
  } else {
    q = query(
      collection(db, 'photos'),
      // where('tags', 'array-contains-any', tags),
      orderBy('id'), // 혹은 다른 정렬 기준 필드
      limit(PAGE_SIZE)
    );
  }

  const querySnapshot = await getDocs(q);

  const tempArr: any = [];
  const data = querySnapshot.docs.map((doc) => tempArr.push(doc.data()));
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  console.log({ lastVisible });
  const proceed = await isExist(tempArr);
  return { proceed, lastVisible };
};
