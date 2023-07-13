import { weekToNumFn } from '@/lib/utils/weekNumFn';
import { theme } from '@/styles/theme';
import { css, styled } from 'styled-components';

interface WeeklyListProps {
  _id?: string;
  totalAmount?: number;
}
interface WeeklyExpensesProps {
  year?: number;
  month?: number;
  week?: number;
  weeklyList: WeeklyListProps[];
}

function WeeklyExpenses({ ...props }: WeeklyExpensesProps) {
  const weekOfYear = weekToNumFn(
    props.year as number,
    props.month as number,
    props.week as number,
  );

  const targetWeek = props.weeklyList.find(
    (v) => v._id === `2023-${weekOfYear}`,
  );

  const targetAmount = targetWeek?.totalAmount;

  return (
    <>
      {targetAmount ? (
        <Wrapper $isPositive={(targetAmount as number) > 0}>
          {targetAmount > 0 ? '+' : '-'}
          {targetAmount}
        </Wrapper>
      ) : (
        <Wrapper $isPositive={false}>0</Wrapper>
      )}
    </>
  );
}
const Wrapper = styled.div<{
  $isPositive: boolean;
}>`
  display: flex;
  justify-content: right;
  padding-right: 2px;
  font-size: 0.8rem;
  background-color: ${theme.colors.gray[0]};
  ${(props) =>
    props.$isPositive &&
    css`
      color: ${theme.colors.deepGreen};
    `}
`;

export default WeeklyExpenses;
