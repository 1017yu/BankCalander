import Dropdown from './Dropdown';

interface ExpensesTagProps {
  handleTagChange: (tags: string) => void;
}

function ExpensesTag({ handleTagChange }: ExpensesTagProps) {
  const ExpensesTags = [
    '식비',
    '교통비',
    '생필품',
    '의류',
    '미용',
    '의료/건강',
    '교육',
    '통신비',
    '회식/모임',
    '경조사',
    '저축',
    '가전',
    '공과금',
    '카드결제',
    '기타',
  ];

  return (
    <Dropdown options={ExpensesTags} onSelect={handleTagChange} />
  );
}

export default ExpensesTag;