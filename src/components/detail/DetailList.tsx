import React from 'react'

function DetailList({summaries}) {
  return (
    <div>
      {summaries.map((summary, index) => 
        <li key={index}>
          date: {summary._id} 금액: {summary.totalAmount.toLocaleString()+'원'}
        </li>)}
    </div>

  )
}

export default DetailList