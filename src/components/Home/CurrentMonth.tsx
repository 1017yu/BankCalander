import { DayProps } from '@/components/Home/TheCalender';
import { css, styled } from 'styled-components';
import { theme } from '@/styles/theme';
import { SelectedDailyProps } from '@/components/Home/ExpensesList';

interface CurrentMonthProps {
  year: number;
  month: number;
  currentDay: number;
  day: number;
  $isCurrentMonth: boolean;
  // eslint-disable-next-line no-unused-vars
  onDayClick: (year: number, month: number, currentDay: number) => void;
  monthlyList?: SelectedDailyProps[];
}

function CurrentMonth({
  year,
  month,
  day,
  currentDay,
  $isCurrentMonth,
  onDayClick,
  monthlyList,
}: CurrentMonthProps) {
  const handleClick = () => {
    onDayClick(year, month, currentDay); // 클릭 시 year, month, currentDay 값을 전달
  };

  const dailyIncome = (currentDay: number) => {
    let income = 0;

    if (monthlyList) {
      if (monthlyList[currentDay]) {
        income = Object.values(monthlyList[currentDay])
          .filter((cur) => cur.amount > 0)
          .reduce((acc: number, cur: SelectedDailyProps) => acc + cur.amount, 0)
          .toLocaleString();
      }
    }
    return income !== 0 ? `+${income}` : '';
  };
  const dailyExpense = (currentDay: number) => {
    let expense = 0;

    if (monthlyList) {
      if (monthlyList[currentDay]) {
        expense = Object.values(monthlyList[currentDay])
          .filter((cur) => cur.amount < 0)
          .reduce((acc: number, cur: SelectedDailyProps) => acc + cur.amount, 0)
          .toLocaleString();
      }
    }
    return expense !== 0 ? expense : '';
  };

  return (
    <>
      <Day
        key={`${month}-${currentDay}`}
        $isCurrentMonth={$isCurrentMonth}
        onClick={handleClick}
      >
        <DayContent $day={day} $isCurrentMonth={$isCurrentMonth}>
          {currentDay}
        </DayContent>
        <Income>{dailyIncome(currentDay)}</Income>
        <Expense>{dailyExpense(currentDay)}</Expense>
      </Day>
    </>
  );
}
const Day = styled.button<DayProps>`
  display: flex;
  flex-direction: column;
  color: ${theme.colors.gray[1]};
  cursor: pointer;
  background-color: inherit;
  align-items: center;
  min-width: calc(100% / 7);
`;

const DayContent = styled.div<DayProps>`
  color: #000;
  text-align: center;
  padding: 4px 0;

  ${(props) =>
    props.$day === 7 &&
    css`
      color: blue;
    `}

  ${(props) =>
    props.$day === 1 &&
    css`
      color: ${theme.colors.red};
    `}
    

  ${(props) => props.$isCurrentMonth && css``}

   ${(props) =>
    !props.$isCurrentMonth &&
    css`
      color: ${theme.colors.gray[1]};
    `}
`;

const Income = styled.div`
  font-size: 4px;
  color: ${theme.colors.deepGreen};
`;

const Expense = styled.div`
  font-size: 0.5rem;
`;
export default CurrentMonth;
