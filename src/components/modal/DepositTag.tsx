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
    <Dropdown options={depositTags} onSelect={handleTagChange} />
  );
}

export default DepositTag;