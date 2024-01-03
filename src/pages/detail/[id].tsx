import React from 'react';
import styled from 'styled-components';
import { fetchGetPhotoData, fetchPhotoDatabyPage, fetchTagPhotoData } from '../api/photoFind';
import { GetServerSideProps } from 'next';
import ImgZoom from '@/components/Detail/ImgZoom';
import { FirebasePhotoData } from '@/type/firebaseDataType';
import Image from 'next/image';
import downloadImage from '../../common/utils/downloadImage';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import PhotoList from '@/components/Detail/PhotoList';
// import PhotoList from '@/components/Detail/photoList';

// http://localhost:3000/detail/UOrBkUP_6CgEwDE6tAvvM

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query;
  const id = query.id;
  try {
    const pic = await fetchGetPhotoData(id!);
    if (!pic) {
      return { props: { pic: null } };
    }
    // tags에 포함된 데이터 호출
    const searchTagsResult = await fetchTagPhotoData(pic.tags);

    return { props: { pic, searchTagsResult } };
  } catch (error) {
    console.error(error);
    // 에러 처리
    return { props: { error: '데이터 로딩 중 에러 발생' } };
  }
};

type Props = {
  pic: FirebasePhotoData | null; // fetchGetPhotoData에서 반환하는 타입
  searchTagsResult: FirebasePhotoData[] | null; // fetchTagPhotoData에서 반환하는 타입
  error?: string;
};

export default function Detail({ pic, searchTagsResult, error }: Props) {
  // 로그인 유무확인 status 값으로 확인하기
  const { data: session, status } = useSession();
  const user = session?.user?.email;

  if (error) return <div>{error}</div>;

  if (!pic) {
    return <div>사진 데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <StPageFrame>
      <StImgContainer>
        <ImgZoom src={pic.imgPath} />
        <StDownLoadContainer>
          <StLike>
            <p>♥️ {pic.likes}</p>
          </StLike>
          <button
            onClick={() => {
              const imageUrl = `${pic.imgPath}`;
              const imageName = 'find_pic.png';
              if (!session?.user) {
                alert('로그인 후 이용하실 수 있습니다');
              } else {
                downloadImage(imageUrl, imageName);
              }
            }}
          >
            다운로드
          </button>
        </StDownLoadContainer>
      </StImgContainer>
      <StTagContainer>
        <h3># 관련 태그</h3>
        <StTags>
          {pic.tags.map((tag, index) => {
            return <p key={tag + index}>{tag}</p>;
          })}
        </StTags>
      </StTagContainer>
      <StMorePictureContainer>
        <h3># 더 많은 사진 보기</h3>
        {/* // 컴포넌트 하나 만들어서 빼서 그 부분이 무한 스크롤 되도록 // client component를 하나 만든다 */}
        <PhotoList searchTags={pic.tags} />
      </StMorePictureContainer>
    </StPageFrame>
  );
}

const StPageFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StDownLoadContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: flex-end;
  align-items: center;
  width: 99%;
  margin: auto;
  button {
    width: 7rem;
    height: 3rem;
    border-radius: 10px;
    border: none;
    background-color: black;
    color: white;
    margin: 0.3rem;
    cursor: pointer;
    font-size: 1rem;
    font-wieght: 700;
    transition: background-color 0.3s ease; /* 트랜지션 속성 추가 */
    &:hover {
      background-color: #339966; /* 원하는 호버 색상으로 변경 */
      color: white; /* 원하는 호버 텍스트 색상으로 변경 */
    }
  }
`;

const StLike = styled.div`
  p {
    font-size: 1.5rem;
  }
`;

const StImgContainer = styled.div`
  display: grid;
  grid-gap: 0.5rem; /* 이미지 간격 조절 */
  flex-wrap: wrap;
  margin: auto;
`;

const StImg = styled.div`
  width: 20rem;
`;

const StTagContainer = styled.div`
  margin-bottom: 1rem;
  width: 65%;
  max-height: 600px; /* 최대 높이 설정 */
  overflow: hidden; /* 넘치는 부분 숨기기 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  h3 {
    align-self: flex-start;
    margin: 0.1rem 1rem 1rem 0.5rem;
  }
  flex-wrap: wrap;
`;

const StTags = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  flex-wrap: wrap;

  p {
    color: gray;
    text-align: center;
    width: 7.3rem;
    height: 2rem;
    word-wrap: break-word;
    background-color: white;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 2px 0 10px -5px gray, -2px 0 12px -10px gray;
    transition: box-shadow 0.25s ease-in-out;
    &:hover {
      box-shadow: 8px 0 12px -5px gray, -8px 0 12px -5px gray;
    }
  }
`;

const StMorePictureContainer = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  h3 {
    align-self: flex-start;
    margin: 1rem 1rem 1rem 0.5rem;
  }
  flex-wrap: wrap;
`;
