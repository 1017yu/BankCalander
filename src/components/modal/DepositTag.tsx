import Dropdown from './Dropdown';

interface DepositTagProps {
  handleTagChange: (tags: string) => void;
}

function DepositTag({ handleTagChange }: DepositTagProps) {
  const depositTags = ['월급', '용돈', '기타'];

  return <Dropdown options={depositTags} onSelect={handleTagChange} />;
}

export default DepositTag;
