import { theme } from '@/styles/theme';
import { css, styled } from 'styled-components';
import { SelectedDailyProps } from './ExpensesList';
import { tags } from '@/lib/utils/Tags';

function SearchedDailyList({ dailyList }: { dailyList: SelectedDailyProps[] }) {
  const Icon = ({ label }: { label: string }) => {
    const tag = tags.find((tag) => tag.label === label);
    if (tag) {
      return <div>{tag.icon}</div>;
    }
  };

  return (
    <Container>
      <Title></Title>
      <ul>
        {dailyList
          ? dailyList.map((item, index) => (
              <li key={index}>
                <Wrapper>
                  <Category>
                    <Icon label={[...item.category.split(',')][0]} />
                    {[...item.category.split(',')][0]}
                  </Category>
                  <Amount $isSpend={item.amount > 0}>{item.amount}</Amount>
                </Wrapper>
              </li>
            ))
          : '내역이 없습니다!'}
      </ul>
    </Container>
  );
}

const Container = styled.div``;

const Title = styled.h1``;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #000;
  margin-bottom: 0.5rem;
  padding-top: 0.5rem;
`;

const Category = styled.span`
  font-size: 1rem;
  color: ${theme.colors.gray};
`;

const Amount = styled.span<{
  $isSpend?: boolean;
}>`
  font-size: 2rem;

  ${(props) =>
    props.$isSpend &&
    css`
      color: ${theme.colors.blue};
    `}
`;

export default SearchedDailyList;
