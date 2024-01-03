import { db } from '@/common/firebase_RK';
import { PicList } from '@/type/picListsType';
import { collection, getDocs, query, orderBy, limit, where, startAfter } from 'firebase/firestore';
import { isExist } from '../../common/utils/hook/useIsExisted';

// 필터링하여 검색하기 (3개의 인자를 받음 :태그,검색어,좋아요)-------------
export const fetchSearchedListByTag = async (
  tag: string,
  searchKeyword: string,
  likes: sortedByLike,
  pageParam: any
): Promise<{ data: PicList[]; lastVisible: any } | undefined> => {
  const sampleCollection = collection(db, 'photos');
  //    검색어만 들어올때-------------
  const keywords = searchKeyword.toLowerCase().split(' ').filter(Boolean);
  if (keywords.length > 0) {
    const lastVisible = pageParam;
    let w;
    if (lastVisible === 0) {
      w = query(sampleCollection, where('tags', 'array-contains-any', keywords), limit(2));
    } else {
      w = query(sampleCollection, where('tags', 'array-contains-any', keywords), startAfter(lastVisible), limit(2));
    }
    const Snapshot = await getDocs(w);
    const tempArr: PicList[] = [];
    const pictureList = Snapshot.docs.map((doc) => {
      const data = doc.data() as PicList;
      tempArr.push(data);
    });

    const proceedData = await isExist(tempArr);
    return {
      data: proceedData as PicList[],
      lastVisible: Snapshot.docs[Snapshot.docs.length - 1]
    };
  }

  //태그만 들어올때
  //처음 화면을 접속했을 때 는 곳
  if (tag === 'ALL' || likes === 'undefined' || searchKeyword === '') {
    let q;

    if (tag === 'ALL') {
      const lastVisible = pageParam;

      const next = query(sampleCollection, orderBy('id'), startAfter(lastVisible), limit(2));
      const nextresult = await getDocs(next);
      const tempArr: PicList[] = [];
      const pictureList = nextresult.docs.map((doc) => {
        const data = doc.data() as PicList;
        tempArr.push(data);
      });
      const proceedData = await isExist(tempArr);

      return {
        data: proceedData,
        lastVisible: nextresult.docs[nextresult.docs.length - 1]
      };
    } else {
      const lastVisible = pageParam;
      if (lastVisible === 0) {
        q = query(sampleCollection, where('tags', 'array-contains', tag), limit(2));
      } else {
        q = query(sampleCollection, where('tags', 'array-contains', tag), startAfter(lastVisible), limit(2));
      }

      const tempArr: PicList[] = [];
      const nextresult = await getDocs(q);
      const pictureList = nextresult.docs.map((doc) => {
        const data = doc.data() as PicList;
        tempArr.push(data);
      });
      const proceedData = await isExist(tempArr);

      return {
        data: proceedData,
        lastVisible: nextresult.docs[nextresult.docs.length - 1]
      };
    }
  }
};
