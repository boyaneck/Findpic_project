import React from 'react';
import { styled } from 'styled-components';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

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
          {session?.user?.image && (
            <Link href="/mypage" legacyBehavior>
              <a>
                <StUserImage src={session.user.image} width={50} height={50} alt="User Image" />
              </a>
            </Link>
          )}
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
  justify-content: center;
  align-items: center;
  background-color: white;
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
  // border: 1px solid red;
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
  gap: 0.2rem;
  background-color: white;
  height: 3rem;
  border: none;
  cursor: pointer;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0; /* 초기에는 선이 없도록 설정 */
    height: 1px;
    background-color: black; /* 선의 색상 */
    transition: width 0.3s; /* 선이 나타날 때 애니메이션 효과 설정 */
  }

  &:hover::before {
    width: 100%; /* 선의 너비를 100%로 확장하여 선이 나타나도록 설정 */
  }
  &:hover {
    font-weight: bold;
  }
`;

const StGoogleLogo = styled.img`
  width: 1rem;
`;

const StLogin = styled.p``;
