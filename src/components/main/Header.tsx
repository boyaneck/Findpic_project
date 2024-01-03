import Link from 'next/link';
import React from 'react';
import { styled } from 'styled-components';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSearchContext } from '@/context/keyword';

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { searchKeyword, setSearchKeyword } = useSearchContext();

  const handleLogoClick = () => {
    setSearchKeyword('');
    // setSearchValue(''); // 로고 클릭 시 검색값 초기화
    // router.push('/');
  };
  // // console.log('session in Header', session);

  const handleLogin = async () => {
    try {
      await signIn('google', { callbackUrl: 'http://localhost:3000' });
    } catch (error) {
      alert('로그인에 실패하였습니다.');
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('로그아웃 하시겠습니까?');
    if (confirmLogout) {
      signOut();
      alert('로그아웃이 완료되었습니다.');
    }
  };

  return (
    <StHeaderContainer>
      <StHeaderContentContainer>
        <Link href={'/'} passHref>
          <StLogoTitle
            onClick={() => {
              handleLogoClick();
            }}
          >
            Findpic
          </StLogoTitle>
        </Link>
        <StLoginContainer>
          <StLoginButton>
            <StGoogleLogo src="/google-logo.png" />
            {!session ? (
              <StLogin onClick={handleLogin}>LOGIN</StLogin>
            ) : (
              <StLogin onClick={handleLogout}>LOGOUT</StLogin>
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
  border: 1px solid #f7f3f3;
`;

const StLoginContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const StUserImage = styled(Image)`
  width: 2.8rem;
  height: 2.8rem;
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
