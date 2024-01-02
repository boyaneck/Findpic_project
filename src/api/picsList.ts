// import { db } from '@/common/firebase.my';
// import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

// export const getPicsList = async () => {
//   const sampleCollection = collection(db, 'sample');
//   const q = query(sampleCollection, orderBy('id'), limit(5)); // 필요한 경우 정렬 방식을 지정할 수 있습니다.

//   try {
//     const snapshot = await getDocs(q); // query로부터 데이터를 가져옵니다.
//     const picList = snapshot.docs.map((doc) => doc.data()); // 각 문서의 데이터를 가져옵니다.

//     // console.log(picList); // 데이터 확인을 위한 로그

//     return picList; // 데이터를 반환합니다.
//   } catch (error) {
//     console.error('Error getting documents: ', error);
//     throw error;
//   }
// };

// export const filterdLikeList = async () => {
//   const sampleCollection = collection(db, 'sample');
//   const q = query(sampleCollection, orderBy('likes', 'desc'), limit(5));

//   try {
//     const snapshot = await getDocs(q);
//     const picList = snapshot.docs.map((doc) => doc.data());

//     // console.log('liked 필터링 ', picList); // Log to verify data

//     return picList;
//   } catch (error) {
//     console.error('Error getting documents: ', error);
//     throw error;
//   }
// };

// export const filterdDownloadList = async () => {
//   const sampleCollection = collection(db, 'sample');
//   const q = query(sampleCollection, orderBy('downloads', 'desc'), limit(5));

//   try {
//     const snapshot = await getDocs(q);
//     const picList = snapshot.docs.map((doc) => doc.data());

//     // console.log('downloads 필터링 ', picList); // Log to verify data

//     return picList;
//   } catch (error) {
//     console.error('Error getting documents: ', error);
//     throw error;
//   }
// };
