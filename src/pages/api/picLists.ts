import { db } from '@/common/firebase_RK';
import { PicList } from '@/type/picListsType';
import { collection, getDocs, query, orderBy, limit, where } from 'firebase/firestore';

//초기 데이터를 가져오는
export const getPicsList = async () => {
  const sampleCollection = collection(db, 'photos');
  const q = query(sampleCollection, orderBy('id'), limit(5)); // 필요한 경우 정렬 방식을 지정할 수 있습니다.

  try {
    const snapshot = await getDocs(q); // query로부터 데이터를 가져옵니다.
    const picList = snapshot.docs.map((doc) => doc.data()); // 각 문서의 데이터를 가져옵니다.

    return picList; // 데이터를 반환합니다.
  } catch (error) {
    console.error('Error getting documents: ', error);
    throw error;
  }
};

// 태그검색
export const fetchSearchedListByTag = async (
  tag: string,
  searchKeyword: string,
  likes: sortedByLike
): Promise<PicList[]> => {
  const sampleCollection = collection(db, 'photos');
  //3개의 인자를 받는다 , 태그,검색어,좋아요
  //태그만 값이 들어올때 -> ()=>{}
  //검색어만 들어 올때  ->  ()=>{}
  //좋아요만 들어올 때 -> ()=>{}
  //
  //검색어만 들어올때
  if (searchKeyword) {
    const sampleCollection = collection(db, 'photos');
    const q = query(sampleCollection, where('tags', 'array-contains', searchKeyword.toLowerCase()));

    const Snapshot = await getDocs(q);
    const pictureList: PicList[] = Snapshot.docs.map((doc) => doc.data() as PicList);
    return pictureList;
  }
  //태그만 들어올때
  if (tag) {
    let q;
    if (tag === 'ALL') {
      q = query(sampleCollection);
    } else {
      q = query(sampleCollection, where('tags', 'array-contains', tag));
    }

    const Snapshot = await getDocs(q);
    const pictureList = Snapshot.docs.map((doc) => {
      const data = doc.data() as PicList;
      return data;
    });

    return pictureList;
  }
  //좋아요만 들어왔을 때
  if (likes) {
    const sampleCollection = collection(db, 'photos');
    const q = query(sampleCollection, orderBy('likes', 'desc'), limit(5));

    const snapshot = await getDocs(q);
    const picList = snapshot.docs.map((doc) => {
      const data = doc.data() as PicList;
      return data;
    });

    return picList;
  }
  //일단 여기는 보류
  return [];
};

// 검색어로 데이터 검색하기
// export const searchByKeyword = async (e: React.FormEvent) => {
//   e.preventDefault();
export const searchByKeyword = async (e: React.FormEvent, searchKeyword: string) => {
  // e.preventDefault();
  // if (!searchKeyword) {
  //   // 검색어가 비어있으면 검색 초기화
  //   setIsSearching(false);
  //   // setSearchedPictures([]);
  //   return;
  // }

  const sampleCollection = collection(db, 'photos');
  const q = query(sampleCollection, where('tags', 'array-contains', searchKeyword.toLowerCase()));

  const Snapshot = await getDocs(q);
  const pictureList: PicList[] = Snapshot.docs.map((doc) => doc.data() as PicList);

  // setIsSearching(true);
  // setSearchedPictures(pictureList);
};

//좋아요
// export const filterdLikeList = async () => {
//   const sampleCollection = collection(db, 'sample');
//   const q = query(sampleCollection, orderBy('likes', 'desc'), limit(5));

//   try {
//     const snapshot = await getDocs(q);
//     const picList = snapshot.docs.map((doc) => doc.data());

//     console.log('liked 필터링 ', picList); // Log to verify data

//     return picList;
//   } catch (error) {
//     console.error('Error getting documents: ', error);
//     throw error;
//   }
// };
