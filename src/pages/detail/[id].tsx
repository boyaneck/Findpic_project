import ImgZoom from '@/components/Detail/ImgZoom';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

type Tag = { title: string };
type Tags = { tags: Tag[] };

export default function Detail() {
  // const {
  //   query: { id }
  // } = useRouter();

  const fetchData = require('/public/data/db.json');
  // console.log(fetchData);

  const { tags }: Tags = fetchData;

  // unsplash
  return (
    <>
      <div>
        <div>
          <ImgZoom src={fetchData.urls.raw} />
        </div>
        <div>
          <div>
            <button>다운로드</button>
            <button>링크복사</button>
          </div>
          <div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
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
              <span>{fetchData.likes}</span>
            </div>
            <div>
              <p>다운로드</p>
            </div>
          </div>
          <div>
            <p>Details</p>
            <p>
              width
              <span>{fetchData.width}</span>
            </p>
            <p>
              height
              <span>{fetchData.height}</span>
            </p>
            <p>
              location
              <span>{fetchData.user.location}</span>
            </p>
            <p>
              description
              <span>{fetchData.alt_description}</span>
            </p>
          </div>
        </div>
      </div>
      <div>
        {fetchData.tags.map((tag: Tag) => {
          return <p>{tag.title}</p>;
        })}
      </div>
      <div></div>
    </>
  );
}
