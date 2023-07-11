import { useState, useEffect } from 'react';
import SelectPeriod from './SelectPeriod';
import ExpensesSelect from './SelectExpenses';
import styled from 'styled-components';
import {expenseSummary, expenseSearch} from '@/lib/api/Api';
import DetailChart from './DetailChart';
import DetailList from './DetailList';
import { DatePicker } from 'antd';
import SelectChart from './SelectChart';
import SelectCategory from './SelectCategory';

const { RangePicker } = DatePicker;

function Detail () {

  // 기간
  const [period, setPeriod] = useState('monthly');
  const [summaries, setSummeries] = useState<SummaryResponse>([])
  const [sortSummaries, setSortSummeries] = useState<SummaryResponse>([])
  const [selectDays, setSelectDays] = useState(false)

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
    if(period !== '기간선택') {
      periodApi(period)
    } else {
      console.log(period)
      setPeriod('daily')
    }
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

  const handlePeriod = (value: string) => {
    setPeriod(value);
  }

  const selectDay = (dates, dateStrings) => {
    if (dates && dates.length > 0) {
      setSelectDays(true);
      const [startDay, endDay] = dateStrings;
      const filteredSummaries = summaries.filter((summary) => {
        return summary._id >= startDay && summary._id <= endDay;
      });
      setSortSummeries(filteredSummaries);
    } else {
      setSelectDays(false);
      sortSummariesFunc();
    }
  };
  // 수입, 지출
  const [expenses, setExpenses] = useState('');

  // const filterExpenses = () => {
  //   summaries.filter((item) => {item.totalAmount > 0})
  // }

  const handleExpenses = (value: string) => {
    setExpenses(value)
    console.log(value);
  }

  // 카테고리 검색
  const [categories, setCategories] = useState([])
  const [tests, setTests] = useState([])

  const categoryApi = async() => {
    try {
      const response = await expenseSearch('')
      setCategories(response)
      console.log(1)
      setTests([...sortSummaries, ...categories])
      console.log(response)
    } catch (error) {
      console.log('error :' + error)
    }
  }

  console.log(tests)

  useEffect(() => {
    categoryApi()
  }, [])

  

  // 차트 
  const [chart, setChart] = useState('bar')

  const handleChart = (value: string) => {
    setChart(value)
  }



  return (
    <>
      <Check>
        <SelectPeriod onPeriodChange={handlePeriod} />
        <ExpensesSelect onExpensesSelect={handleExpenses}/>
        <SelectChart onSelectChart = {handleChart}/>
        <SelectCategory/>
      </Check>
      {period === 'daily' && (
        <StyleRangePicker>
          <RangePicker
            onChange={selectDay}
          />
        </StyleRangePicker>
      )}
      <div>
        <DetailChart summaries = {sortSummaries} period = {period} selectChart = {chart} />
      </div>
      <div>
        List
        <DetailList summaries = {sortSummaries}/>
      </div>
      <span>-----------------------------------------------</span>
      <div>
        {categories.map((category, index) => 
          <StyledLi key={index}>
            <div>{category.category} : </div>
            <div>{category.amount}원</div>
            <div>{category.date.replace(/T.*$/, '')}</div>
          </StyledLi>
        )}
      </div>

    </>
  );
}

export default Detail

const Check = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyleRangePicker = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledLi = styled.li`
  display: flex;
  margin: 10px;
  text-align: center;
  justify-content: center;
`
