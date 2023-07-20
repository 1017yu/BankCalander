import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';

function Layout() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}
const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  height: 100vh;
`;

export default Layout;
