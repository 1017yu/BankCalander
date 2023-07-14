import { styled } from 'styled-components';
import { leftIcon, rightIcon, searchIcon } from '@/lib/utils/Icons';
import Button from './Button';
import { theme } from '@/styles/theme';
import { useEffect, useState } from 'react';
import { SelectedDailyProps } from '../Home/ExpensesList';
import { calendarData } from '@/lib/api/Api';

interface HeaderProps {
  onPrev: () => void;
  onNext: () => void;
  currentYear?: number;
  currentMonth?: number;
}

function Header({ onPrev, onNext, currentYear, currentMonth }: HeaderProps) {
  const [dailyList, setDailyList] = useState<SelectedDailyProps[]>([]);

  useEffect(() => {
    const fetchList = async () => {
      if (currentYear) {
        const res = await calendarData(
          currentYear as number,
          currentMonth as number,
        );
        setDailyList(Object.values(res));
      }
    };
    fetchList();
  }, [currentMonth]);

  const expense =
    // dailyList가 존재할 때,
    dailyList.length > 0
      ? dailyList.reduce((acc, cur) => {
          // amount가 음수인 항목 filterling
          const expenses = cur.filter(
            (item: { amount: number }) => item.amount * 1 < 0,
          );
          // 필터링 된 expenses의 amount를 reduce로 모두 합함
          const total = expenses.reduce(
            (sum: number, item: { amount: number }) => sum + item.amount,
            0,
          );
          return (acc + total) * -1;
        }, 0)
      : 0;

  const income = // dailyList가 존재할 때,
    dailyList.length > 0
      ? dailyList.reduce((acc, cur) => {
          // amount가 양수인 항목 filterling
          const expenses = cur.filter(
            (item: { amount: number }) => item.amount * 1 >= 0,
          );
          // 필터링 된 expenses의 amount를 reduce로 모두 합함
          const total = expenses.reduce(
            (sum: number, item: { amount: number }) => sum + item.amount,
            0,
          );
          return acc + total;
        }, 0)
      : 0;

  return (
    <StyledHeader>
      <SearchWrapper>
        <Month>
          <Arrow onClick={onPrev}>{leftIcon}</Arrow>
          {currentYear}.{currentMonth}
          <Arrow onClick={onNext}>{rightIcon}</Arrow>
        </Month>
        <Search>{searchIcon}</Search>
      </SearchWrapper>
      <InfoWrapper>
        <Balance>
          <Expense>지출 {expense}</Expense>
          <Income>수입 {income}</Income>
        </Balance>
        <Buttons>
          <Button gray="true">상세 분석</Button>
          <Button gray="true">주간 분석</Button>
          {}
        </Buttons>
      </InfoWrapper>
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
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Month = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  margin-left: 0.5rem;
`;

const Arrow = styled.button`
  border: none;
  cursor: pointer;
  background: none;
  font-size: 1.5rem;
`;

const InfoWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Balance = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Buttons = styled.div`
  padding: 1.4rem 0;

  > button {
    margin-right: 0.5rem;
    padding: 8px 8px;
    font-size: 0.5rem;
  }
`;

const Expense = styled.div`
  margin-left: 1.5rem;
  margin-bottom: 1rem;
  font-size: 12px;
  color: ${theme.colors.gray[1]};
`;

const Income = styled.div`
  margin-left: 1.5rem;
  font-size: 12px;
  color: ${theme.colors.gray[1]};
`;

export default Header;
