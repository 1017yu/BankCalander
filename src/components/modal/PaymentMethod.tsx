import Dropdown from './Dropdown';
import {  cashIcon,
  debitCardIcon,
  creditCardIcon } from '@/lib/utils/Icons'
import styled from 'styled-components';

interface PaymentTagProps {
  handleMethodChange: (tags: string) => void;
  }

function PaymentTag({ handleMethodChange }: PaymentTagProps) {
  const PaymentTags = [
    { label: '현금', icon: <CashIcon >{cashIcon }</CashIcon> },
    { label: '체크카드', icon: <DebitCardIcon>{debitCardIcon}</DebitCardIcon> },
    { label: '신용카드', icon: <CreditCardIcon>{creditCardIcon}</CreditCardIcon> }
  ];

  return (
    <Dropdown options={PaymentTags} onSelect={handleMethodChange} />
  );
}

const CashIcon = styled.span `
  color: green;
`;

const DebitCardIcon = styled.span `
  color: blue;
`;

const CreditCardIcon = styled.span `
  color: red;
`;

export default PaymentTag;