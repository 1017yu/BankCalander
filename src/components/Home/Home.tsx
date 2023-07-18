import { useEffect, useState } from 'react';
import TheCalendar from '@/components/Home/TheCalender';
import ExpensesList from '@/components/Home/ExpensesList';
import { calendarData, expenseSearch } from '@/lib/api/Api';
import { styled } from 'styled-components';

export interface SelectedDateProps {
  year: number;
  month: number;
  currentDay: number;
}

interface SelectedDailyProps {
  [x: string]: any;
  amount: number;
  category: string;
  date: string;
  userId: string;
  _id: string;
}

function Home() {
  const [tag, setTag] = useState(''); // 카테고리 소비 태그
  const [dailyList, setDailyList] = useState<SelectedDailyProps[]>([]);
  const [monthlyList, setMonthlyList] = useState<SelectedDailyProps[]>([]);
  const [selectedDate, setSelectedDate] = useState<SelectedDateProps>();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const onDayClick = (year: number, month: number, currentDay: number) => {
    setSelectedDate({ year, month, currentDay });
  };

  const onItemUpdated = async () => {
    const res = await calendarData(currentYear, currentMonth);
    setMonthlyList(res);
    if (selectedDate) {
      setDailyList(res[selectedDate.currentDay]);
    }
  };

  useEffect(() => {
    const fetchDayList = async () => {
      if (selectedDate) {
        const res = await calendarData(currentYear, currentMonth);
        setDailyList(res[selectedDate.currentDay]);
      }
    };

    fetchDayList();
  }, [selectedDate, currentYear, currentMonth]);

  useEffect(() => {
    const fetchMonthList = async () => {
      const res = await calendarData(currentYear, currentMonth);
      setMonthlyList(res);
    };
    fetchMonthList();
  }, [currentYear, currentMonth]);

  useEffect(() => {
    const fetchCategoryList = async () => {
      if (tag) {
        const res = await expenseSearch(tag);
        setDailyList(res);
      }
    };
    fetchCategoryList();
  }, [tag]);

  return (
    <Container>
      <TheCalendar
        setTag={setTag}
        onDayClick={onDayClick}
        dailyList={dailyList}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        currentYear={currentYear}
        setCurrentYear={setCurrentYear}
        monthlyList={monthlyList}
        onItemUpdated={onItemUpdated}
      />

      <ExpensesList
        dailyList={dailyList}
        tag={tag}
        onItemUpdated={onItemUpdated}
      />
    </Container>
  );
}

const Container = styled.div``;

export default Home;
