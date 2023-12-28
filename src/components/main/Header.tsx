import { db } from '@/common/firebase_hm';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { styled } from 'styled-components';

const Header = () => {
  useEffect(() => {
    const fetch = async () => {
      try {
        const sampleCollection = collection(db, 'findpicLists');
        const Snapshot = await getDocs(sampleCollection);
        return Snapshot.docs;
      } catch (error) {
        console.log('error', error);
      }
    };
    fetch().then((response) =>
      console.log(
        'response',
        response?.map((list) => list.data())
      )
    );
  }, []);
  return (
    <StHeaderContainer>
      <StHeaderContentContainer>
        <StLogoTitle>Findpic</StLogoTitle>
        <StLoginButton>
          <StGoogleLogo src="./google-logo.png" />
          <StLogin>LOGIN</StLogin>
        </StLoginButton>
      </StHeaderContentContainer>
    </StHeaderContainer>
  );
};

export default Header;

const StHeaderContainer = styled.div`
  display: flex;
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 4.5rem;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
`;

const StHeaderContentContainer = styled.div`
  padding: 2rem;
  width: 1440px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const StLogoTitle = styled.p`
  font-size: 1.8rem;
  font-weight: 900;
`;

const StLoginButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 2rem;
  width: 7rem;
  height: 3rem;
  border: 1px solid black;
  cursor: pointer;
`;

const StGoogleLogo = styled.img`
  width: 1rem;
`;

const StLogin = styled.p``;
