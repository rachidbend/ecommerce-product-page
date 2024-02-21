/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import { useState } from 'react';
import { IoCartOutline } from 'react-icons/io5';
import ImageCarousel from './ImageCarousel';

const StyledProductShowcase = styled.div`
  max-width: 101.5rem;
  margin: 0 auto;
  margin-top: 9rem;

  display: grid;
  grid-template-columns: 44.5rem 1fr;
  gap: 12.5rem;
  grid-template-rows: auto;
  align-items: center;
  font-family: var(--font-main);

  @media screen and (max-width: 600px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 0;
    gap: 1.6rem;
  }
`;

const ContentContainer = styled.div`
  @media screen and (max-width: 600px) {
    padding: 0 2.4rem;
  }
`;
const CompanyTitle = styled.p`
  font-size: 1.4rem;
  color: var(--color-orange-100);
  letter-spacing: 0.112rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 2rem;

  @media screen and (max-width: 600px) {
    font-size: 1.3rem;
    margin-bottom: 1.6rem;
  }
`;

const Title = styled.h2`
  font-size: 4.4rem;
  text-transform: capitalize;
  color: var(--color-blue-100);
  line-height: 4.7rem;
  margin-bottom: 3.8rem;

  @media screen and (max-width: 600px) {
    font-size: 2.8rem;
    margin-bottom: 1.6rem;
    line-height: 3.2rem;
  }
`;
const Description = styled.p`
  font-size: 1.6rem;
  line-height: 2.6rem;
  color: var(--color-blue-200);
  font-weight: 400;
  margin-bottom: 2.5rem;

  @media screen and (max-width: 600px) {
    line-height: 2.5rem;
    font-size: 1.5rem;
    margin-bottom: 2.5rem;
  }
`;

const Price = styled.p`
  letter-spacing: 0.112rem;
  font-size: 1.2rem;
  margin-bottom: 3.8rem;
  font-weight: 700;
  color: var(--color-blue-300);
  text-decoration: line-through;

  @media screen and (max-width: 600px) {
    margin: 0;
    font-size: 1.6rem;
  }
`;
const Discount = styled.p`
  letter-spacing: 0.112rem;
  font-size: 1.2rem;
  color: var(--color-orange-100);
  padding: 0.3rem 1rem 0.4rem 0.7rem;
  background-color: var(--color-orange-200);
  border-radius: 0.6rem;
  font-weight: 700;
`;
const DiscountPrice = styled.p`
  font-size: 2.8rem;
  letter-spacing: 0.112rem;
  font-weight: 700;
  color: var(--color-blue-100);
`;

const DiscountContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 0.9rem;
`;

// ***********************************

const QuantityContainer = styled.div`
  /* padding: 1.8rem 0.8rem; */
  width: 15.7rem;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-blue-400);
  border-radius: 0.9rem;
  /* height: 100%; */
  margin-top: 0.2rem;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const Quantity = styled.span`
  letter-spacing: 0.112rem;
  font-size: 1.6rem;

  font-weight: 700;
  color: var(--color-blue-100);
`;

const QuantityButtonContainer = styled.div`
  padding: 0 0.8rem;
  height: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover img {
    filter: opacity(60%);
  }

  @media screen and (max-width: 600px) {
    padding: 2.4rem;
  }
`;

const QuantityButton = styled.img`
  transition: filter 0.3s ease;
`;

const AddToCart = styled.button`
  background-color: var(--color-orange-100);
  color: var(--color-white);
  padding: 1.7rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  font-size: 1.6rem;
  font-weight: 700;
  width: 100%;
  border: none;
  border-radius: 1.2rem;
  cursor: pointer;
  box-shadow: 0rem 1rem 3rem hsla(26, 100%, 55%, 0.3);

  border: 0.2rem solid var(--color-orange-100);
  transition: background 0.3s ease, color 0.3s ease;
  &:hover {
    background-color: transparent;
    color: var(--color-orange-100);
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: start;
  gap: 1.6rem;

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 8.8rem;
  }
`;

const CartIcon = styled(IoCartOutline)`
  color: inherit;
  height: 2rem;
  width: 2.2rem;
  transform: scale(110%);
`;

const PriceContainer = styled.div`
  @media screen and (max-width: 600px) {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.4rem;
  }
`;

function ProductShowcase({ item }) {
  const [itemQuantity, setItemQuantity] = useState(0);
  const { handleAddItem } = useShoppingCart();

  const {
    id,
    photos,
    thumbnails,
    title,
    description,
    discount,
    price,
    priceAfterDiscount,
    quantity,
  } = item;

  function onAddItem() {
    if (itemQuantity == 0) return;
    handleAddItem({
      ...item,
      quantity: itemQuantity,
    });
  }

  return (
    <StyledProductShowcase>
      <ImageCarousel images={photos} thumbnails={thumbnails} />
      <ContentContainer>
        <CompanyTitle>Sneaker company</CompanyTitle>
        <Title>{title} </Title>
        <Description>{description}</Description>
        <PriceContainer>
          <DiscountContainer>
            <DiscountPrice>${priceAfterDiscount.toFixed(2)}</DiscountPrice>
            <Discount>{discount}%</Discount>
          </DiscountContainer>
          <Price>${price.toFixed(2)} </Price>
        </PriceContainer>

        <ButtonsContainer>
          <QuantityContainer>
            <QuantityButtonContainer
              onClick={() =>
                setItemQuantity(itemQuantity => Math.max(0, itemQuantity - 1))
              }
            >
              <QuantityButton
                src="/images/icon-minus.svg"
                alt="decrease quantity"
              />
            </QuantityButtonContainer>
            <Quantity>{itemQuantity}</Quantity>
            <QuantityButtonContainer
              onClick={() => setItemQuantity(itemQuantity + 1)}
            >
              <QuantityButton
                src="/images/icon-plus.svg"
                alt="increase quantity"
              />
            </QuantityButtonContainer>
          </QuantityContainer>
          <AddToCart onClick={onAddItem}>
            <CartIcon />
            <span>Add to cart</span>
          </AddToCart>
        </ButtonsContainer>
      </ContentContainer>
    </StyledProductShowcase>
  );
}

export default ProductShowcase;
