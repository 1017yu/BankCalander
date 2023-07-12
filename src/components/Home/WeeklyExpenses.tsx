import { styled } from 'styled-components';

interface WeeklyExpensesProps {
  year: number;
  month: number;
}

function WeeklyExpenses({ year, month }: WeeklyExpensesProps) {
  return (
    <Wrapper>
      {year}
      {month}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  height: 1rem;
  text-align: right;
  font-size: 0.8rem;
  background-color: #b9b7b7;
`;

export default WeeklyExpenses;
