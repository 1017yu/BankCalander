import { theme } from '@/styles/theme';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import WeeklyExpenses from '@/components/Home/WeeklyExpenses';
import weekNumFn from '@/lib/utils/weekNumFn';

interface CalendarProps {
  date: Date;
}

interface DayProps {
  $isCurrentMonth: boolean;
}

interface DayContentProps extends DayProps {
  $day?: number;
}

interface GetDaysProps {
  year: number;
  month: number;
}

const Calendar: React.FC<CalendarProps> = ({ date }) => {
  const [currentDate, setCurrentDate] = useState(date || new Date());

  // 마지막 날짜 반환 함수
  const getLastDate = ({ year, month }: GetDaysProps) => {
    // month index는 0부터
    // 구하고자 하는 연월의 마지막 날짜 반환 (8월 0일 => 7월 31일)
    return new Date(year, month + 1, 0).getDate();
  };

  // 첫 요일 반환 함수 (0: 월요일 ~ 6: 일요일)
  const getFirstDayIdx = ({ year, month }: GetDaysProps) => {
    return new Date(year, month, 1).getDay();
  };

  // 이전 Month로 이동하는 클릭 이벤트
  const handlePrevMonth = () => {
    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
    );
    setCurrentDate(prevMonth);
  };

  // 다음 Month로 이동하는 클릭 이벤트
  const handleNextMonth = () => {
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
    );
    setCurrentDate(nextMonth);
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const lastDate = getLastDate({ year, month }); // 해당 월의 마지막 날짜
    const firstDayIdx = getFirstDayIdx({ year, month }); // 해당 월의 첫 번째 요일 인덱스

    const prevMonth = new Date(year, month - 1); // 이전 달
    const prevMonthLastDate = getLastDate({
      year: prevMonth.getFullYear(), // 이전 month의 연도(2023)
      month: prevMonth.getMonth(), // 이전 month index (5)
    });

    const nextMonth = new Date(year, month + 1);
    const nextMonthFirstIdx = getFirstDayIdx({
      year: nextMonth.getFullYear(), // 이후 month의 연도(2023)
      month: nextMonth.getMonth(), // 이후 month index (7)
    });
    console.log(weekNumFn(2023, 7, 8));

    const calendar = [];

    let currentDay = 1;

    // week 0주차부터 5주차까지
    for (let week = 0; week <= 5; week++) {
      // 한 주를 담는 배열 선언
      const weekDays = [];

      // day 한 주에 1일부터 7일까지
      for (let day = 1; day <= 7; day++) {
        // 구하고자 하는 달력 외의 날짜 표기
        // '0주차이고, 첫 번째 요일 인덱스보다 day 값이 작거나 같을 경우' 또는 '현재 날짜(currentDay)가 마지막 날짜(lastDate)를 초과한 경우'
        if ((week === 0 && day <= firstDayIdx) || currentDay > lastDate) {
          // 0주차이고, 첫 번째 요일 인덱스보다 day 값이 작거나 같을 경우 (1일 이전)
          if (week === 0 && day <= firstDayIdx) {
            weekDays.push(
              <Day key={`prev-${week}-${day}`} $isCurrentMonth={false}>
                <DayContent $isCurrentMonth={false}>
                  {/* 30 - firstDayIndex + day */}
                  {prevMonthLastDate - (firstDayIdx - day)}
                </DayContent>
              </Day>,
            );
            // 현재 날짜(currentDay)가 마지막 날짜를 초과한 경우(31일 이후)
          } else if (currentDay > lastDate) {
            weekDays.push(
              <Day key={`next-${week}-${day}`} $isCurrentMonth={false}>
                <DayContent $isCurrentMonth={false}>
                  {/* 현재 날짜 - 마지막 해당 월의 날짜 + day - 다음 달의 첫 날짜 index - 1 */}
                  {currentDay - lastDate + day - nextMonthFirstIdx - 1}
                </DayContent>
              </Day>,
            );
          }
          // 구하고자 하는 날짜 표기
        } else {
          weekDays.push(
            <Day key={`${week}-${day}`} $isCurrentMonth={true}>
              <DayContent $day={day} $isCurrentMonth={true}>
                {currentDay}
              </DayContent>
            </Day>,
          );

          currentDay++;
        }
      }
      // 캘린더라는 배열에 한 주차씩 push
      calendar.push(
        <div key={`week-${week}`}>
          <WeeklyExpenses />
          <CalendarWeek key={`week-${week}`}>{weekDays}</CalendarWeek>
        </div>,
      );
      // 현재 날짜(currentDay)가 마지막 날짜(lastDate)를 초과한 경우,
      // 반복문을 종료하여 남은 주차를 표시하지 않음
      if (currentDay > lastDate) {
        break;
      }
    }
    return calendar;
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <button onClick={handlePrevMonth}>Previous</button>
        <h2>
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </h2>
        <button onClick={handleNextMonth}>Next</button>
      </CalendarHeader>
      <CalendarBody>{renderCalendar()}</CalendarBody>
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  width: 100%;
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const CalendarBody = styled.div`
  width: 100%;
`;

const CalendarWeek = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 0.5rem;
  min-height: 5rem;
`;

const Day = styled.button<DayProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888888;
  border: none;
  cursor: pointer;
  background-color: inherit;
`;

const DayContent = styled.div<DayContentProps>`
  color: #000;

  ${(props) =>
    props.$day === 7 &&
    css`
      color: blue;
    `}

  ${(props) =>
    props.$day === 1 &&
    css`
      color: ${theme.colors.red};
    `}
    

  ${(props) => props.$isCurrentMonth && css``}

   ${(props) =>
    !props.$isCurrentMonth &&
    css`
      color: #b9b7b7;
    `}
`;

export default Calendar;
