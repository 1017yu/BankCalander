import React from 'react';
import styled from 'styled-components';

interface OnPeriodProps {
  onPeriodChange: (value: string) => void;
}

const PeriodSelect: React.FC<OnPeriodProps> = ({ onPeriodChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onPeriodChange(value);
  };

  return (
    <StyledSelect onChange={handleChange}>
      <option key="weekly" value="weekly">
        주간
      </option>
      <option key="monthly" value="monthly">
        월간
      </option>
    </StyledSelect>
  );
};

export default PeriodSelect;

const StyledSelect = styled.select`
  width: 70px;
  height: 30px;
  font-size: 20px;
`