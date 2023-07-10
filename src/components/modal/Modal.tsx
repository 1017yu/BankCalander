import React from 'react';
import ExpensesAmount from './ExpensesAmount';
import ExpensesTag from './ExpensesTag';
import DepositTag from './DepositTag';
import { createdExpense } from '@/lib/api/Api';

function Modal() {
  return (
    <Container>
      <ButtonCotainer>
        <DepositButton data-form-type="deposit" onClick={handleButtonClick}>
          입금
        </DepositButton>
        <ExpenseButton data-form-type="expense" onClick={handleButtonClick}>
          지출
        </ExpenseButton>
      </ButtonCotainer>
      <ExpensesAmount amount={amount} handleAmountChange={handleAmountChange} />
      {type === 'deposit' ? (
        <DepositTag handleTagChange={handleTagChange} />
      ) : type === 'expense' ? (
        <ExpensesTag handleTagChange={handleTagChange} />
      ) : null}
      {type === 'deposit' ? null : type === 'expense' ? (
        <PaymentMethod handleMethodChange={handleMethodChange} />
      ) : null}
      <Submit onClick={handleSubmit}>확인</Submit>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonCotainer = styled.div`
  display: flex;
  gap: 50px;
  justify-content: center;
`;

const DepositButton = styled.button`
  width: 100px;
  height: 30px;
`;

const ExpenseButton = styled.button`
  width: 100px;
  height: 30px;
`;

const Submit = styled.button``;
export default Modal;
