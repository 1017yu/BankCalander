import Button from './Button';
import { theme } from '@/styles/theme';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { calendarData } from '@/lib/api/Api';
import { css, styled } from 'styled-components';
import SearchModal from '@/components/modal/SearchModal';
import { SelectedDailyProps } from '@/components/Home/ExpensesList';
import { leftIcon, rightIcon, searchIcon } from '@/lib/utils/Icons';
import AddModal from '../modal/AddModal';

interface HeaderProps {
  onPrev: () => void;
  onNext: () => void;
  currentYear?: number;
  currentMonth?: number;
  setTag: React.Dispatch<React.SetStateAction<string>>;
  onItemUpdated: () => void;
  monthlyList: SelectedDailyProps[];
}

function Header({
  onPrev,
  onNext,
  currentYear,
  currentMonth,
  setTag,
  onItemUpdated,
  monthlyList,
}: HeaderProps) {
  const [dailyList, setDailyList] = useState<SelectedDailyProps[]>([]);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  useEffect(() => {
    setDailyList(Object.values(monthlyList));
  }, [monthlyList]);

  const handleOpenSearchModal = () => {
    setShowSearchModal(true);
  };
  const handleCloseSearchModal = () => {
    setShowSearchModal(false);
  };

  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

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
          return acc + total * -1;
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
        <Search onClick={handleOpenSearchModal}>{searchIcon}</Search>
      </SearchWrapper>
      <InfoWrapper>
        <Balance>
          <Expense>
            지출<Price>{expense.toLocaleString()}원</Price>
          </Expense>
          <Income>
            수입<Price $deepGreen={true}>{income.toLocaleString()}원</Price>
          </Income>
        </Balance>
        <Buttons>
          <ButtonWrapper>
            <Link to={'/detail'}>
              <Button gray="true">상세 분석</Button>
            </Link>
            <Link to={'/graph'}>
              <Button gray="true">주간 분석</Button>
            </Link>
          </ButtonWrapper>
          <Add onClick={handleOpenAddModal}>+ 추가</Add>
        </Buttons>
      </InfoWrapper>
      {showAddModal && (
        <AddModal close={handleCloseAddModal} onItemUpdated={onItemUpdated} />
      )}
      {showSearchModal && (
        <SearchModal close={handleCloseSearchModal} setTag={setTag} />
      )}
    </StyledHeader>
  );
}

const Search = styled.button`
  margin-right: 10px;
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
  padding: 0.5rem 0;
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
  display: flex;
  padding: 1.4rem 0;
  margin-right: 1rem;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  display: flex;

  > a > button {
    padding: 8px 8px;
    font-size: 0.5rem;
  }

  > a:first-child {
    margin-right: 0.5rem;
  }
`;

const Add = styled.button`
  display: flex;
  margin-top: 1rem;
  justify-content: right;
  align-items: center;
  font-size: 1rem;
`;

const Expense = styled.div`
  display: flex;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
  font-size: 12px;
  color: ${theme.colors.gray[1]};
  align-items: center;
`;

const Income = styled.div`
  display: flex;
  margin-left: 1.5rem;
  font-size: 12px;
  color: ${theme.colors.gray[1]};
  align-items: center;
`;

const Price = styled.div<{
  $deepGreen?: boolean;
}>`
  margin-left: 4px;
  font-size: 1rem;
  color: black;

  ${(props) =>
    props.$deepGreen &&
    css`
      color: ${theme.colors.deepGreen};
    `};
`;

export default Header;
