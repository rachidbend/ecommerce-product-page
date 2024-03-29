import styled from 'styled-components';
import ShoppingCart from './ShoppingCart';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 111.2rem;
  margin: 0 auto;
  align-items: center;

  border-bottom: 1px solid var(--color-grey-100);

  @media screen and (max-width: 600px) {
    width: 100%;
    border: none;
    padding: 2rem 2.4rem 2.5rem 2.4rem;
  }
`;

const Logo = styled.img`
  margin-right: 5.7rem;

  @media screen and (max-width: 600px) {
    margin-right: 2.4rem;
  }
`;
const Nav = styled(motion.nav)`
  @media screen and (max-width: 600px) {
    /* display: ${props => (props.show == 'true' ? 'block' : 'none')}; */

    display: block;
    position: fixed;
    height: 100vh;
    height: 100svh;
    background-color: var(--color-white);
    z-index: 9999;
    width: 25rem;
    top: 0;
    left: 0;

    padding: 2.4rem 2.5rem;
  }
`;
const NavList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 3.3rem;
  height: 100%;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.4rem;
  }
`;
const NavLink = styled.li`
  font-size: 1.5rem;
  font-weight: 400;
  height: 100%;
  padding: 5rem 0;
  border-bottom: 4px solid transparent;
  cursor: pointer;
  transition: border 0.3s ease, color 0.3s ease;
  color: var(--color-blue-200);
  &:hover {
    border-bottom: 4px solid var(--color-orange-100);
    color: var(--color-blue-100);
  }

  @media screen and (max-width: 600px) {
    padding: 1rem;
    padding-left: 0;
    height: auto;
    border: none;
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--color-blue-100);

    &:hover {
      border: none;
    }
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

  @media screen and (max-width: 600px) {
    height: 2.8rem;
    width: 2.8rem;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const MenuIcon = styled.img`
  display: none;
  @media screen and (max-width: 600px) {
    display: inline-block;
    margin-right: 1.6rem;
  }
`;

const CloseMenu = styled.img`
  display: none;
  @media screen and (max-width: 600px) {
    display: inline-block;
    margin-bottom: 5.2rem;
  }
`;

const MenuOverlay = styled(motion.div)`
  display: none;
  @media screen and (max-width: 600px) {
    display: ${props => (props.show == 'true' ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    height: 100svh;
    background-color: var(--color-background-overlay);
    z-index: 9998;
  }
`;

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = window.innerWidth < 600;
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target))
          setIsMenuOpen(false);
      }
      if (window.innerWidth > 600) {
        setIsMenuOpen(true);
        return;
      }
      if (isMobile) {
        document.addEventListener('click', handleClick, true);

        return () => document.removeEventListener('click', handleClick);
      }
    },
    [setIsMenuOpen, window.innerWidth]
  );

  return (
    <StyledHeader>
      <Container>
        <MenuIcon
          onClick={() => setIsMenuOpen(true)}
          src="/images/icon-menu.svg"
          alt="open menu"
        />
        <Logo src="/images/logo.svg" alt="sneakers logo" />
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <MenuOverlay
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                show={isMenuOpen ? 'true' : 'false'}
              ></MenuOverlay>

              <Nav
                initial={{
                  x: isMobile ? '-100%' : 0,
                }}
                animate={{
                  x: '0%',

                  transition: {
                    type: 'spring',
                    bounce: 0,
                    duration: 0.4,
                  },
                }}
                exit={{
                  x: '-100%',
                  transition: {
                    type: 'spring',
                    bounce: 0,
                    duration: 0.4,
                  },
                }}
                show={isMenuOpen ? 'true' : 'false'}
                ref={ref}
              >
                <CloseMenu
                  onClick={() => setIsMenuOpen(false)}
                  src="/images/icon-close.svg"
                  alt="close menu"
                />
                <NavList>
                  <NavLink>Collections</NavLink>
                  <NavLink>Men</NavLink>
                  <NavLink>Women</NavLink>
                  <NavLink>About</NavLink>
                  <NavLink>Contact</NavLink>
                </NavList>
              </Nav>
            </>
          )}
        </AnimatePresence>
      </Container>
      <Container>
        <ShoppingCart />
        <User src="/images/image-avatar.png" alt="user image" />
      </Container>
    </StyledHeader>
  );
}

export default Header;
