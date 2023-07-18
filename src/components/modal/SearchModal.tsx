import React, { useState, useRef } from 'react';
import { styled, css } from 'styled-components';
import { theme } from '@/styles/theme';
import { FaArrowLeft } from 'react-icons/fa';
import AllTag from './AllTag';

interface SearchModalProps {
  close: () => void;
  setTag: React.Dispatch<React.SetStateAction<string>>;
}

function SearchModal({ close, setTag }: SearchModalProps) {
  const [activeButton, setActiveButton] = useState(''); // 버튼 활성화 상태 확인
  const modalRef = useRef(null);

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const formType = e.currentTarget.dataset.formType; // 데이터셋을 이용한 타입 지정
    setActiveButton(formType || ''); // 지정된 type에 따라 버튼 활성화
  };

  const handleTagChange = (tags: string) => {
    setTag(tags);
    close();
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === modalRef.current) close();
  };

  return (
    <Container>
      <SearchModalWraaper ref={modalRef} onClick={handleClick}>
        <Modal>
          <BackButton onClick={close}>
            <FaArrowLeft />
          </BackButton>
          <AllTag handleTagChange={handleTagChange} />
        </Modal>
      </SearchModalWraaper>
    </Container>
  );
}

const Container = styled.div`
  width: 390px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const BackButton = styled.button`
  border: none;
  font-size: 20px;
  margin: 15px;
  cursor: pointer;
  background-color: #fff;
  position: relative;
  left: -150px;

  &:hover {
    color: ${theme.colors.red};
  }
`;

const ButtonCotainer = styled.div`
  display: flex;
  gap: 50px;
  justify-content: center;
  margin: 10px;
`;

const DepositButton = styled.button<{
  $green?: string;
  $active?: boolean;
}>`
  width: 100px;
  height: 30px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: all ease 1s 0s;

  ${(props) =>
    props.$green &&
    css`
      &:hover {
        background-color: ${theme.colors.green};
        color: #ffffffdb;
        background-image: linear-gradient(315deg, #b9fad9, transparent);
      }
    `}

  ${(props) =>
    props.$active &&
    css`
      background-color: ${theme.colors.green};
      color: #ffffffdb;
      background-image: linear-gradient(315deg, #b9fad9, transparent);
    `}
`;

const ExpenseButton = styled.button<{
  $red?: string;
  $active?: boolean;
}>`
  width: 100px;
  height: 30px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: all ease 1s 0s;

  ${(props) =>
    props.$red &&
    css`
      &:hover {
        background-color: ${theme.colors.red};
        color: #ffffffdb;
        background-image: linear-gradient(315deg, #e6b0c3, transparent);
      }
    `}

  ${(props) =>
    props.$active &&
    css`
      background-color: ${theme.colors.red};
      color: #ffffffdb;
      background-image: linear-gradient(315deg, #e6b0c3, transparent);
    `}
`;

const Submit = styled.button`
  width: 250px;
  height: 50px;
  margin: 10px;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  font-size: 18px;
  font-weight: bold;

  &:hover {
    background-color: #33ff99;
    color: #ffffffdb;
  }
`;

const SearchModalWraaper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;
export default SearchModal;
