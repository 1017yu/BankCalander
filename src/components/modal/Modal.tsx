import React from 'react'
import ExpensesTags from './ExpensesTags'
import ExpensesAmount from './ExpensesAmount'
import { styled } from 'styled-components'

function Modal() {
  return (
    <Container>
      <ExpensesAmount />
      <ExpensesTags />
    </Container>
  )
}

const Container = styled.div `
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default Modal