import React from 'react'
import styled from 'styled-components'

function SelectCategory() {
  return (
    <StyledSelectCategory>
      <option value="">
        카테고리 선택
      </option>
      <option value="weekly">
        교육
      </option>
      <option>
        교통비
      </option>
      <option>
        급여
      </option>
      <option>
        기타
      </option>
      <option>
        생필품
      </option>
      <option>
        식비
      </option>
      <option>
        용돈
      </option>
      <option>
        의료/건강
      </option>
      <option>
        통신비
      </option>
    </StyledSelectCategory>
  )
}

export default SelectCategory

const StyledSelectCategory = styled.select`
  width: 140px;
  height: 30px;
  font-size: 18px;
  text-align: center;
`