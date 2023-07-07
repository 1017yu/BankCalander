import { theme } from '@/styles/theme';
import styled, { css } from 'styled-components';

interface IButtonProps {
  [props: string]: any;
}

function Button({ ...props }: IButtonProps) {
  return <StyledButton type="button" {...props} />;
}

const StyledButton = styled.button<{
  green?: boolean;
  lightgreen?: boolean;
  red?: boolean;
}>`
  width: 200px;
  height: 200px;
  cursor: pointer;

  ${(props) =>
    props.green &&
    css`
      background-color: ${theme.colors.green};
    `}

  ${(props) =>
    props.lightgreen &&
    css`
      background-color: ${theme.colors.lightgreen};
    `}

  ${(props) =>
    props.red &&
    css`
      background-color: ${theme.colors.red};
    `}
`;

export default Button;
