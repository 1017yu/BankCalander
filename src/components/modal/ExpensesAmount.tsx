import { ChangeEvent, useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

function ExpensesAmount() {
    const [amount, setAmount] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleChage = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const numericInput = Number(input.replace(/[^0-9]/g, ''));
        setAmount(numericInput);
    }

   
  return (
    <AmountContainer>
        <Won>\</Won><AmountInput ref={inputRef} dir="rtl" type="text" value={amount.toLocaleString()} onChange={handleChage}/>
    </AmountContainer>
  )
}

const AmountContainer = styled.div `
    width: 150px;
    border-bottom: 1px solid;
    display: flex;
    justify-content: space-between;
    line-height: 1.5;
`

const Won = styled.span `
`

const AmountInput = styled.input `
    border: none;
    width: 100px;

    &:focus {
        border: none;
        outline: none;
    }
`

export default ExpensesAmount