import {useEffect, useRef} from 'react'
import Chart from 'chart.js/auto';

function DeatilChart({summaries, period, selectChart}) {

  const chartRef = useRef('');

  useEffect(() => {
    const chartLabels = summaries.map((summary) => {
      if(period === 'monthly') {
        const [year, month] = summary._id.split('-')
        return `${year}년 ${month}월`
      } else if ( period === 'weekly'){
        const weekNum = summary._id.split('-')[1]
        return `주${weekNum}`
      } else if ( period === 'daily') {
        const [, monthNum, dayNum] = summary._id.split('-')
        return `${monthNum}월 ${dayNum}일`
      }
    })

    const dynaminColor = function () {
      let r = Math.floor(Math.random() * 255)
      let g = Math.floor(Math.random() * 255)
      let b = Math.floor(Math.random() * 255)
      return 'rgba(' + r + ',' + g + ',' + b + ',0.6)'
    }

    const chartData = {
      labels: chartLabels,
      datasets: [
        {
          label: '지출 내역',
          data: summaries.map((summary) => summary.totalAmount), // 각 주에 해당하는 지출 데이터
          backgroundColor: summaries.map(() => dynaminColor()), // 차트 영역 배경색
          borderColor: 'rgba(75, 192, 192, 1)', // 차트 선 색상
          borderWidth: 2, // 차트 선 두께
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
      type: selectChart,
      data: chartData,
      options: chartOptions,
    });

    // 컴포넌트 언마운트 시 차트 인스턴스 제거
    return () => {
      myChart.destroy();
    };
  }, [summaries, period, selectChart]);

  return (
    <div>
      <canvas ref = {chartRef} />
    </div>
  )
}

export default DeatilChart