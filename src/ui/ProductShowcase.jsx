/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import { useState } from 'react';

const StyledProductShowcase = styled.div`
  max-width: 101.5rem;
  margin: 0 auto;
  margin-top: 9rem;

  display: grid;
  grid-template-columns: 44.5rem 1fr;
  gap: 6rem;
  grid-template-rows: auto;
  align-items: center;
  font-family: var(--font-main);
`;

const ImagePlaceholder = styled.img`
  /* max-width: 44.5rem; */
  max-width: 100%;
  height: auto;
  border-radius: 1.6rem;
`;

const ContentContainer = styled.div``;
const CompanyTitle = styled.p`
  font-size: 1.4rem;
  color: var(--color-orange-100);
  letter-spacing: 0.112rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 2rem;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 4.4rem;
  text-transform: capitalize;
  color: var(--color-blue-100);
  line-height: 4.7rem;
  margin-bottom: 3.8rem;
`;
const Description = styled.p`
  font-size: 1.6rem;
  line-height: 2.6rem;
  color: var(--color-blue-200);
  font-weight: 400;
  margin-bottom: 2.5rem;
`;

const Price = styled.p`
  letter-spacing: 0.112rem;
  font-size: 1.2rem;
  margin-bottom: 3.8rem;
  font-weight: 700;
  color: var(--color-blue-300);
  text-decoration: line-through;
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
  padding: 0 1.6rem;
  max-width: 15.7rem;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-blue-400);
  border-radius: 0.9rem;
`;

function ProductShowcase({ item }) {
  const [itemQuantity, setItemQuantity] = useState(0);
  const { handleAddItem, handleRemoveItem } = useShoppingCart();

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

  return (
    <StyledProductShowcase>
      <ImagePlaceholder src={`${photos[0]}`} />
      <ContentContainer>
        <CompanyTitle>Sneaker company</CompanyTitle>
        <Title>{title} </Title>
        <Description>{description}</Description>
        <div>
          <DiscountContainer>
            <DiscountPrice>${priceAfterDiscount.toFixed(2)}</DiscountPrice>
            <Discount>{discount}%</Discount>
          </DiscountContainer>
          <Price>${price.toFixed(2)} </Price>
        </div>

        <div>
          <QuantityContainer>
            <img
              src="/images/icon-minus.svg"
              alt="decrease quantity"
              onClick={() =>
                setItemQuantity(itemQuantity => Math.max(0, itemQuantity - 1))
              }
            />
            <span>{itemQuantity}</span>
            <img
              src="/images/icon-plus.svg"
              alt="increase quantity"
              onClick={() => setItemQuantity(itemQuantity + 1)}
            />
          </QuantityContainer>
        </div>
      </ContentContainer>
    </StyledProductShowcase>
  );
}

export default ProductShowcase;
