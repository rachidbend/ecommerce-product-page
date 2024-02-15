import styled from 'styled-components';
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import { useState } from 'react';

const StyledShoppingCart = styled.div`
  position: relative;
  margin-right: 4.6rem;
  font-family: var(--font-main);
`;

const ShoppingCartIcon = styled.img`
  cursor: pointer;
`;

const ShoppingCartContainer = styled.div`
  width: 36rem;
  background-color: var(--color-white);
  box-shadow: 0rem 0rem 2.4rem var(--color-grey-100);
  position: absolute;
  top: 5rem;
  right: 0;
  transform: translateX(50%);
  border-radius: 1rem;
  /* padding: 2.6rem 2.4rem 3.2rem 2.4rem; */
`;

const CartTitle = styled.p`
  font-size: 1.6rem;
  padding: 2.6rem 2.4rem 2.8rem 2.4rem;
  border-bottom: 1px solid var(--color-grey-100);
  color: var(--color-blue-100);
  font-weight: 700;
`;

const CartContentContainer = styled.div`
  padding: 2.4rem 2.4rem 3.2rem 2.4rem;
`;

const EmtyCart = styled.div`
  padding: 7.8rem 0 9rem 0;
  font-weight: 700;
  font-size: 1.6rem;
  text-align: center;
  color: var(--color-blue-300);
`;

function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { shoppingCart } = useShoppingCart();

  return (
    <StyledShoppingCart>
      <ShoppingCartIcon
        onClick={() => setIsOpen(!isOpen)}
        src="/images/icon-cart.svg"
        alt="shopping cart icon"
      />
      {isOpen && (
        <ShoppingCartContainer>
          <CartTitle>Cart</CartTitle>
          {shoppingCart.length == 0 && <EmtyCart>Your cart is empty.</EmtyCart>}
          {shoppingCart.length > 0 && (
            <CartContentContainer>
              {/* for now it is empty */}
            </CartContentContainer>
          )}
        </ShoppingCartContainer>
      )}
    </StyledShoppingCart>
  );
}

export default ShoppingCart;
