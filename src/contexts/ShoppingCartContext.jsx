import { createContext, useContext, useState } from 'react';

const ShoppingCartContext = createContext();

// an item whould look like this
const item = {
  id: 1,
  photos: [
    '/images/image-product-1.png',
    '/images/image-product-2.png',
    '/images/image-product-3.png',
    '/images/image-product-4.png',
  ],
  thumbnails: [
    '/images/image-product-1-thumbnail.png',
    '/images/image-product-2-thumbnail.png',
    '/images/image-product-3-thumbnail.png',
    '/images/image-product-4-thumbnail.png',
  ],
  title: 'Fall limited edition sneaker',
  description: 'These low-profile sneakers ...',
  discount: 50,
  price: 250,
  priceAfterDiscount: 125.0,
  quantity: 0,
};

export default function ShoppingCartProvider({ children }) {
  const [shoppingCart, setShoppingCart] = useState([]);

  // handler for adding an item to the shopping list
  function handleAddItem(item) {
    const isIncluded = shoppingCart.filter(olditem => olditem.id == item.id);
    if (isIncluded?.length > 0) return;
    setShoppingCart(shoppingCart => [item, ...shoppingCart]);
  }

  // handler for removing an item from the shopping list
  function handleRemoveItem(id) {
    const newShoppingCart = shoppingCart.filter(item => item.id !== id);
    console.log(newShoppingCart);
    setShoppingCart(newShoppingCart);
  }

  return (
    <ShoppingCartContext.Provider
      value={{ shoppingCart, handleAddItem, handleRemoveItem }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export function useShoppingCart() {
  const value = useContext(ShoppingCartContext);

  if (value == undefined)
    throw new Error(
      'useShoppingCart hook was used outside of the ShoppingCartContext'
    );

  return value;
}
