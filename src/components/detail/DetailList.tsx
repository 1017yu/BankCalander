interface Summaries {
  summaries: SummaryResponseItem[]
}


function DetailList({summaries}: Summaries) {
  return (
    <div>
      {summaries.map((item, index) => 
        <li key={index}>
          date: {item._id} 금액: {item.totalAmount.toLocaleString()+'원'}
        </li>)}
    </div>

  )
}

export default DetailList
