import { expenseSearch, expenseSummary } from '@/lib/api/Api';
import { useCallback, useEffect, useState } from 'react';

interface SummaryResponseItem {
  _id: string;
  totalAmount: number;
}

function ExpensesList() {
  const [periodList, setPeriodList] = useState<SummaryResponseItem[]>([]);
  const [cateoryList, setCateoryList] = useState<SearchResponseItem[]>([]);

  const fetchList = useCallback(async () => {
    const period = await expenseSummary('daily');
    const category = await expenseSearch('식비');
    setPeriodList(period);
    setCateoryList(category);
  }, []);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <div>
      <div>일간, 주간, 월간 조회</div>
      {periodList.map((item) => (
        <li key={item._id}>
          {item._id}: {item.totalAmount}
        </li>
      ))}
      <div>카테고리 기반 검색</div>
      {cateoryList.map((item) => (
        <li key={item._id}>
          {item.date}: {item.amount}
        </li>
      ))}
    </div>
  );
}

export default ExpensesList;
