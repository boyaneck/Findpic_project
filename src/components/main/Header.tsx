import { db } from "@/common/firebase_hm";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";

const Header = () => {
  useEffect(() => {
    const fetch = async () => {
      try {
        const sampleCollection = collection(db, "findpicLists");
        const Snapshot = await getDocs(sampleCollection);
        return Snapshot.docs;
      } catch (error) {
        console.log("error", error);
      }
    };
    fetch().then((res) =>
      console.log(
        "res",
        res?.map((list) => list.data())
      )
    );
  }, []);
  return <div>Header</div>;
};

export default Header;
