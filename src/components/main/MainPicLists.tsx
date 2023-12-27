import { db } from '../../common/firebase.my';
import { Firestore, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import * as S from '../../styles/Main.style';
import React, { useEffect, useState } from 'react';

const MainPicLists = () => {
  const [piclists, setPicLists] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const sampleCollection = collection(db, 'sample');
        const Snapshot = await getDocs(sampleCollection);
        return Snapshot.docs;
      } catch (error) {
        console.log('error를 말해', error);
      }
    };
    fetch().then((res) =>
      console.log(
        'res',
        res?.map((list) => list.data())
      )
    );
  }, []);

  return (
    <>
      <S.FILTER_BUTTON_WRAPPER>
        <S.FILTER_BUTTON>다운로드 많은순</S.FILTER_BUTTON>
        <S.FILTER_BUTTON>좋아요 많은 순 </S.FILTER_BUTTON>
      </S.FILTER_BUTTON_WRAPPER>
    </>
  );
};

export default MainPicLists;
