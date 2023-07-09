import { useState, useEffect, useRef } from 'react';
import PeriodSelect from './PeriodSelect';
import SearchCategory from './CategorySearch';
import ExpensesSelect from './ExpensesSelect';
import styled from 'styled-components';
import Chart from 'chart.js/auto';
import {expenseSummary, expenseSearch} from '@/lib/api/Api';

interface ChartType {
  datasets: [{ data: number[] }],
  labels: string[]
}

export default function Detail () {

  // 기간
  const [period, setPeriod] = useState('monthly');
  const [summaries, setSummeries] = useState<SummaryResponse>([])
  const [sortSummaries, setSortSummeries] = useState<SummaryResponse>([])

  const periodApi = async (selectedPeriod: string) => {
    try {
      const response = await expenseSummary(selectedPeriod);
      setSummeries(response)
      console.log(response)
    } catch (error) {
      console.log('error :', error)
    }
  }

  useEffect(() => {
    periodApi(period)
  }, [period])

  const sortSummariesFunc = () => {
    setSortSummeries(summaries.sort((acc, cur) => {
      const idA = Number(acc._id.replace(/-/g, ''))
      const idB = Number(cur._id.replace(/-/g, ''))
      return idA - idB
    }))
  }

  useEffect(() => {
    sortSummariesFunc()
  }, [summaries])

  console.log(3)
  console.log(sortSummaries)
  console.log(4)

  // 수입, 지출
  const [expenses, setExpenses] = useState('');

  // const filterExpenses = () => {
  //   summaries.filter((item) => {item.totalAmount > 0})
  // }

  // 차트
  const chartRef = useRef(null);

  // 차트
  useEffect(() => {
    const chartLabels = summaries.map((summary) => {
      if(period === 'monthly') {
        const [year, month] = summary._id.split('-')
        return `${year}년-${month}월`
      } else if ( period === 'weekly'){
        const weekNum = summary._id.split('-')[1]
        return `주${weekNum}`
      } else if ( period === 'daily') {
        const [, monthNum, dayNum] = summary._id.split('-')
        return `${monthNum}월 ${dayNum}일`
      }
    })

    const chartData = {
      labels: chartLabels,
      datasets: [
        {
          label: '지출 내역',
          data: summaries.map((summary) => summary.totalAmount), // 각 주에 해당하는 지출 데이터
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
  }, [summaries, period]);




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
        {sortSummaries.map((summary, index) => 
          <li key={index}>
            <div>
              date: {summary._id} 금액: {summary.totalAmount.toLocaleString()+'원'}
            </div>
          </li>)}
      </>
    );
  }

const Check = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;