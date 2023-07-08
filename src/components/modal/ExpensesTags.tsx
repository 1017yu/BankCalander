import { useState } from 'react'
import styled from 'styled-components';

function Expenses() {
  const [dropDown, setDropDown] = useState(true);

  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };

  const expensesTags = [
    {id: "식비", value: "식비"},
    {id: "교통비", value: "교통비"},
    {id: "문화생활", value: "문화생활"},
    {id: "생필품", value: "생필품"},
    {id: "의류", value: "의류"},
    {id: "미용", value: "미용"},
    {id: "의료/건강", value: "의료/건강"},
    {id: "교육", value: "교육"},
    {id: "통신비", value: "통신비"},
    {id: "회식", value: "회식"},
    {id: "경조사", value: "경조사"},
    {id: "저축", value: "저축"},
    {id: "가전", value: "가전"},
    {id: "공과금", value: "공과금"},
    {id: "카드대금", value: "카드대금"},
    {id: "기타", value: "기타"}
  ]
  return (
    <DropdownWrapper onClick={toggleDropDown}>
      <Title>소비 태그</Title>
      <Menu closed={dropDown}>
        <ItemBoard>
          {expensesTags.map(expense => (
          <MenuItem key={expense.id}>{expense.value}</MenuItem>
        ))}
        </ItemBoard>
      </Menu>
    </DropdownWrapper>
  )
}

const DropdownWrapper = styled.div`
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    margin: 30px;
    background: rgb(248, 248, 248);
    border: solid 1px rgb(222, 222, 222);
    width: 320px;
    cursor: pointer;
    text-align: center;
`;

const Title = styled.h2 `
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Menu = styled.div<{ closed: boolean }>`
    margin: 0;
    padding: 0;
    list-style-type: none;
    height: ${props => (props.closed ? '0px' : 'auto')};
`;

const ItemBoard = styled.div`
    display: flex;
    flex-wrap: wrap;
}
`;


const MenuItem = styled.span`
    font-size: 16px;
    text-align: center;
    padding: 14px 10px;
    flex: 1 0 24%;
    margin: 0.5%;

    &:hover {
      color: red;
}
`;

export default Expenses