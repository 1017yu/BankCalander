import SearchedDailyList from './SearchedDailyList';
import { useState } from 'react';

export interface SelectedDailyProps {
  [x: string]: any;
  amount: number;
  category: string;
  date: string;
  userId: string;
  _id: string;
}
interface CalendarDataProps {
  dailyList: SelectedDailyProps[];
}

function ExpensesList({ dailyList }: CalendarDataProps) {
  const [cateoryList, setCateoryList] = useState<SearchResponseItem[]>([]);

  // // 일별 소비 조회
  // const category = await expenseSearch('식비'); // 검색어(식비)에 해당하는 소비 일자와 금액을 조회
  // setCateoryList(category);

  return (
    <>
      <SearchedDailyList dailyList={dailyList} />
    </>
  );
}

export default ExpensesList;
