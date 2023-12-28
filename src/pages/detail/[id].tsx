'use client';
import ImgZoom from '@/components/Detail/ImgZoom';
import { PhotoData, Tag } from '@/type/fetchDataType';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
const fetchData = require('/public/data/db.json') as PhotoData[];

// nextjs를 쓰는 이유? -> 서버사이드 렌더링,...
// 서버사이드 렌더링 ? -> 서버에서 데이터를 이미 가지고 있고 이미 html로 만들어놓는다.
// [id].tsx -> id값에 따라서 html을 동적으로 미리 만들어놓겠다. -> 서버 사이드로 렌더링 하겠다
// html을 미리 만들어놓기 위해서는 데이터가 이미 있다고 가정을 해야한다.
// 아까처럼 작성하면 데이터가 없는 상태 -> 클라이언트 랜더링을 하겠다  -> 클라이언 사이드 렌더링을 하니까
// 둘이 일치하지 않음

// 서버 -> 서버 사이드 렌더링
// 클라이언트 -> 클라이언트 사이드 렌더링

// 서버 사이드로 만ㄷ르기 위해서는 이미 데이터가 있어야 한다.
// 데이터를 props로 넘겨줘야 한다.

// 클라이언트 사이드는 Detail 컴포넌트에 접근을 할 때 만든다. 데이터가 없음
// 서버 사이드는 접근하지 않고 이미 데이터가 들어왔다고  가정하고 만들어요 . 데이터를 주면 됨

// 서버 사이드 렌더링으로 접근한다면 데이터를 줘야하는데 이걸 어떻게 주냐 이건 공식문서
// pages router에 개념이 없고.... 어떻게 접근해야할지 모르겟음 ㅜㅜㅜㅜㅜ
// 포기...... 존심 상하네

export default function Detail() {
  const router = useRouter();
  const id = router.query.id;
  const pic = fetchData.find((picture) => picture.id === id);

  if (!pic) return <></>;

  return (
    <>
      <div>
        <div>
          <ImgZoom src={pic.urls.raw} />
        </div>
        <div>
          <div>
            <a download href="ImageDownload">
              다운로드
            </a>
            <button>링크복사</button>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none">
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
            </svg>
            <span>{pic.likes}</span>
          </div>
          <div>
            <p>다운로드</p>
            <span>{pic.downloads}</span>
          </div>
          <div>
            <p>Details</p>
            <p>
              location
              <span>{pic.user.location}</span>
            </p>
            <p>
              description
              <span>{pic.alt_description}</span>
            </p>
          </div>
        </div>
      </div>
      <div>
        {pic.tags.map((tag: Tag) => {
          return <p key={tag.title}>{tag.title}</p>;
        })}
      </div>
      {/* ???? */}
    </>
  );
}
