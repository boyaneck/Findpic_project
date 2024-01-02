import { db } from '@/common/firebase_hm';
import { PicList } from '@/type/picListsType';
import { collection, getDocs, query, orderBy, limit, where, startAfter } from 'firebase/firestore';

// 필터링하여 검색하기 (3개의 인자를 받음 :태그,검색어,좋아요)-------------
export const fetchSearchedListByTag = async (
  tag: string,
  searchKeyword: string,
  likes: sortedByLike,
  pageParam: any
): Promise<PicList[]> => {
  const sampleCollection = collection(db, 'photos');

  //   // 검색어만 들어올때-------------
  const keywords = searchKeyword.toLowerCase().split(' ').filter(Boolean);
  console.log('keyword:', keywords);
  if (keywords.length > 0) {
    console.log('pageParam!!!', pageParam);
    const lastVisible = pageParam;
    console.log('lastvisible', lastVisible);
    let w;
    if (lastVisible === 0) {
      w = query(sampleCollection, where('tags', 'array-contains', keywords), limit(2));
      console.log('wwwwwwwwwwwwwwww', w);
      alert('dul');
    } else {
      console.log('keywords!', keywords);
      console.log('lastvisible28', lastVisible);

      w = query(sampleCollection, where('tags', 'array-contains', keywords), startAfter(lastVisible), limit(2));
    }
    ////

    // const q = query(sampleCollection, where('tags', 'array-contains-any', keywords), limit(2));
    const Snapshot = await getDocs(w);
    console.log('Snapshot', Snapshot);

    // const pictureList: PicList[] = Snapshot.docs.map((doc) => doc.data() as PicList);
    // // console.log('검색 결과 in picLists', pictureList);
    // return pictureList;

    const pictureList = Snapshot.docs.map((doc) => {
      const data = doc.data() as PicList;
      return data;
    });

    return {
      data: pictureList,
      lastVisible: Snapshot.docs[Snapshot.docs.length - 1]
    };
  }

  //태그만 들어올때-------------
  if (tag && likes === 'undefined') {
    let q;
    if (tag === 'ALL') {
      const lastVisible = pageParam;
      // console.log({ lastVisible });
      console.log('lastVisible58', lastVisible);
      const next = query(sampleCollection, orderBy('id'), startAfter(lastVisible), limit(2));

      const nextresult = await getDocs(next);
      // console.log({ docs: nextresult.docs });
      // alert('tag 타고들어옴');
      const pictureList = nextresult.docs.map((doc) => {
        const data = doc.data() as PicList;
        // // console.log('얍얍얍얍', data, '페이지파람', pageParam);

        return data;
      });

      return {
        data: pictureList,
        lastVisible: nextresult.docs[nextresult.docs.length - 1]
      };
      // q = query(sampleCollection);
    } else {
      console.log('else');
      const lastVisible = pageParam;
      // console.log({ lastVisible });
      if (lastVisible === 0) {
        q = query(sampleCollection, where('tags', 'array-contains', tag), limit(2));
        console.log('q:', q);
      } else {
        console.log('lastVisible83', lastVisible);
        q = query(sampleCollection, where('tags', 'array-contains', tag), startAfter(lastVisible), limit(2));
      }

      const nextresult = await getDocs(q);
      const pictureList = nextresult.docs.map((doc) => {
        const data = doc.data() as PicList;

        return data;
      });

      return {
        data: pictureList,
        lastVisible: nextresult.docs[nextresult.docs.length - 1]
      };
    }

    // const Snapshot = await getDocs(q);
    // const pictureList = Snapshot.docs.map((doc) => {
    //   const data = doc.data() as PicList;
    //   return data;
    // });

    // return pictureList;
  }
};
