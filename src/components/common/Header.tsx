import { styled } from 'styled-components';
import { leftIcon, rightIcon, searchIcon } from '@/lib/utils/Icons';
import Button from './Button';
interface HeaderProps {
  onPrev: () => void;
  onNext: () => void;
  currentYear: number;
  currentMonth: number;
}

function Header({ onPrev, onNext, currentYear, currentMonth }: HeaderProps) {
  return (
    <StyledHeader>
      <MonthWrapper>
        <Arrow onClick={onPrev}>{leftIcon}</Arrow>
        <Month>
          {currentYear}.{currentMonth}
        </Month>
        <Arrow onClick={onNext}>{rightIcon}</Arrow>
      </MonthWrapper>
      <ButtonWrapper>
        <Search>{searchIcon}</Search>
        <Button gray="true">상세 분석</Button>
        <Button gray="true">주간 분석</Button>
      </ButtonWrapper>
    </StyledHeader>
  );
}

const Detail = styled.button``;

const Graph = styled.button``;

const Search = styled.button`
  > svg {
    font-size: 1rem;
  }
`;

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 1.4rem 0;
`;

const MonthWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Arrow = styled.button`
  border: none;
  cursor: pointer;
  background: none;
  font-size: 1.5rem;
  margin-left: 0.5rem;
`;

const Month = styled.h2`
  font-size: 1.5rem;
  margin-left: 0.5rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  > button {
    margin-right: 0.5rem;
    padding: 8px 8px;
    font-size: 0.5rem;
  }
`;

export default Header;
