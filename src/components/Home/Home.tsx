import TheCalendar from './TheCalender';
import ExpensesList from './ExpensesList';

function Home() {
  return (
    <div>
      <TheCalendar date={new Date()} />
      <ExpensesList />
    </div>
  );
}

export default Home;
