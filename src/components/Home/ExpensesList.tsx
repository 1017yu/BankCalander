import SearchedDailyList from './SearchedDailyList';
import { useEffect, useState } from 'react';
import { calendarData } from '@/lib/api/Api';
import { SelectedDateProps } from './Home';

interface SummaryResponseItem {
  _id: string;
  totalAmount: number;
}

export interface SelectedDailyProps {
  amount: number;
  category: string;
  date: Date;
  userId: string;
  _id: string;
}
interface ExpensesListProps {
  selectedDate?: SelectedDateProps;
}

function ExpensesList({ selectedDate }: ExpensesListProps) {
  const [dailyList, setDailyList] = useState<SelectedDailyProps[]>([]);
  const [cateoryList, setCateoryList] = useState<SearchResponseItem[]>([]);

  useEffect(() => {
    const fetchList = async () => {
      if (selectedDate) {
        const response = await calendarData(
          selectedDate?.year as number,
          selectedDate?.month as number,
        );
        setDailyList(response[selectedDate.currentDay]);
      }
    };
    fetchList();
  }, [selectedDate]);
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
