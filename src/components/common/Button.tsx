import styled from 'styled-components';

function Button() {
  return <StyledButton>Button</StyledButton>;
}

const StyledButton = styled.button`
  width: 200px;
  cursor: pointer;
`;

export default Button;
