import React from "react";
import { styled } from "styled-components";

const SearchEngine = () => {
  const TAGS = ["전체", "동물", "사랑", "회사", "집"];
  return (
    <StSearchEngineContainer>
      <StSearchEngineWrapper>
        <StSearchIcon src="./search-icon.png" />
        <StSearchEngineBar placeholder="Search"></StSearchEngineBar>
      </StSearchEngineWrapper>
      <StTagContainer>
        {TAGS.map((tag, index) => {
          return <StTag key={index}>{tag}</StTag>;
        })}
      </StTagContainer>
    </StSearchEngineContainer>
  );
};

export default SearchEngine;

const StSearchEngineContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: lightyellow;
  margin-top: 4.5rem;
  justify-content: center;
  align-items: center;
  height: 10rem;
`;

const StSearchEngineWrapper = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  // border: 1px solid red;
  position: relative;
`;

const StSearchEngineBar = styled.input`
  width: 35rem;
  height: 3rem;
  border-radius: 3rem;
  border: 1px solid black;
  padding-left: 3.7rem;
  font-size: 1rem;
`;
const StSearchIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 1.2rem; /* 원하는 간격으로 조절하세요 */
  transform: translateY(-50%);
  width: 1.2rem;
  z-index: 10000;
`;
const StTagContainer = styled.ul`
  border: 1px solid green;
  width: 35rem;
  height: 2.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
`;
const StTag = styled.li`
  list-style-type: none;
  border: 1px solid black;
  width: 4rem;
  height: 1.5rem;
  border-radius: 3rem;
  padding: 0.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
