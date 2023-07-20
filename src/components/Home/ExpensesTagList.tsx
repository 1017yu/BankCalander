import { useState } from 'react';
import { theme } from '@/styles/theme';
import { tags } from '@/lib/utils/Tags';
import InfoModal from '../modal/InfoModal';
import UpdateModal from '../modal/UpdateModal';
import { css, styled } from 'styled-components';
import Button from '../common/Button';

interface SelectedDailyProps {
  amount: number;
  category: string;
  date: string;
  userId: string;
  _id: string;
}

interface SearchedTagList {
  dailyList: SelectedDailyProps[];
  tag: string;
  onItemUpdated: () => void;
}

function SearchedTagList({ dailyList, onItemUpdated }: SearchedTagList) {
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [selelctItem, setSelectItem] = useState<SelectedDailyProps | null>(
    null,
  );

  const handleOpenUpdateModal = (item: SelectedDailyProps) => {
    setShowUpdateModal(true);
    setSelectItem(item);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const handleOpenInfoModal = (item: SelectedDailyProps) => {
    setShowInfoModal(true);
    setSelectItem(item);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
  };

  const Icon = ({ label }: { label: string }) => {
    const iconTag = tags.find((iconTag) => iconTag.label === label);
    if (iconTag) {
      return <div>{iconTag.icon}</div>;
    }
  };

  return (
    <div>
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
                      <Button
                        $gray="true"
                        onClick={() => handleOpenInfoModal(item)}
                      >
                        상세
                      </Button>
                      <Button
                        $gray="true"
                        onClick={() => handleOpenUpdateModal(item)}
                      >
                        수정
                      </Button>
                    </Buttons>
                  </Detail>
                </Wrapper>
                {showInfoModal && selelctItem && (
                  <InfoModal
                    key={index}
                    amount={selelctItem.amount}
                    category={selelctItem.category}
                    date={selelctItem.date}
                    close={handleCloseInfoModal}
                  />
                )}

                {showUpdateModal && selelctItem && (
                  <UpdateModal
                    key={index}
                    amount={selelctItem.amount}
                    category={selelctItem.category}
                    date={selelctItem.date}
                    _id={selelctItem._id}
                    close={handleCloseUpdateModal}
                    onItemUpdated={onItemUpdated}
                  />
                )}
              </li>
            ))
          : '내역이 없습니다!'}
      </ul>
    </div>
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

const Category = styled.div`
  color: ${theme.colors.gray};
  display: flex;
`;

const Detail = styled.div`
  display: flex;
`;

const Amount = styled.div<{
  $isSpend?: boolean;
}>`
  margin: 2px 8px;

  ${(props) =>
    props.$isSpend &&
    css`
      color: ${theme.colors.blue};
    `}
`;

const Buttons = styled.div`
  > button {
    font-size: 0.5rem;
    padding: 4px 8px;
    margin-left: 5px;
  }
  > button:hover {
    transform: scale(110%);
  }
`;

export default SearchedTagList;
