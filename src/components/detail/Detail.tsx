import { useState, useEffect, useRef } from 'react';
import PeriodSelect from './PeriodSelect';
import SearchCategory from './CategorySearch';
import styled from 'styled-components';
import Chart from 'chart.js/auto';

interface ChartType {
  datasets: [{ data: number[] }],
  labels: string[]
}

const DetailGraph = () => {

  // 기간
  const [period, setPeriod] = useState('');

  // 카테고리 검색
  const [category, setCategory] = useState('');

  // 차트
  const chartRef = useRef(null);


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
      type: 'pie',
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

    const handleCategory = (value: string) => {
      setCategory(value);
      console.log(value);
    }

    return (
      <>
        <Check>
          <PeriodSelect onPeriodChange={handlePeriod} />
          <SearchCategory onCategorySearch={handleCategory} />
        </Check>
        <div>
          <div>DetailGraph</div>
          <canvas ref={chartRef} />
        </div>
        <div>
          List
        </div>
      </>
    );
  }

export default DetailGraph;

const Check = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;