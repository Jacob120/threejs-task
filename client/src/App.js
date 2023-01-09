import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import CartContext from './context/CartContext';
import Footer from './components/layout/Footer/Footer';
import NavBar from './components/layout/NavBar/NavBar';
import TopBar from './components/layout/TopBar/TopBar';
import CartPage from './components/views/CartPage/CartPage';

import Home from './components/views/Home/Home';
import { NotFound } from './components/views/NotFound/NotFound';

function App() {
  const [cart, setCart] = useState(
    JSON.parse(sessionStorage.getItem('cart')) || []
  );

  const addToCart = (product, quantity, material) => {
    const existingProduct = cart.find(
      (item) => item.product._id === product._id
    );

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity, material }]);
    }
    sessionStorage.setItem('cart', JSON.stringify(cart));
  };

  const removeFromCart = (product) => {
    console.log('rem prod', product);
    setCart(cart.filter((item) => item.product._id !== product.product._id));
    sessionStorage.setItem('cart', JSON.stringify(cart));
  };

  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

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
