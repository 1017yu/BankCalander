import React, { useState } from 'react'
import { createdExpense, category } from '@/lib/api/Api'
import styled from 'styled-components'

function Expenses() {
  const [expenses, setExpenses] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const numericInput = Number(input.replace(/[^0-9]/g, '')).toLocaleString()
    setExpenses(numericInput);
  };
  
  return (
    <>
    <Container>
      <ExpensesInputBox>
        <span>&#x20A9;</span> 
        <StyledInput type="text" value={expenses} onChange={handleChange} />
      </ExpensesInputBox>
      
    </Container>
    </>
  );
}

const Container = styled.form `

`

const ExpensesInputBox = styled.div `
  display: flex;
  justify-content: space-around;
  width: 200px;
  border: 1px solid;
  
`

const StyledInput = styled.input `
  border: none;
  text-align: right;
  
  &:focus {
    outline: none;
    
`

export default Expenses;