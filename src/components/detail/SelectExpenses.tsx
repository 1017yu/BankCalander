import React from 'react';
import styled from 'styled-components';

interface OnExpensesProps {
  onExpensesSelect: (value: string) => void;
}

const SelectExpenses: React.FC<OnExpensesProps> = ({ onExpensesSelect }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onExpensesSelect(value);
  };

  return (
    <StyledSelectExpenses onChange={handleChange}>
      <option key="수입" value="">
        수입
      </option>
      <option key="지출" value="">
        지출
      </option>
    </StyledSelectExpenses>
  );
};

export default SelectExpenses;

const StyledSelectExpenses = styled.select`
  width: 70px;
  height: 30px;
  font-size: 20px;
  
`