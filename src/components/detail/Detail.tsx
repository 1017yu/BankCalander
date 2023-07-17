import { useState, useEffect } from 'react';
import SelectPeriod from './SelectPeriod';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import {expenseSummary, expenseSearch} from '@/lib/api/Api';
import DetailChart from './DetailChart';
import DetailList from './DetailList';
import { DatePicker } from 'antd';
import SelectChart from './SelectChart';
import SelectCategory from './SelectCategory';
import SelectMonthly from './SelectMonthly';
import {Table} from 'antd'

const { RangePicker } = DatePicker;


function Detail () {

  // 기간
  const [period, setPeriod] = useState<string>('monthly');
  const [selectPeriod, setSelectPeriod] = useState<string>('')
  const [summaries, setSummeries] = useState<SummaryResponse>([])
  const [sortSummaries, setSortSummeries] = useState<SummaryResponse>([])
  const [selectDays, setSelectDays] = useState(false)

  const periodApi = async (selectedPeriod: string) => {
    try {
      const response = await expenseSummary(selectedPeriod);
      setSummeries(response  )
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

  const selectDay = (dates: any, dateStrings: string[]) => {
    if (dates && dates.length > 0) {
      console.log(dates)
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

  const handleSelectPeriod = (value: string) => {
    setSelectPeriod(value)
  }

  // 카테고리 검색
  const [categories, setCategories] = useState<SearchResponseItem[]>([])
  const [selectCategories, setSelectCategories] = useState('')

  const categoryApi = async() => {
    try {
      const response = await expenseSearch(selectCategories)
      setCategories(response)
    } catch (error) {
      console.log('error :' + error)
    }
  }



  useEffect(() => {
    categoryApi()
  }, [selectCategories])

  const handleSelectCategory = (value: string) => {
      console.log(value)
      setSelectCategories(value)
  }

  categories
    .sort((acc, cur) => {
      const dateA: any = new Date(acc.date)
      const dateB: any = new Date(cur.date)
      return dateA - dateB
    })

  // 필터

  const filterCategories = selectPeriod ? categories.filter((category) => category.date.includes(selectPeriod) ) : categories
  
  // 차트 
  const [chart, setChart] = useState('bar')

  const handleChart = (value: string) => {
    setChart(value)
  }
  // table
  const tableitemSource = filterCategories.map((categories, index) => ({
    key : (
      <div>
        <p>{index + 1}</p>
      </div>
    ),
    categoryName: categories.category.replace(/, .*$/, ''),
    categoryAmount: Number(categories.amount) > 0 ? categories.amount.toLocaleString() : <StyleNagative>{categories.amount.toLocaleString()}</StyleNagative>,
    categoryDate: categories.date.replace(/T.*$/, '')
  }))

  const itemColumns = [
    {
      title:'번호',
      dataIndex: 'key',
      ket: 'key'
    },
    {
      title: '카테고리',
      dataIndex: 'categoryName',
      key: 'categoryName'
    },
    {
      title: '금액',
      dataIndex: 'categoryAmount',
      key: 'categoryAmount'
    },
    {
      title: '날짜',
      dataIndex: 'categoryDate',
      key: 'categoryDate'
    },
  ]

  return (
    <>
      <Check>
        <SelectPeriod onPeriodChange={handlePeriod} />
        <SelectChart onSelectChart = {handleChart}/>
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
        <DetailList summaries = {sortSummaries}/>
      </div>
      <div>-------------------------------------------------------------------------</div>
      <StyledSelect>
        <SelectMonthly summaries = {sortSummaries} onSelectPeriod = {handleSelectPeriod}/>
        <SelectCategory onSelectCategory = {handleSelectCategory} />
      </StyledSelect>
      <Table
        dataSource={tableitemSource}
        columns={itemColumns}
        pagination={{pageSize: 5, simple: true}}
      />
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

const StyledSelect = styled.div `
 display: flex;
`

const StyleNagative = styled.div `
  color: red;
`