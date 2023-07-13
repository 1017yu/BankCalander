import { theme } from '@/styles/theme';
import { styled } from 'styled-components';

interface WeeklyExpensesProps {
  week: number;
  month: number;
}

function WeeklyExpenses({ week, month }: WeeklyExpensesProps) {
  return <Wrapper>{week}</Wrapper>;
}
const Wrapper = styled.div`
  text-align: right;
  font-size: 0.8rem;
  background-color: ${theme.colors.gray[0]};
`;

export default WeeklyExpenses;
