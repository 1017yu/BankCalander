import React, { useState, useEffect } from 'react';
import ExpensesAmount from './ExpensesAmount';
import ExpensesTag from './ExpensesTag';
import DepositTag from './DepositTag';
import PaymentMethod from './PaymentMethod';
import { numeric } from '@/lib/utils/Numeric';
import { updatedRecord } from '@/lib/api/Api';
import { styled } from 'styled-components';

interface UpdateModalProps {
  amount: number;
  category: string;
  date: string;
  _id: string;
}


// props로 전달받은 amount를 initialAmount로 받음.
function UpdateModal({ amount: initialAmount, category, _id, date }: UpdateModalProps) {
  const [type, setType] = useState<string | undefined>();
  const [amount, setAmount] = useState<number>(Math.abs(initialAmount)); // porps로 받은 amount값을 마운트될 때 정수로
  const [tag, setTag] = useState<string>(category);
  const [paymentMethod, setPaymentMethod] = useState<string>('');

// useEffect를 사용해서 마운트 될 때 initialAmount가 0보다 크거나 같으면 type은 depost 아니면 expense가 된다.
  useEffect(() => {
      setType(initialAmount >= 0 ? 'deposit' : 'expense');
  }, []);

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

  const handleSubmit = async () => {
    // type이 expense일 때 서버로 전달하는 데이터 amount가 음수가 되게 아니면 정수로
    const formAmount = type === 'expense' ? -amount : amount;

    // paymentMethod가 있으면 category에 paymentMethod의 값을 추가해서 서버로 전달
    let updatedCategory = tag;
    if (paymentMethod) {
      updatedCategory += `, ${paymentMethod}`;
    }

    const data = {
      amount: formAmount,
      category: updatedCategory,
      date: new Date().toISOString(),
    };

    await updatedRecord(_id, data);
  };

// props로 전달 받은 date값을 변형
  const krDate = new Date(date)

  return (
    <Container>
      <DateContainer>{krDate.toLocaleDateString('ko-KR')}</DateContainer>
      <ExpensesAmount amount={amount} handleAmountChange={handleAmountChange} />
      {/* type이 deposit일 때와 expense일 때 삼항연산자를 사용하여 렌더링 되는 컴포넌트 설정 */}
      {type === 'deposit' ? <DepositTag handleTagChange={handleTagChange} /> : <ExpensesTag handleTagChange={handleTagChange} />}
      {/* type이 expense일 때만 PaymentMethod 컴포넌트가 렌더링되게*/}
      {type === 'expense' ? <PaymentMethod handleMethodChange={handleMethodChange} /> : null}
      <Submit onClick={handleSubmit}>확인</Submit>
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

const DateContainer = styled.div`
  margin-bottom: 10px;
`;

const Submit = styled.button`
  width: 250px;
  height: 50px;
  margin: 10px;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  font-size: 18px;
  font-weight: bold;

  &:hover {
    background-color: #33ff99;
    color: #ffffffdb;
  }
`;

export default UpdateModal;
