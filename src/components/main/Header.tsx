import React from 'react';
import { styled } from 'styled-components';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

const Header = () => {
  const { data: session } = useSession();
  console.log('session in Header', session);
  return (
    <StHeaderContainer>
      <StHeaderContentContainer>
        <StLogoTitle>Findpic</StLogoTitle>
        <StLoginContainer>
          <StLoginButton>
            <StGoogleLogo src="./google-logo.png" />
            {!session ? (
              <StLogin onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000' })}>LOGIN</StLogin>
            ) : (
              <StLogin onClick={() => signOut()}>LOGOUT</StLogin>
            )}
          </StLoginButton>
          {session?.user?.image && <StUserImage src={session.user.image} width={50} height={50} alt="User Image" />}
        </StLoginContainer>
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

const StLoginContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const StUserImage = styled(Image)`
  width: 3rem;
  height: 3rem;
  border-radius: 10rem;
  border: 1px solid red;
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
  cursor: pointer;
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
