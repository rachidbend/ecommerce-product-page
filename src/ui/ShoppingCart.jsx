/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import { useEffect, useRef, useState } from 'react';
import { LiaTimesSolid } from 'react-icons/lia';
import { AnimatePresence, motion } from 'framer-motion';

const StyledShoppingCart = styled.div`
  position: relative;
  margin-right: 4.6rem;
  font-family: var(--font-main);

  @media screen and (max-width: 600px) {
    margin-right: 2.2rem;
    position: static;
  }
`;

const ShoppingCartIcon = styled.img`
  cursor: pointer;
`;

const ShoppingCartContainer = styled(motion.div)`
  width: 36rem;
  background-color: var(--color-white);
  box-shadow: 0rem 0rem 2.4rem var(--color-grey-100);
  position: absolute;
  top: 5rem;
  right: 0;
  transform: translateX(50%);
  border-radius: 1rem;
  z-index: 2000;

  @media screen and (max-width: 600px) {
    transform: translateX(0%);
    /* width: auto; */
    top: 8rem;
    left: 0.8rem;
    right: -0.8rem;
    width: calc(100% - 1.6rem);
  }
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

// ************************************

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;
  margin-bottom: 2.6rem;
`;

const ItemImage = styled.img`
  height: 5rem;
  width: 5rem;
  border-radius: 0.4rem;
`;

const ItemTitle = styled.h3`
  font-size: 1.6rem;
  color: var(--color-blue-300);
  font-weight: 400;
  margin-bottom: 1rem;
`;

const ItemPrice = styled.p`
  color: var(--color-blue-300);
  font-weight: 400;
`;

const ItemQuantity = styled.p`
  color: var(--color-blue-300);
  font-weight: 400;
  margin-right: 0.2rem;
`;

const ItemTotalPrice = styled.p`
  color: var(--color-blue-100);
  font-weight: 700;
`;

const ItemPriceContainer = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: nowrap;
  font-size: 1.6rem;
  align-items: baseline;
`;

const DeleteItemButton = styled.img`
  cursor: pointer;
`;

const ItemTextContainer = styled.div``;
const IconTimes = styled(LiaTimesSolid)`
  height: 0.8rem;
  width: auto;
`;

// ************************************

const CheckoutButton = styled.button`
  background-color: var(--color-orange-100);
  font-size: 1.6rem;
  text-align: center;
  width: 100%;
  padding: 1.6rem 0 2rem 0;
  color: var(--color-white);
  border-radius: 1rem;
  outline: none;
  border: 0.2rem solid var(--color-orange-100);

  font-weight: 700;
  cursor: pointer;

  transition: background 0.3s ease, color 0.3s ease;
  &:hover {
    color: var(--color-orange-100);
    background-color: transparent;
  }
`;

// ************************************

const ShoppingCartIconContainer = styled.div`
  position: relative;
`;

const CartCount = styled.p`
  font-size: 1rem;
  background-color: var(--color-orange-100);
  color: var(--color-white);
  text-align: center;
  font-weight: 700;
  position: absolute;
  top: -0.6rem;
  padding: 0 0.7rem;
  right: -1rem;
  border-radius: 1.2rem;
`;

function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { shoppingCart, handleRemoveItem } = useShoppingCart();
  const isMobile = window.innerWidth < 600;
  const ref = useRef();
  function handleDeleteItem(id) {
    handleRemoveItem(id);
  }

  let allCount = 0;

  shoppingCart?.map(cur => {
    allCount = allCount + cur.quantity;
  });

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
      }
      document.addEventListener('click', handleClick, true);
      return () => document.removeEventListener('click', handleClick);
    },
    [setIsOpen]
  );

  return (
    <StyledShoppingCart>
      <ShoppingCartIconContainer>
        <ShoppingCartIcon
          onClick={() => setIsOpen(!isOpen)}
          src="/images/icon-cart.svg"
          alt="shopping cart icon"
        />
        {shoppingCart?.length > 0 && <CartCount>{allCount}</CartCount>}
      </ShoppingCartIconContainer>
      <AnimatePresence>
        {isOpen && (
          <ShoppingCartContainer
            initial={{
              opacity: 0,
              transform: isMobile
                ? 'translate(0, -20px)'
                : 'translate(50%, -20px)',
            }}
            animate={{
              opacity: 1,
              transform: isMobile ? 'translate(0, 0)' : 'translate(50%, 0)',
            }}
            exit={{
              opacity: 0,
              transform: isMobile
                ? 'translate(0, -20px)'
                : 'translate(50%, -20px)',
            }}
            ref={ref}
          >
            <CartTitle>Cart</CartTitle>
            {shoppingCart?.length == 0 && (
              <EmtyCart>Your cart is empty.</EmtyCart>
            )}
            {shoppingCart?.length > 0 && (
              <CartContentContainer>
                {/* for now it is empty */}
                {shoppingCart?.length > 0 &&
                  shoppingCart?.map(item => (
                    <ItemContainer key={item.id}>
                      <ItemImage src={`${item?.photos[0]}`} />
                      <ItemTextContainer>
                        <ItemTitle>{item.title}</ItemTitle>
                        <ItemPriceContainer>
                          <ItemPrice>${item.priceAfterDiscount}</ItemPrice>
                          <IconTimes />
                          <ItemQuantity>{item.quantity}</ItemQuantity>
                          <ItemTotalPrice>
                            $
                            {(item.priceAfterDiscount * item.quantity).toFixed(
                              2
                            )}
                          </ItemTotalPrice>
                        </ItemPriceContainer>
                      </ItemTextContainer>
                      <DeleteItemButton
                        onClick={() => handleDeleteItem(item.id)}
                        src="images/icon-delete.svg"
                      />
                    </ItemContainer>
                  ))}
                {shoppingCart?.length > 0 && (
                  <CheckoutButton>Checkout</CheckoutButton>
                )}
              </CartContentContainer>
            )}
          </ShoppingCartContainer>
        )}
      </AnimatePresence>
    </StyledShoppingCart>
  );
}

export default ShoppingCart;
