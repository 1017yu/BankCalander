import TheCalendar from './TheCalender';
import ExpensesList from './ExpensesList';
import { useState } from 'react';

export interface SelectedDateProps {
  year: number;
  month: number;
  currentDay: number;
}

function Home() {
  const [selectedDate, setSelectedDate] = useState<SelectedDateProps>();
  const onDayClick = (year: number, month: number, currentDay: number) => {
    setSelectedDate({ year, month, currentDay });
  };
  return (
    <div>
      <TheCalendar onDayClick={onDayClick} />
      <ExpensesList selectedDate={selectedDate} />
    </div>
  );
}

export default Home;
