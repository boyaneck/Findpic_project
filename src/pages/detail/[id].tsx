import React from 'react';
import styled from 'styled-components';
import { fetchGetPhotoData } from '../api/photoFind';
import { GetServerSideProps } from 'next';
import ImgZoom from '@/components/Detail/ImgZoom';
import { FirebasePhotoData } from '@/type/firebaseDataType';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query;
  const id = query.id;
  try {
    const pic = await fetchGetPhotoData(id!);
    if (!pic) {
      return { props: { pic: null } };
    }

    return { props: { pic } };
  } catch (error) {
    console.error(error);
    // 에러 처리
    return { props: { error: '데이터 로딩 중 에러 발생' } };
  }
};

type Props = {
  pic: FirebasePhotoData | null; // fetchGetPhotoData에서 반환하는 타입
  error?: string;
};

export default function Detail({ pic, error }: Props) {
  if (error) return <div>{error}</div>;

  if (!pic) {
    return <div>사진 데이터를 찾을 수 없습니다.</div>;
  }

  console.log(pic);

  return (
    <>
      <div>
        <StImg>
          <ImgZoom src={pic.imgPath} />
        </StImg>
        <div>
          <div>
            <a download href="ImageDownload">
              다운로드
            </a>
            <button>링크복사</button>
          </div>
          <div>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none">
              <g clip-path="url(#clip0_6_65)">
                <path
                  d="M19.5001 13.572L12.0001 21L4.50006 13.572C4.00536 13.0906 3.6157 12.512 3.3556 11.8726C3.09551 11.2333 2.97062 10.547 2.98879 9.85693C3.00697 9.16692 3.16782 8.48814 3.46121 7.86334C3.75461 7.23854 4.17419 6.68126 4.69354 6.22658C5.21289 5.77191 5.82076 5.42969 6.47887 5.22148C7.13697 5.01327 7.83106 4.94359 8.51743 5.0168C9.20379 5.09002 9.86756 5.30456 10.4669 5.64691C11.0663 5.98926 11.5883 6.452 12.0001 7.006C12.4136 6.45602 12.9362 5.99732 13.5352 5.65861C14.1341 5.31989 14.7966 5.10845 15.481 5.03752C16.1654 4.96659 16.8571 5.0377 17.5128 5.24639C18.1685 5.45509 18.7741 5.79687 19.2916 6.25036C19.8091 6.70386 20.2275 7.25929 20.5205 7.88189C20.8135 8.5045 20.9748 9.18088 20.9944 9.86871C21.0139 10.5565 20.8913 11.241 20.6342 11.8793C20.3771 12.5175 19.991 13.0958 19.5001 13.578"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_6_65">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg> */}
            <span>{pic.likes}</span>
          </div>
          <div>
            {/* <p>다운로드</p>
            <span>{pic.downloads}</span> */}
          </div>
          <div>
            {/* <p>Details</p>
            <p>
              location
              <span>{pic.user.location}</span>
            </p> */}
            {/* <p>
              description
              <span>{pic.alt_description}</span>
            </p> */}
          </div>
        </div>
      </div>
      <div>
        {pic.tags.map((tag, index) => {
          return <p key={tag + index}>{tag}</p>;
        })}
      </div>
    </>
  );
}

const StImg = styled.div`
  width: 3rem;
`;
