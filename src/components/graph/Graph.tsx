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

/*   useEffect(() => {
    renderChart();
  }, [expenseData]);
 */

useEffect(() => {
  let myChart: any = ''
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

      myChart = new Chart(ctx, {
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

  return () => {
    myChart.destroy();
  }
}, [selectedYear, selectedMonth, expenseData])

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

/*   const renderChart = () => {
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
  }; */
  const years = [];
  
  for (let i = 2022; i <= 2099; i++) {
    years.push(
      <option key = {i} value = {i}>{i}년</option>
    );
  }

  const months = [];

  for (let i = 1; i <= 12; i++) {
    months.push(
      <option key = {i} value = {i}>{i}월</option>
    );
  }

  return (
    <div>
      <h1>주간 그래프</h1>
      <div>
        <button onClick={handlePreviousMonth}>&lt;</button>
        <select value={selectedYear} onChange={handleYearChange}>
          {years}
        </select>
        <select value={selectedMonth} onChange={handleMonthChange}>
          {months}
        </select>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div>
        {renderMonthGraph(selectedYear, selectedMonth)}
      </div>
      <canvas ref={chartRef}/>
    </div>
  );
}

export default App;
