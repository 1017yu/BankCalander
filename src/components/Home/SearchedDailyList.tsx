import { theme } from '@/styles/theme';
import { css, styled } from 'styled-components';
import { tags } from '@/lib/utils/Tags';

interface SelectedDailyProps {
  [x: string]: any;
  amount: number;
  category: string;
  date: string;
  userId: string;
  _id: string;
}

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
                    <Title>{[...item.category.split(',')][0]}</Title>
                  </Category>
                  <Amount $isSpend={item.amount > 0}>
                    {item.amount.toLocaleString()}원
                  </Amount>
                </Wrapper>
              </li>
            ))
          : '내역이 없습니다!'}
      </ul>
    </Container>
  );
}

const Container = styled.div``;

const Title = styled.h1`
  margin-left: 0.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #000;
  margin-bottom: 0.5rem;
  padding: 1rem 0.5rem 0.5rem;
`;

const Category = styled.span`
  font-size: 1rem;
  color: ${theme.colors.gray};
  display: flex;
`;

const Amount = styled.span<{
  $isSpend?: boolean;
}>`
  font-size: 1rem;

  ${(props) =>
    props.$isSpend &&
    css`
      color: ${theme.colors.blue};
    `}
`;

export default SearchedDailyList;
