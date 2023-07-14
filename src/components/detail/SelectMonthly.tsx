import styled from "styled-components"

interface Summaries {
  summaries: SummaryResponseItem[]
  onSelectPeriod: (value: string) => void
}

const SelectMonthly = ({summaries, onSelectPeriod}: Summaries) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
    onSelectPeriod(e.target.value)
  }
  
  return (
    <>
      <StyledSelectMonthly onChange = {handleChange}>
        <option value = ''>
          기간
        </option>
        {summaries.map((item) => 
        <option value = {item._id}>
          {item._id}
        </option>
        )}
      </StyledSelectMonthly>
    </>
  )
}

export default SelectMonthly

const StyledSelectMonthly = styled.select`
  width: 140px;
  height: 30px;
  font-size: 18px;
  text-align: center;
`
