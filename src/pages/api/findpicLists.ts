// import { db } from "@/common/firebase_hm";
// import { collection, addDoc, doc, getDoc } from "firebase/firestore";

// const FIREBASE_COLLECTION_NAME = "findpicLists";

// export const fetchFindpicData = async () => {
//   try {
//     const docRef = doc(db, FIREBASE_COLLECTION_NAME);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       // console.log("data", docSnap.data());
//       return docSnap.data();
//     } else {
//       // console.log("해당 문서가 존재하지 않습니다!");
//       return null; // 또는 다른 적절한 처리를 수행하세요.
//     }
//   } catch (error) {
//     console.error("문서를 가져오는 중 오류 발생:", error);
//     throw error; // 오류를 호출자에게 전파할 수도 있습니다.
//   }
// };
