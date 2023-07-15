import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { expenseSummary } from '@/lib/api/Api';

interface ExpenseItem {
  _id: string;
  totalAmount: number;
}

function getWeeksInMonth(year: number, month: number): string[][] {
  const weeks: string[][] = [];

  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  let currentWeek: string[] = [];
  let currentDate = firstDay;

  while (currentDate <= lastDay) {
    const dateStr = `${year}-${month.toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    currentWeek.push(dateStr);

    if (currentDate.getDay() === 6 || currentDate === lastDay) {
      weeks.push(currentWeek);
      currentWeek = [];
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return weeks;
}

function getOrdinalWeek(index: number): string {
  const ordinalNumbers = ['첫째', '둘째', '셋째', '넷째', '다섯째', '여섯째'];
  return ordinalNumbers[index] || '';
}

function App() {
  const [expenseData, setExpenseData] = useState<ExpenseItem[]>([]);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    renderChart();
  }, [expenseData]);

  const fetchData = async () => {
    try {
      const data = await expenseSummary('daily');
      setExpenseData(data);
    } catch (error) {
      console.error('Failed to fetch expense data:', error);
    }
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedYear(Number(event.target.value));
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedMonth(Number(event.target.value));
  };

  const handleNextMonth = (): void => {
    if (selectedMonth === 12) {
      setSelectedYear(prevYear => prevYear + 1);
      setSelectedMonth(1);
    } else {
      setSelectedMonth(prevMonth => prevMonth + 1);
    }
  };

  const handlePreviousMonth = (): void => {
    if (selectedMonth === 1) {
      setSelectedYear(prevYear => prevYear - 1);
      setSelectedMonth(12);
    } else {
      setSelectedMonth(prevMonth => prevMonth - 1);
    }
  };

  const renderMonthGraph = (year: number, month: number) => {
    const weeksInMonth = getWeeksInMonth(year, month);

    return (
      <div>
        {weeksInMonth.map((week, index) => {
          const totalAmount = week.reduce((total, date) => {
            const expenseItem = expenseData.find(item => item._id === date);
            return total + (expenseItem ? expenseItem.totalAmount : 0);
          }, 0);

          const startDay = week[0].split('-')[2];
          const endDay = week[week.length - 1].split('-')[2];

          const weekTitle = index === 0 ? '첫째 주' : `${getOrdinalWeek(index + 1)} 주`;

          return (
            <div key={index}>
              {weekTitle}
              <ul>
                {week.length === 1 ? (
                  <li>{`${month}월 ${startDay}일`}</li>
                ) : (
                  <li>{`${month}월 ${startDay}일 - ${month}월 ${endDay}일`}</li>
                )}
                <li>{totalAmount} 원</li>
              </ul>
            </div>
          );
        })}
      </div>
    );
  };

  const renderChart = () => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const weekLabels = getWeeksInMonth(selectedYear, selectedMonth).map((_, index) => `${getOrdinalWeek(index + 1)} 주`);
        const amounts = getWeeksInMonth(selectedYear, selectedMonth).map(week =>
          week.reduce((total, date) => {
            const expenseItem = expenseData.find(item => item._id === date);
            return total + (expenseItem ? expenseItem.totalAmount : 0);
          }, 0)
        );

        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: weekLabels,
            datasets: [
              {
                label: '주간 소비 금액',
                data: amounts,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  };

  return (
    <div>
      <h1>주간 그래프</h1>
      <div>
        <button onClick={handlePreviousMonth}>&lt;</button>
        <select value={selectedYear} onChange={handleYearChange}>
          <option value={2022}>2022년</option>
          <option value={2023}>2023년</option>
          <option value={2024}>2024년</option>
          <option value={2025}>2025년</option>
        </select>
        <select value={selectedMonth} onChange={handleMonthChange}>
          <option value={1}>1월</option>
          <option value={2}>2월</option>
          <option value={3}>3월</option>
          <option value={4}>4월</option>
          <option value={5}>5월</option>
          <option value={6}>6월</option>
          <option value={7}>7월</option>
          <option value={8}>8월</option>
          <option value={9}>9월</option>
          <option value={10}>10월</option>
          <option value={11}>11월</option>
          <option value={12}>12월</option>
        </select>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div>
        {renderMonthGraph(selectedYear, selectedMonth)}
      </div>
    </div>
  );
}

export default App;