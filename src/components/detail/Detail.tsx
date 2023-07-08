import { useState, useEffect, useRef } from 'react';
import PeriodSelect from './PeriodSelect';
import SearchCategory from './CategorySearch';
import ExpensesSelect from './ExpensesSelect';
import styled from 'styled-components';
import Chart from 'chart.js/auto';
import {summary, search} from '@/lib/api/Api';

interface ChartType {
  datasets: [{ data: number[] }],
  labels: string[]
}

export default function Detail () {

  // 기간
  const [period, setPeriod] = useState('weekly');
  const [summaries, setSummeries] = useState<SummaryResponse>([])

  const periodApi = async (selectedPeriod: string) => {
    try {
      const userId = 'team1'
      const response = await summary(selectedPeriod, userId);
      setSummeries(response)
    } catch (error) {
      console.log('error :', error)
    }
  }

  useEffect(() => {
    periodApi(period)
  }, [period])

  console.log(typeof summaries)

  // 수입, 지출
  const [expenses, setExpenses] = useState('');



  // 차트
  const chartRef = useRef(null);

  // 차트
  useEffect(() => {
    const chartData = {
      labels: ['1주', '2주', '3주', '4주'],
      datasets: [
        {
          label: '주 별 지출',
          data: [100, 200, 0, 300], // 각 주에 해당하는 지출 데이터
          backgroundColor: 'rgba(75, 192, 192, 0.6)', // 차트 영역 배경색
          borderColor: 'rgba(75, 192, 192, 1)', // 차트 선 색상
          borderWidth: 1, // 차트 선 두께
        },
      ],
    };
    // 차트 옵션
    const chartOptions = {
      responsive: true,
      scales: {

        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 100, // y 축 간격
          },
        },
      },
    };

    // 차트 생성
    const myChart = new Chart(chartRef.current, {
      type: 'bar',
      data: chartData,
      options: chartOptions,
    });

    // 컴포넌트 언마운트 시 차트 인스턴스 제거
    return () => {
      myChart.destroy();
    };
  }, []);




    const handlePeriod = (value: string) => {
      setPeriod(value);
      console.log(value);
    }

    const handleExpenses = (value: string) => {
      setExpenses(value)
      console.log(value);
    }

    return (
      <>
        <Check>
          <PeriodSelect onPeriodChange={handlePeriod} />
          <ExpensesSelect onExpensesSelect={handleExpenses}/>
        </Check>
        <div>
          <div>DetailGraph</div>
          <canvas ref={chartRef} />
        </div>
        <div>
          List
        </div>
        {summaries.map((summary, index) => <li key={index}>{summary._id}: {summary.totalAmount}</li>)}
      </>
    );
  }

const Check = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;