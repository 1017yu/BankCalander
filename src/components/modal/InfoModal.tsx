import React, { useState, useRef, useEffect } from 'react';
import { styled } from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';
import { theme } from '@/styles/theme';


interface UpdateModalProps {
  amount: number;
  category: string;
  date: string;
  close: () => void;
}

function InfoModal({
  amount: initialAmount,
  category,
  date,
  close,
}: UpdateModalProps) {
    const [type, setType] = useState<string | undefined>();
    const amount = Math.abs(initialAmount); 
    const splitCategory = category.split(', ');
    const tag = splitCategory[0];
    const paymentMethod = splitCategory[1];
    const modalRef = useRef(null);

    useEffect(() => {
        setType(initialAmount >= 0 ? 'deposit' : 'expense');
      }, []);

  const handleRef = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === modalRef.current) close();
  };

  const krDate = new Date(date)

  return (
    <Container>
      <ModalWrapper ref={modalRef} onClick={handleRef}>
        <Modal>
            <BackButton onClick={close}>
              <FaArrowLeft />
            </BackButton>
        {type === 'deposit' ? (
            <>
              <Span>&lt;</Span>
              <TitleDeposit> 입금 상세 정보 </TitleDeposit>
              <Span>&gt;</Span>
            </>
        ) : (
            <>
              <Span>&lt;</Span>
              <TitleExpense> 지출 상세 정보 </TitleExpense>
              <Span>&gt;</Span>
            </>
        )}
            <InfoDate>{krDate.toLocaleString()}</InfoDate>
            <InfoAmount>금액: {amount.toLocaleString()} 원</InfoAmount>
           {type === 'deposit' ? (
             <>
                <InfoTag>입금내역: {tag}</InfoTag>
             </>
           ) : (
            <>
                <InfoTag>지출내역: {tag}</InfoTag>
                <InfoPaymentMethod>결제방법: {paymentMethod}</InfoPaymentMethod>
            </>
           )}
        </Modal>
      </ModalWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 390px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const BackButton = styled.button`
  border: none;
  font-size: 20px;
  margin: 15px;
  cursor: pointer;
  background-color: #fff;
  position: relative;
  left: -150px;

  &:hover {
    color: ${theme.colors.red};
  }
`;

const ModalWrapper = styled.div`
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
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const Span = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const TitleDeposit = styled.div`
  margin-bottom: 25px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: ${theme.colors.green};
`;

const TitleExpense = styled.div`
  margin-bottom: 25px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: ${theme.colors.red};
`;

const InfoDate = styled.div`
  margin-bottom: 25px;
`;

const InfoAmount = styled.div`
  margin-bottom: 25px;
`;

const InfoTag = styled.div`
  margin-bottom: 25px;
`;

const InfoPaymentMethod = styled.div`
margin-bottom: 25px;
`

export default InfoModal;
