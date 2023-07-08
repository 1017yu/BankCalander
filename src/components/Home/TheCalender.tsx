import React, { useState } from 'react';
import styled from 'styled-components';

interface CalendarProps {
  date: Date;
}

interface DayProps {
  isCurrentMonth: boolean;
}

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const CalendarBody = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
`;

const Day = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
  color: #888888;
  border-radius: 4px;
  padding: 0.5rem;
`;

const DayContent = styled.span`
  color: #000000;
`;

const Calendar: React.FC<CalendarProps> = ({ date }) => {
  const [currentDate, setCurrentDate] = useState(date || new Date());

  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const handlePreviousMonth = (): void => {
    const previousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
    );
    setCurrentDate(previousMonth);
  };

  const handleNextMonth = (): void => {
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
    );
    setCurrentDate(nextMonth);
  };

  const renderCalendar = (): JSX.Element[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const calendar: JSX.Element[] = [];

    let currentDay = 1;

    for (let week = 0; week < 6; week++) {
      for (let day = 0; day < 7; day++) {
        if ((week === 0 && day < firstDay) || currentDay > daysInMonth) {
          calendar.push(
            <Day key={`${week}-${day}`}>
              <DayContent />
            </Day>,
          );
        } else {
          calendar.push(
            <Day key={`${week}-${day}`}>
              <DayContent>{currentDay}</DayContent>
            </Day>,
          );
          currentDay++;
        }
      }

      if (currentDay > daysInMonth) {
        break;
      }
    }

    return calendar;
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <button onClick={handlePreviousMonth}>Previous</button>
        <h2>
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </h2>
        <button onClick={handleNextMonth}>Next</button>
      </CalendarHeader>
      <CalendarBody>{renderCalendar()}</CalendarBody>
    </CalendarContainer>
  );
};

export default Calendar;
