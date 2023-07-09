import React from 'react'
import ExpensesAmount from './ExpensesAmount'
import { styled } from 'styled-components'
import ExpensesTag from './ExpensesTag'
import DepositTag from './DepositTag'
import { createdExpense } from '@/lib/api/Api'


function Modal() {
  return (
    <Container>
      <ExpensesAmount />
      <ExpensesTag />
      <DepositTag />
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