import ExpenseLayout from '@/ui/ExpenseLayout';
import { useCallback, useEffect, useState } from 'react';
import { expenseSearch, expenseSummary } from '@/lib/api/Api';

interface SummaryResponseItem {
  _id: string;
  totalAmount: number;
}

function ExpensesList() {
  const [periodList, setPeriodList] = useState<SummaryResponseItem[]>([]);
  const [cateoryList, setCateoryList] = useState<SearchResponseItem[]>([]);

  const fetchList = useCallback(async () => {
    const period = await expenseSummary('weekly'); // 일별 소비 조회
    const category = await expenseSearch('식비'); // 검색어(식비)에 해당하는 소비 일자와 금액을 조회

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
        <ExpenseLayout
          key={item._id}
          date={item._id}
          totalAmount={item.totalAmount}
        />
      ))}
      <div>카테고리 기반 검색</div>
      {cateoryList.map((item) => (
        <ExpenseLayout key={item._id} date={item.date} amount={item.amount} />
      ))}
    </div>
  );
}

export default ExpensesList;
