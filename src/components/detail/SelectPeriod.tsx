import React from 'react';
import styled from 'styled-components';
interface OnPeriodProps {
  onPeriodChange: (value: string) => void;
}

const SelectPeriod: React.FC<OnPeriodProps> = ({ onPeriodChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onPeriodChange(value);
  };

  return (
    <StyledSelectPeriod onChange={handleChange}>
      <option value="monthly">
        월간
      </option>
      <option value="weekly">
        주간
      </option>
      <option>
        기간선택
      </option>
    </StyledSelectPeriod>
  );
};

export default SelectPeriod;

const StyledSelectPeriod = styled.select`
  width: 120px;
  height: 30px;
  font-size: 20px;
  text-align: center;
`