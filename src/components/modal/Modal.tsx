import React, { useState } from 'react'
import ExpensesAmount from './ExpensesAmount'
import ExpensesTag from './ExpensesTag'
import DepositTag from './DepositTag'
import PaymentMethod from './PaymentMethod'
import { numeric } from '../common/Numeric'
import { createdExpense } from '@/lib/api/Api'
import { styled } from 'styled-components'


function Modal() {
  const [type, setType] = useState<string | undefined>('');
  const [amount, setAmount] = useState(0);
  const [tag, setTag] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleButtonClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const formType = e.currentTarget.dataset.formType;
    setType(formType);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setAmount(numeric(input));
  };

  const handleTagChange = (tags: string) => {
    setTag(tags);
  };

  const handleMethodChange = (tags: string) => {
    setPaymentMethod(tags);
  };

  const handleSubmit =  async () => {
   const data = {
    amount,
    category: tag,
    date: new Date().toISOString()
    };
    await createdExpense(data);
  };

  return (
    <Container>
      <ButtonCotainer>
        <DepositButton data-form-type="deposit" onClick={handleButtonClick}>입금</DepositButton>
        <ExpenseButton data-form-type="expense" onClick={handleButtonClick}>지출</ExpenseButton>
      </ButtonCotainer>
      <ExpensesAmount amount={amount} handleAmountChange={handleAmountChange}/>
      {type === 'deposit' ? <DepositTag handleTagChange={handleTagChange} /> : 
      type === 'expense' ? <ExpensesTag handleTagChange={handleTagChange} /> : null}
      {type === 'deposit' ? null : 
      type === 'expense' ? <PaymentMethod handleMethodChange={handleMethodChange}/> : null}
      <Submit onClick={handleSubmit}>확인</Submit>
    </Container>
  )
}

const Container = styled.div `
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ButtonCotainer = styled.div `
  display: flex;
  gap: 50px;
  justify-content: center;
`

const DepositButton = styled.button `
  width: 100px;
  height: 30px;
`

const ExpenseButton = styled.button `
  width: 100px;
  height: 30px;
`

const Submit = styled.button `
`
export default Modal