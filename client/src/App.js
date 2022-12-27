import { Routes, Route } from 'react-router-dom';
import CartPage from './components/views/CartPage/CartPage';

import Home from './components/views/Home/Home';

function App() {
  return (
    <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<CartPage />} />
      </Routes>
    </main>
  );
}

export default App;
