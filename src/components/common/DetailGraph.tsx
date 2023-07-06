import {useState, useEffect} from 'react'
import DailySelect from './DailySelect'
import Chart from 'chart.js/auto'

interface ChartType {
  datasets: [{data: number[]}],
  labels: string[]
}

const DetailGraph = () => {
  const [detailGraph, setDetailGraph] = useState('')
  const [keywords, setKeywords] = useState('')
  const [userId, setUserId] = useState('')

  const  [period, setPeriod] = useState('')

  const searchApi = async () => {
    const response = await fetch(`http://52.78.195.183:3003/api/expenses/search?q=${keywords}&userId=${userId}`)
    console.log(response)
    const data = await response.json()
    setDetailGraph(data)
  }

  const summaryApi = async () => {
    const response = await fetch(`http://52.78.195.183:3003/api/expenses/expenses/summary?period=daily&userId=team`)
    console.log(response)
    const data = await response.json()
    setDetailGraph(data)
  }

  useEffect(() => {
    searchApi()
    summaryApi()
  }, [keywords, userId])

  const data: ChartType = {
    datasets: [{
        data: [10, 20, 30]
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Red',
        'Yellow',
        'Blue'
    ]
  };
 
  const handlePeriod  = (value: string) => {
    setPeriod(value)
  }


  return (
    <div>
      <DailySelect onPeriodClick={handlePeriod}/>
      <Chart data = {data}/>
      <div>DetailGraph</div>
    </div>

  )
}

export default DetailGraph