import Dropdown from './Dropdown';
import {     foodIcon,
  transportationIcon,
  culturalIcon,
  dailyNecessityIcon,
  clothesIcon,
  beautyIcon,
  medicalHealthIcon,
  educationIcon,
  communicationIcon,
  gatheringIcon,
  eventsIcon,
  savingIcon,
  electronicsIcon,
  utilitiesIcon,
  cardIcon,
  etcIcon } from '@/lib/utils/Icons'

interface ExpensesTagProps {
  handleTagChange: (tags: string) => void;
  tag?: string;
}

function ExpensesTag({ handleTagChange, tag }: ExpensesTagProps) {
  const expensesTags = [
    { label: '식비', icon: foodIcon },
    { label: '문화생활', icon: culturalIcon },
    { label: '교통비', icon: transportationIcon },
    { label: '생필품', icon: dailyNecessityIcon },
    { label: '의류', icon: clothesIcon },
    { label: '미용', icon: beautyIcon },
    { label: '의료/건강', icon: medicalHealthIcon },
    { label: '교육', icon: educationIcon },
    { label: '통신비', icon: communicationIcon },
    { label: '회식/모임', icon: gatheringIcon },
    { label: '경조사', icon: eventsIcon },
    { label: '저축', icon: savingIcon },
    { label: '가전', icon: electronicsIcon },
    { label: '공과금', icon: utilitiesIcon },
    { label: '카드대금', icon: cardIcon },
    { label: '기타', icon: etcIcon }
  ];

  return (
    <Dropdown tag={tag} options={expensesTags} onSelect={handleTagChange} />
  );
}

export default ExpensesTag;