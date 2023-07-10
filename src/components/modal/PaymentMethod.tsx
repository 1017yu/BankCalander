import Dropdown from './Dropdown';

interface PaymentTagProps {
  handleMethodChange: (tags: string) => void;
}

function PaymentTag({ handleMethodChange }: PaymentTagProps) {
  const PaymentTags = ['현금', '체크카드', '신용카드'];

  return <Dropdown options={PaymentTags} onSelect={handleMethodChange} />;
}

export default PaymentTag;
