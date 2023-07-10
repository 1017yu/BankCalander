import { useState } from 'react';
import styled from 'styled-components';

interface DropdownProps {
  options: string[];
  onSelect: (selectedOption: string) => void;
}

function Dropdown({ options, onSelect }: DropdownProps) {
  const [isClosed, setIsClosed] = useState(true);
  const [selectedOption, setSelectedOption] = useState('태그를 선택하세요.');

  const toggleDropdown = () => {
    setIsClosed(!isClosed);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsClosed(!isClosed);
    onSelect(option);
  };

  return (
    <DropdownWrapper onClick={toggleDropdown}>
      <Title>{selectedOption}</Title>
      <Menu closed={isClosed ? 'true' : undefined}>
        <ItemBoard>
          {options.map((option: string) => (
            <MenuItem key={option} onClick={() => handleOptionSelect(option)}>
              {option}
            </MenuItem>
          ))}
        </ItemBoard>
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

const Menu = styled.div<{ closed?: string | undefined }>`
  margin: 0;
  padding: 0;
  list-style-type: none;
  height: ${(props) => (props.closed === 'true' ? '0px' : 'auto')};
`;

const ItemBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const MenuItem = styled.span`
  font-size: 16px;
  text-align: center;
  padding: 14px 10px;
  flex: 1 0 24%;
  margin: 0.5%;

  &:hover {
    color: red;
  }
`;

export default Dropdown;
