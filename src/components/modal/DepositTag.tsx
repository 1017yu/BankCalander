import Dropdown from './Dropdown';
import { etcIcon,
  salaryIcon,
  moneyIcon } from '@/lib/utils/Icons'


interface DepositTagProps {
  handleTagChange: (tags: string) => void;
}

function DepositTag({ handleTagChange }: DepositTagProps) {
  const depositTags = [
    { label: '월급', icon: salaryIcon },
    { label: '용돈', icon: moneyIcon },
    { label: '기타', icon: etcIcon },
  ];

  return (
    // options으로 depositTags 배열을 하위 컴포넌트로 전달
    // 상위 컴포넌트에서 전달 받은 handleTagChange를 onSelect로 하위 컴포넌트로 props 전달
    <Dropdown options={depositTags} onSelect={handleTagChange} />
  );
}

export default DepositTag;