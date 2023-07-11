import UpdateModal from './UpdateModal';

function TestPage() {
  // 더미 데이터 생성 (서버에 저장되있는 데이터를 가져옴)
  const dummyData = {
    amount: -100,
    category: '경조사',
    date: '2023-07-10T00:00:00.000Z',
    _id: '64ad4eea6b539f3fca3410dc'
  };

  return (
    <div>
      <h1>테스트 페이지</h1>
      {/* 더미 데이터를 UpdateModal 컴포넌트로 전달 */}
      <UpdateModal amount={dummyData.amount} category={dummyData.category} date={dummyData.date} _id={dummyData._id} />
    </div>
  );
}

export default TestPage;