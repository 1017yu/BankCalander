import { theme } from '@/styles/theme';
import { styled } from 'styled-components';

interface ExpenseProps {
  key?: string;
  date?: string;
  totalAmount?: number;
  amount?: number;
}

function ExpenseLayout({ ...props }: ExpenseProps) {
  return (
    <Wrapper>
      {props.date}: {props.totalAmount ? props.totalAmount : props.amount}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${theme.colors.green};
  border-top: 1px solid #000;
`;
export default ExpenseLayout;
