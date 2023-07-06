interface onPeriodProps {
  onPeriodClick: (value: string) => void
}

const PeriodSelect = ({onPeriodClick}: onPeriodProps)  => {
  const handleClick = (value:string) => {
    onPeriodClick(value);
  }
  
  return (
    <ul>
      <li>
        <button className = 'drop-list__period' onClick={() => {handleClick('weekly')}}>weekly</button>
      </li>
      <li>
        <button className = 'drop-list__period' onClick={() => {handleClick('monthly')}}>monthly</button>
      </li>
    </ul>
  )
}

export default PeriodSelect