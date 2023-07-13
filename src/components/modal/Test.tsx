import { useState, useCallback, useEffect } from 'react';
import UpdateModal from './UpdateModal';
import AddModal from './AddModal';
import { expenseSearch } from '@/lib/api/Api';

function TestPage() {
  const [dummy, setDummy] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const search = useCallback(async () => {
    const data = await expenseSearch('식비');
    setDummy(data);
  }, []);

  useEffect(() => {
    search();
  }, [search]);

  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleOpenUpdateModal = () => {
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  return (
    <div>
      <h1>테스트 페이지</h1>
      <button onClick={handleOpenAddModal}>추가</button>
      {showAddModal && <AddModal close={handleCloseAddModal} />}
      <button onClick={handleOpenUpdateModal}>수정</button>
      {showUpdateModal &&
        dummy.map((item, index) => (
          <UpdateModal
            key={index}
            amount={item.amount}
            category={item.category}
            date={item.date}
            _id={item._id}
            close={handleCloseUpdateModal}
          />
        ))}
    </div>
  );
}

export default TestPage;
