import SearchedDailyList from './SearchedDailyList';
import SearchedTagList from './SearchedTagList';

export interface SelectedDailyProps {
  [x: string]: any;
  amount: number;
  category: string;
  date: string;
  userId: string;
  _id: string;
}
interface CalendarDataProps {
  dailyList: SelectedDailyProps[];
  tag: string;
}

function ExpensesList({ dailyList, tag }: CalendarDataProps) {
  // tag가 존재면 TagList, 그렇지 않으면 DailyList 반환
  return (
    <>
      {tag ? (
        <SearchedTagList dailyList={dailyList} tag={tag} />
      ) : (
        <SearchedDailyList dailyList={dailyList} />
      )}
    </>
  );
}

export default ExpensesList;
