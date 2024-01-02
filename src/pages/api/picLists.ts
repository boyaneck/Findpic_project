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
  //    검색어만 들어올때-------------
  // tag =ALL  likes=undefined  searchKeyword = "검색어"
  const keywords = searchKeyword.toLowerCase().split(' ').filter(Boolean);
  if (keywords.length > 0) {
    const lastVisible = pageParam;
    console.log('키워드', keywords);
    let w;
    if (lastVisible === 0) {
      w = query(sampleCollection, where('tags', 'array-contains-any', keywords), limit(2));
      alert('dul');
      console.log('lastvisible28', lastVisible);
    } else {
      w = query(sampleCollection, where('tags', 'array-contains-any', keywords), startAfter(lastVisible), limit(2));
    }
    const Snapshot = await getDocs(w);
    console.log('스냅샷', Snapshot.docs);
    const pictureList = Snapshot.docs.map((doc) => {
      const data = doc.data() as PicList;
      console.log('검색했을때의 데이터 가져와 ', data);
      return data;
    });

    return {
      data: pictureList,
      lastVisible: Snapshot.docs[Snapshot.docs.length - 1]
    };
  }
  // ---------------------------------------------------
  // if (tag && likes === 'undefined') {
  //   일단 먼저 말씀드리면 저 위에 부분 가정이 잘못됐어여. 태그 눌러서 검색안해도 처음에 항상 tag 는 'ALL' 이라서 안으로 들어오고 이안에서 startAfter는 lastVisible 값에 따른 분기처리를 안해놔서 생긴 오류였어여
  //태그만 들어올때-------------
  //

  //처음 화면을 접속했을 때 는 곳
  if (tag === 'ALL' || likes === 'undefined' || searchKeyword === '') {
    let q;
    console.log('검색어가눌렸을 때 여기를 들어오면 안됩니다!', searchKeyword);
    console.log('tag', tag);
    console.log('likes', likes);
    console.log('searchKeyword', searchKeyword);
    if (tag === 'ALL') {
      const lastVisible = pageParam;

      console.log('처음화면에만 들어오는 곳 ', lastVisible);
      const next = query(sampleCollection, orderBy('id'), startAfter(lastVisible), limit(2));
      console.log('쿼리가 실행된 ', lastVisible);
      console.log();
      const nextresult = await getDocs(next);

      const pictureList = nextresult.docs.map((doc) => {
        const data = doc.data() as PicList;

        return data;
      });

      return {
        data: pictureList,
        lastVisible: nextresult.docs[nextresult.docs.length - 1]
      };
    } else {
      console.log('else');
      const lastVisible = pageParam;
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
