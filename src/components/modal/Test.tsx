import { useState, useCallback, useEffect } from 'react'
import UpdateModal from './UpdateModal';
import { expenseSearch } from '@/lib/api/Api'
import { styled } from 'styled-components';

function TestPage() {
  const [dummy, setDummy] = useState([])
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

  const search = useCallback(async () => {
    const data = await expenseSearch('식비') 
    setDummy(data)
  }, [])

  useEffect(() => {
    search()
  }, [search])

  const handleOpenUpdateModal = () => {
    setShowUpdateModal(true)
  }

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false)
  }
  return (
    <div>
      <h1>테스트 페이지</h1>
      <button onClick={handleOpenUpdateModal}>모달열기</button>
      {showUpdateModal && (
        dummy.map((item, index) => (
          <ModalWrapper key={index}>
            <Modal>
                <UpdateModal
                key={index}
                amount={item.amount}
                category={item.category}
                date={item.date}
                _id={item._id}
                close={handleCloseUpdateModal}
              />
            </Modal>
          </ModalWrapper>
        ))
      )}
    </div>
  );
}

const ModalWrapper = styled.div `
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5);
display: flex;
justify-content: center;
align-items: center;
z-index: 9999;
`

const Modal = styled.div `
background-color: #fff;
padding: 20px;
border-radius: 4px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
max-width: 400px;
width: 100%;
`

export default TestPage;
