import Dropdown from './Dropdown';

function DepositTag() {
  const depositTags = [
    '월급',
    '용돈',
    '기타',
  ];

  const handleTagSelect = (tag: string) => {
    
    console.log(tag);
  };

  return (
    <Dropdown options={depositTags} onSelect={handleTagSelect} />
  );
}

export default DepositTag;
