import React from 'react';
import styled from 'styled-components';

interface OnExpensesProps {
  onExpensesSelect: (value: string) => void;
}

const ExpensesSelect: React.FC<OnExpensesProps> = ({ onExpensesSelect }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onExpensesSelect(value);
  };

  return (
    <StyledSelect onChange={handleChange}>
      <option key="수입" value="">
        수입
      </option>
      <option key="지출" value="">
        지출
      </option>
    </StyledSelect>
  );
};

export default ExpensesSelect;

const StyledSelect = styled.select`
  width: 70px;
  height: 30px;
  font-size: 20px;
  
`