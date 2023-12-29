import { db } from '@/common/firebase_hm';
import { PicList } from '@/type/picListsType';
import { collection, getDocs, query, orderBy, limit, where } from 'firebase/firestore';

//초기 데이터를 가져오는
export const getPicsList = async () => {
  const sampleCollection = collection(db, 'sample');
  const q = query(sampleCollection, orderBy('id'), limit(5)); // 필요한 경우 정렬 방식을 지정할 수 있습니다.

  try {
    const snapshot = await getDocs(q); // query로부터 데이터를 가져옵니다.
    const picList = snapshot.docs.map((doc) => doc.data()); // 각 문서의 데이터를 가져옵니다.

    console.log(picList); // 데이터 확인을 위한 로그

    return picList; // 데이터를 반환합니다.
  } catch (error) {
    console.error('Error getting documents: ', error);
    throw error;
  }
};

// 태그검색
export const fetchSearchedListByTag = async (tag: string): Promise<PicList[]> => {
  const sampleCollection = collection(db, 'findpicLists');
  //3개의 인자를 받는다 , 태그,검색어,좋아요
  //태그만 값이 들어올때 -> ()=>{}
  //검색어만 들어 올때  ->  ()=>{}
  //좋아요만 들어올 때 -> ()=>{}
  //

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
};

// 검색어로 데이터 검색하기
// export const searchByKeyword = async (e: React.FormEvent) => {
//   e.preventDefault();
export const searchByKeyword = async (e: React.FormEvent, searchKeyword: string) => {
  // e.preventDefault();
  console.log('searchKeyword in MainPicLists', searchKeyword);
  // if (!searchKeyword) {
  //   // 검색어가 비어있으면 검색 초기화
  //   setIsSearching(false);
  //   // setSearchedPictures([]);
  //   return;
  // }

  const sampleCollection = collection(db, 'findpicLists');
  const q = query(sampleCollection, where('tags', 'array-contains', searchKeyword.toLowerCase()));

  const Snapshot = await getDocs(q);
  const pictureList: PicList[] = Snapshot.docs.map((doc) => doc.data() as PicList);

  // setIsSearching(true);
  // setSearchedPictures(pictureList);
  console.log('검색 결과 in picLists', pictureList);
};

//좋아요
export const filterdLikeList = async () => {
  const sampleCollection = collection(db, 'sample');
  const q = query(sampleCollection, orderBy('likes', 'desc'), limit(5));

  try {
    const snapshot = await getDocs(q);
    const picList = snapshot.docs.map((doc) => doc.data());

    console.log('liked 필터링 ', picList); // Log to verify data

    return picList;
  } catch (error) {
    console.error('Error getting documents: ', error);
    throw error;
  }
};

//다운로드
export const filterdDownloadList = async () => {
  const sampleCollection = collection(db, 'sample');
  const q = query(sampleCollection, orderBy('downloads', 'desc'), limit(5));

  try {
    const snapshot = await getDocs(q);
    const picList = snapshot.docs.map((doc) => doc.data());

    console.log('downloads 필터링 ', picList); // Log to verify data

    return picList;
  } catch (error) {
    console.error('Error getting documents: ', error);
    throw error;
  }
};

//infinitequery func
// export const ssss=(페이지)=>{
//     const sampleCollection = collection(db, 'sample');
//   const q = query(sampleCollection, orderBy('페이지'), limit(5));

// }
