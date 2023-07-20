import SearchedDailyList from '@/components/Home/SearchedDailyList';
import SearchedTagList from '@/components/Home/SearchedTagList';

export interface SelectedDailyProps {
  amount: number;
  category: string;
  date: string;
  userId: string;
  _id: string;
}
interface CalendarDataProps {
  dailyList: SelectedDailyProps[];
  tag: string;
  onItemUpdated: () => void;
}

function ExpensesList({ dailyList, tag, onItemUpdated }: CalendarDataProps) {
  // tag가 존재면 TagList, 그렇지 않으면 DailyList 반환
  return (
    <>
      {tag ? (
        <SearchedTagList
          dailyList={dailyList}
          tag={tag}
          onItemUpdated={onItemUpdated}
        />
      ) : (
        <SearchedDailyList
          dailyList={dailyList}
          onItemUpdated={onItemUpdated}
        />
      )}
    </>
  );
}

export default ExpensesList;
