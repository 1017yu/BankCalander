import { useState } from 'react';
import styled from 'styled-components';

interface Option {
  label: string;
  icon: React.ReactNode;
}

interface DropdownProps {
  options: Option[];
  onSelect: (selectedOption: string) => void;
}

function Dropdown({ options, onSelect }: DropdownProps) {
  const [isClosed, setIsClosed] = useState(true);
  const [selectedOption, setSelectedOption] = useState('태그를 선택하세요.');

  const toggleDropdown = () => {
    setIsClosed(!isClosed);
  };

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option.label);
    setIsClosed(!isClosed);
    onSelect(option.label);
  };

  return (
    <DropdownWrapper onClick={toggleDropdown}>
      <Title>{selectedOption}</Title>
<<<<<<< HEAD
      <Menu $closed={isClosed ? 'true' : undefined}>
       <ItemBoard>
       {options.map((option: string) => (
          <MenuItem key={option} onClick={() => handleOptionSelect(option)}>
            {option}
          </MenuItem>
        ))}
       </ItemBoard>
=======
      <Menu closed={isClosed ? 'true' : undefined}>
        <ItemBoard>
          {options.map((option: Option, index: number) => (
            <MenuItem key={index} onClick={() => handleOptionSelect(option)}>
              <IconWrapper>{option.icon}</IconWrapper>
              <Label>{option.label}</Label>
            </MenuItem>
          ))}
        </ItemBoard>
>>>>>>> ff1ca701fe453890e354c6eb1b025d1fcce0f39f
      </Menu>
    </DropdownWrapper>
  );
}

const DropdownWrapper = styled.div`
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  margin: 30px;
  background: rgb(248, 248, 248);
  border: solid 1px rgb(222, 222, 222);
  width: 320px;
  cursor: pointer;
  text-align: center;
`;

const Title = styled.h2`
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Menu = styled.div<{ $closed?: string | undefined }>`
  margin: 0;
  padding: 0;
  list-style-type: none;
  height: ${(props) => (props.$closed === 'true' ? '0px' : 'auto')};
`;

const ItemBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 16px;
  padding: 14px 10px;
  flex: 1 0 24%;
  margin: 0.5%;

  &:hover {
    color: red;
  }
`;

const IconWrapper = styled.div`
  margin-bottom: 8px;
`;

const Label = styled.span`
  font-size: 12px;
`;

export default Dropdown;
