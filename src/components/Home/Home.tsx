import TheCalendar from './TheCalender';
import ExpensesList from './ExpensesList';
import { useEffect, useState } from 'react';
import { calendarData } from '@/lib/api/Api';

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
  const [dailyList, setDailyList] = useState<SelectedDailyProps[]>([]);
  const [monthlyList, setMonthlyList] = useState<SelectedDailyProps[]>([]);
  const [selectedDate, setSelectedDate] = useState<SelectedDateProps>();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const onDayClick = (year: number, month: number, currentDay: number) => {
    setSelectedDate({ year, month, currentDay });
  };

  useEffect(() => {
    const fetchDayList = async () => {
      if (selectedDate) {
        const res = await calendarData(
          selectedDate?.year as number,
          selectedDate?.month as number,
        );
        setDailyList(res[selectedDate.currentDay]);
      }
    };

    const fetchMonthList = async () => {
      const res = await calendarData(currentYear, currentMonth);
      setMonthlyList(res);
    };
    fetchDayList();
    fetchMonthList();
  }, [selectedDate, currentMonth]);

  return (
    <div>
      <TheCalendar
        onDayClick={onDayClick}
        dailyList={dailyList}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        currentYear={currentYear}
        setCurrentYear={setCurrentYear}
        monthlyList={monthlyList}
      />
      <ExpensesList dailyList={dailyList} />
    </div>
  );
}

export default Home;
