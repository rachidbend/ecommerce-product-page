import styled from 'styled-components';
import ShoppingCart from './ShoppingCart';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 111.2rem;
  margin: 0 auto;
  align-items: center;

  border-bottom: 1px solid var(--color-grey-100);
`;

const Logo = styled.img`
  margin-right: 5.7rem;
`;
const Nav = styled.nav``;
const NavList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 3.3rem;
  height: 100%;
`;
const NavLink = styled.li`
  font-size: 1.5rem;
  font-weight: 400;
  height: 100%;
  padding: 5rem 0;
  border-bottom: 4px solid transparent;
  cursor: pointer;
  transition: border 0.3s ease;
  &:hover {
    border-bottom: 4px solid var(--color-orange-100);
  }
`;

const User = styled.img`
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: border 0.3s ease;
  &:hover {
    border: 2px solid var(--color-orange-100);
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

function Header() {
  return (
    <StyledHeader>
      <Container>
        <Logo src="/images/logo.svg" alt="sneakers logo" />
        <Nav>
          <NavList>
            <NavLink>Collections</NavLink>
            <NavLink>Men</NavLink>
            <NavLink>Women</NavLink>
            <NavLink>About</NavLink>
            <NavLink>Contact</NavLink>
          </NavList>
        </Nav>
      </Container>
      <Container>
        <ShoppingCart />
        <User src="/images/image-avatar.png" alt="user image" />
      </Container>
    </StyledHeader>
  );
}

export default Header;
