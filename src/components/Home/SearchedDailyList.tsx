import { theme } from '@/styles/theme';
import { css, styled } from 'styled-components';
import { tags } from '@/lib/utils/Tags';
import { useState } from 'react';
import UpdateModal from '../modal/UpdateModal';

interface SelectedDailyProps {
  [x: string]: any;
  amount: number;
  category: string;
  date: string;
  userId: string;
  _id: string;
}

interface SearchedDailyList {
  dailyList: SelectedDailyProps[];
  onItemUpdated: () => void;
}

function SearchedDailyList({ dailyList, onItemUpdated }: SearchedDailyList) {
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

  const handleOpenUpdateModal = () => {
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    onItemUpdated();
  };

  const Icon = ({ label }: { label: string }) => {
    const tag = tags.find((tag) => tag.label === label);
    if (tag) {
      return <div>{tag.icon}</div>;
    }
  };
  console.log(dailyList);
  return (
    <>
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
                  <Detail>
                    <Amount $isSpend={item.amount > 0}>
                      {item.amount.toLocaleString()}원
                    </Amount>
                    <Buttons>
                      <button>상세</button>
                      <button onClick={handleOpenUpdateModal}>수정</button>
                    </Buttons>
                  </Detail>
                </Wrapper>
                {showUpdateModal && (
                  <UpdateModal
                    key={index}
                    amount={item.amount}
                    category={item.category}
                    date={item.date}
                    _id={item._id}
                    close={handleCloseUpdateModal}
                  />
                )}
              </li>
            ))
          : '내역이 없습니다!'}
      </ul>
    </>
  );
}

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

const Detail = styled.div`
  display: flex;
`;

const Amount = styled.span<{
  $isSpend?: boolean;
}>`
  margin: 2px 8px;
  ${(props) =>
    props.$isSpend &&
    css`
      color: ${theme.colors.blue};
    `}
`;

const Buttons = styled.div``;

export default SearchedDailyList;
