import { DayProps } from '@/components/Home/TheCalender';
import { css, styled } from 'styled-components';
import { theme } from '@/styles/theme';

interface CurrentMonthProps {
  year: number;
  month: number;
  currentDay: number;
  day: number;
  $isCurrentMonth: boolean;
  onDayClick: (year: number, month: number, currentDay: number) => void;
}

function CurrentMonth({
  year,
  month,
  day,
  currentDay,
  $isCurrentMonth,
  onDayClick,
}: CurrentMonthProps) {
  const handleClick = () => {
    onDayClick(year, month, currentDay); // 클릭 시 year, month, currentDay 값을 전달
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
      </Day>
    </>
  );
}
const Day = styled.button<DayProps>`
  display: flex;
  justify-content: center;
  color: ${theme.colors.gray[1]};
  cursor: pointer;
  background-color: inherit;
  min-width: 1.5rem;
`;

const DayContent = styled.div<DayProps>`
  color: #000;

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
      color: #b9b7b7;
    `}
`;
export default CurrentMonth;
