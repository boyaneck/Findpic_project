import { db } from '../../common/firebase.my';
import { Firestore, QuerySnapshot, collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import * as S from '../../styles/Main.style';
import React, { useEffect, useState } from 'react';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { filterdDownloadList, filterdLikeList, getPicsList } from '@/api/picsList';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

type SortedBy = 'id' | 'downloads' | 'likes';

const MainPicLists = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null); // hover된 이미지의 인덱스를 저장합니다.
  const [liked, setLiked] = useState(false); // 좋아요 상태를 관리하는 상태값
  const [sortedBy, setSortedBy] = useState<SortedBy>('id');
  const [isLikesPicsPreFetched, setIsLikesPicsPreFetched] = useState(false);
  const [isDownloadsPicsPreFetched, setIsDownloadsPicsPreFetched] = useState(false);
  const handleLike = () => {
    setLiked(!liked); // 좋아요 상태를 토글합니다.
  };

  // 1.type이 id인 필드를 위에서 5개 가져온다.
  // 2.type이 변경시 해당 queryfn을 실행
  const { data, isError, isPending } = useQuery({
    queryKey: ['picLists', { sortedBy }],
    queryFn: () => {
      if (sortedBy === 'id') return getPicsList();
      else if (sortedBy === 'likes') return filterdLikeList();
      else if (sortedBy === 'downloads') return filterdDownloadList();
    }
  });

  const queryClient = useQueryClient();
  if (isError) return <div>에러입니다..</div>;
  if (isPending) return <div>데이터 요청중입니다...</div>;

  const preFetchLikesPics = async () => {
    if (isLikesPicsPreFetched) return;
    await queryClient.prefetchQuery({
      queryKey: ['picLists', { sortedBy: 'likes' }],
      queryFn: filterdLikeList
    });
    setIsLikesPicsPreFetched(true);
  };

  const handlerFilterdLikedPics = () => {
    setSortedBy('likes');
  };

  const preFetchDownloadsPics = async () => {
    if (isDownloadsPicsPreFetched) return;
    await queryClient.prefetchQuery({
      queryKey: ['picLists', { sortedBy: 'downloads' }],
      queryFn: filterdDownloadList
    });
    setIsDownloadsPicsPreFetched(true);
  };
  const handlerFilterdDownloadsPics = () => {
    setSortedBy('downloads');
  };

  //
  return (
    <>
      <S.FILTER_BUTTON_WRAPPER>
        <S.FILTER_BUTTON onMouseOver={preFetchDownloadsPics} onClick={handlerFilterdDownloadsPics}>
          다운로드 많은순
        </S.FILTER_BUTTON>
        <S.FILTER_BUTTON onMouseOver={preFetchLikesPics} onClick={handlerFilterdLikedPics}>
          좋아요 많은 순{' '}
        </S.FILTER_BUTTON>
      </S.FILTER_BUTTON_WRAPPER>

      <S.PICS_WRAPPER>
        <div>
          {data?.map((pic: any, index: any) => (
            <div
              key={pic.id}
              className="pic-container"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img src={pic.urls} style={{ width: 'inherit', height: 'inherit' }} className="pic-image"></img>
              {hoveredIndex === index && (
                <div className="like-icon" onClick={handleLike}>
                  {liked ? <AiFillHeart /> : <AiOutlineHeart />}
                </div>
              )}
            </div>
          ))}
        </div>
      </S.PICS_WRAPPER>
    </>
  );
};

export default MainPicLists;

// const PicContainer = styled.div`
//   position: relative;
//   display: inline-block;
//   /* 이미지들이 옆으로 나열되도록 함 */
// `;

// // 좋아요 아이콘 스타일
// const LikeIcon = styled.div`
//   position: absolute;
//   top: 5px;
//   right: 5px;
//   opacity: 0;
//   transition: opacity 0.3s ease;

//   ${PicContainer}:hover & {
//     opacity: 1;
//   }

//   svg {
//     transition: fill 0.3s ease; /* 색상 변경 트랜지션 */
//     fill: ${(props) => (props.liked ? 'red' : 'black')}; /* 클릭 여부에 따라 색상 변경 */
//     cursor: pointer;
//   }

//   &:hover svg {
//     fill: red; /* 마우스 호버 시 색상 변경 */
//   }
// `;

// // 이미지 스타일
// const PicImage = styled.img`
//   width: inherit;
//   height: inherit;
// `;
