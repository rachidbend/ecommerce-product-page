import styled from 'styled-components';
import Header from './Header';
import ProductShowcase from './ProductShowcase';

const StyledAppLayout = styled.div`
  font-family: var(--font-main);
`;

const item = {
  id: 1,
  photos: [
    '/images/image-product-1.jpg',
    '/images/image-product-2.jpg',
    '/images/image-product-3.jpg',
    '/images/image-product-4.jpg',
  ],
  thumbnails: [
    '/images/image-product-1-thumbnail.jpg',
    '/images/image-product-2-thumbnail.jpg',
    '/images/image-product-3-thumbnail.jpg',
    '/images/image-product-4-thumbnail.jpg',
  ],
  title: 'Fall limited edition sneaker',
  description: `These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.`,
  discount: 50,
  price: 250,
  priceAfterDiscount: 125.0,
  quantity: 0,
};

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <ProductShowcase item={item} />
    </StyledAppLayout>
  );
}

export default AppLayout;
