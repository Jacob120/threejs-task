import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CartContext from './context/CartContext';
import Footer from './components/layout/Footer/Footer';
import NavBar from './components/layout/NavBar/NavBar';
import TopBar from './components/layout/TopBar/TopBar';
import CartPage from './components/views/CartPage/CartPage';

import Home from './components/views/Home/Home';
import { NotFound } from './components/views/NotFound/NotFound';

function App() {
  // Initialize an empty cart
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity, material) => {
    // Check if the product is already in the cart
    const existingProduct = cart.find((item) => item.product.id === product.id);

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity, material }]);
    }
  };
  console.log(cart);
  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.product.id !== product.id));
  };

  return (
    <main>
      <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
        <TopBar />
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </CartContext.Provider>
    </main>
  );
}

export default App;
