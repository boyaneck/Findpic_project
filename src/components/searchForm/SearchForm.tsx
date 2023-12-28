import axios from 'axios';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';
import envConfig from '../../../config';

type FormProps = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  photos: {}[];
  setPhotos: React.Dispatch<React.SetStateAction<[]>>;
};

export default function SearchFrom({ input, setInput, photos, setPhotos }: FormProps) {
  const KEY = envConfig.unsplash.apiKey;

  const testItems = ['rose', 'night', 'christmas', 'present', 'dog', 'winter'];

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await axios.get(`https://api.unsplash.com/search/photos?query=${input}&client_id=${KEY}`);

    const data = await result.data;
    console.log(data);
    setPhotos(data.results);
    setInput('');
  };

  console.log(photos);

  return (
    <StSearchContainer>
      <StSearchInputWrapper onSubmit={handleSubmit}>
        <StSearchInputEl onChange={handleChange} value={input} />
        <StTagSection>
          <StTagLists>
            {testItems.map((item, i) => {
              return <StTags key={i}># {item}</StTags>;
            })}
          </StTagLists>
        </StTagSection>
      </StSearchInputWrapper>
    </StSearchContainer>
  );
}

const StSearchContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  background-color: #eee;
  margin: auto;
  color: black;
`;

const StSearchInputWrapper = styled.form`
  width: 100%;
  padding: 3rem 9rem;
`;

const StSearchInputEl = styled.input.attrs({
  placeholder: '찾고 싶은 것을 입력하세요!'
})`
  width: 100%;
  padding: 0.6rem 0.9rem;
  background-color: #d9d9d950;
  border: 1px solid black;
  border-radius: 50px;
  font-size: 1.25rem;
  color: black;

  &::placeholder {
    font-size: 1rem;
  }
`;

const StTagSection = styled.section`
  width: 100%;
  padding: 1rem 0;
`;

const StTagLists = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  & li {
    list-style: none;
  }
`;

const StTags = styled.li`
  width: fit-content;
  padding: 0.45rem 1rem;
  border: 1px solid black;
  border-radius: 50px;
  cursor: pointer;

  &:hover {
    background-color: #ff7267;
    color: white;
  }
`;
