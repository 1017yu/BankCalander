import { useState, useCallback, useEffect } from 'react'
import UpdateModal from './UpdateModal';
import { expenseSearch } from '@/lib/api/Api'

function TestPage() {
  const [dummy, setDummy] = useState([])

  const search = useCallback(async () => {
    const data = await expenseSearch('식비') 
    setDummy(data)
  }, [])

  useEffect(() => {
    search()
  }, [search])

  return (
    <div>
      <h1>테스트 페이지</h1>
      {dummy.map((item, index) => (
        <UpdateModal
          key={index}
          amount={item.amount}
          category={item.category}
          date={item.date}
          _id={item._id}
        />
      ))}
    </div>
  );
}

export default TestPage;
