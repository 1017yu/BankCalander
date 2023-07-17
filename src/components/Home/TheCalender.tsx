import CurrentMonth from '@/components/home/CurrentMonth';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import WeeklyExpenses from '@/components/home/WeeklyExpenses';
import NotCurrentMonth from '@/components/home/NotCurrentMonth';
import Header from '../common/Header';
import { expenseSummary } from '@/lib/api/Api';
import { theme } from '@/styles/theme';
import { SelectedDailyProps } from '@/components/home/ExpensesList';

export interface DayProps {
  $isCurrentMonth?: boolean;
  $day?: number;
}
interface GetDaysProps {
  year: number;
  month: number;
}

interface CalendarProps {
  onDayClick: (year: number, month: number, currentDay: number) => void;
  setTag: React.Dispatch<React.SetStateAction<string>>;
  dailyList: SelectedDailyProps[];
  monthlyList: SelectedDailyProps[];
  currentMonth: number;
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
  currentYear: number;
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
}

interface WeeklyListProps {
  _id: string;
  totalAmount: number;
}

const TheCalendar = ({
  setTag,
  onDayClick,
  monthlyList,
  currentMonth,
  setCurrentMonth,
  currentYear,
  setCurrentYear,
}: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weeklyList, setWeeklyList] = useState<WeeklyListProps[]>([]);
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

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
    let prevMonth: Date;
    // 현재 1월에서 prev할 때
    if (currentMonth === 1) {
      // 작년 12월 1일의 데이터를 저장
      prevMonth = new Date(currentYear - 1, 11);
      // 연도를 작년 연도로 바꿈
      setCurrentYear(currentYear - 1);
      // 1월 -> 12월이 아닌, 일반적으로 1개월씩 줄일 때
    } else {
      // prevMonth에 현재년도 이전 월 저장
      prevMonth = new Date(currentYear, currentMonth - 2);
    }
    //
    setCurrentDate(prevMonth); // 이전 월 1일로 저장
    setCurrentMonth(prevMonth.getMonth() + 1);
  };

  // 다음 Month로 이동하는 클릭 이벤트
  const handleNextMonth = () => {
    let nextMonth: Date;
    // 현재 12월에서 next할 때
    if (currentMonth === 12) {
      // 내년 1월 1일의 데이터를 저장
      nextMonth = new Date(currentYear + 1, 0);
      // 연도를 내년 연도로 바꿈
      setCurrentYear(currentYear + 1);
      // 12월 -> 1월이 아닌, 일반적으로 1개월씩 줄일 때
    } else {
      // nextMonth에 현재년도 내년 월 저장
      nextMonth = new Date(currentYear, currentMonth);
    }
    //
    setCurrentDate(nextMonth); // 이전 월 1일로 저장
    setCurrentMonth(nextMonth.getMonth() + 1);
  };

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

  const calendar = [];
  let currentDay = 1;

  // week 0주차부터 5주차까지
  for (let week = 0; week <= 5; week++) {
    // 한 주를 담는 배열 선언
    const weekDays = [];

    // day 한 주에 1일부터 7일까지
    for (let day = 1; day <= 7; day++) {
      // 구하고자 하는 달력 외의 날짜 표기
      if ((week === 0 && day <= firstDayIdx) || currentDay > lastDate) {
        weekDays.push(
          <NotCurrentMonth
            key={`${month + 1}-${day}`}
            week={week}
            day={day}
            prevMonthLastDate={prevMonthLastDate}
            firstDayIdx={firstDayIdx}
            $isCurrentMonth={false}
            currentDay={currentDay}
            lastDate={lastDate}
            nextMonthFirstIdx={nextMonthFirstIdx}
          />,
        );
      } else {
        weekDays.push(
          <CurrentMonth
            key={`${year}-${month + 1}-${currentDay}`}
            year={year}
            month={month + 1}
            day={day}
            $isCurrentMonth={true}
            currentDay={currentDay}
            onDayClick={onDayClick}
            monthlyList={monthlyList}
          />,
        );
        currentDay++;
      }
    }
    // 캘린더라는 배열에 한 주차씩 push
    calendar.push(
      <WeekWrapper key={`week-${week}`}>
        <WeeklyExpenses
          year={year}
          month={month + 1}
          week={week + 1}
          weeklyList={weeklyList}
        />
        <Week key={`week-${week + 6}`}>{weekDays}</Week>
      </WeekWrapper>,
    );
    // 현재 날짜(currentDay)가 마지막 날짜(lastDate)를 초과한 경우,
    // 반복문을 종료하여 남은 주차를 표시하지 않음
    if (currentDay > lastDate) {
      break;
    }
  }

  // Weekly 조회
  useEffect(() => {
    const fetchList = async () => {
      const res = await expenseSummary('weekly');
      setWeeklyList(res);
    };
    fetchList();
  }, []);

  return (
    <Container>
      <Header
        setTag={setTag}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
        currentYear={currentYear}
        currentMonth={currentMonth}
      />
      <WeekDay>
        {weekDays.map((date) => (
          <Dates key={`${date}`}>{date}</Dates>
        ))}
      </WeekDay>
      <Calendar>{calendar}</Calendar>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Calendar = styled.div`
  width: 100%;
`;

const WeekWrapper = styled.div``;

const Week = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 0.5rem;
  min-height: 3.5rem;
  width: 100%;
`;

const WeekDay = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: end;
`;

const Dates = styled.div`
  display: flex;
  min-height: 3.5rem;
  align-items: end;
  margin-bottom: 0.5rem;
  min-width: calc(100% / 7);
  justify-content: center;
  color: ${theme.colors.gray[1]};
`;

export default TheCalendar;
