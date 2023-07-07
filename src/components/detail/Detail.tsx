import {useState, useEffect} from 'react'
import PeriodSelect from './PeriodSelect'
import SearchCategory from './CategorySearch'
import styled from 'styled-components'
import Chart from 'chart.js/auto'

interface ChartType {
  datasets: [{data: number[]}],
  labels: string[]
}

const DetailGraph = () => {
  const [detailGraph, setDetailGraph] = useState('')
  const [keywords, setKeywords] = useState('')
  const [userId, setUserId] = useState('')

  // 기간
  const  [period, setPeriod] = useState('')

  // 카테고리 검색
  const [category, setCategory] = useState('')

  // const searchApi = async () => {
  //   const response = await fetch(`${VITE_BASE_URL}/expenses/summary?period=${period}&userId=team`)
  //   console.log(response)
  //   const data = await response.json()
  //   setDetailGraph(data)
  // }

  // const summaryApi = async () => {
  //   const response = await fetch(`http://52.78.195.183:3003/api/expenses/expenses/summary?period=${period}&userId=team`)
  //   console.log(response)
  //   const data = await response.json()
  //   setDetailGraph(data)
  // }

  // useEffect(() => {
  //   searchApi()
  //   summaryApi()
  // }, [keywords, userId])

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
    console.log(value)
  }

  const handleCategory = (value: string) => {
    setCategory(value)
    console.log(value)
  }

  return (
    <Check>
        <PeriodSelect onPeriodChange={handlePeriod}/>
        <SearchCategory onCategorySearch = {handleCategory}/>
        <div>DetailGraph</div>
    </Check>


  )
}

export default DetailGraph

const Check = styled.div `
  display: flex;
`