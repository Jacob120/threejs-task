import { Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar/NavBar';
import TopBar from './components/layout/TopBar/TopBar';
import CartPage from './components/views/CartPage/CartPage';

import Home from './components/views/Home/Home';
import { NotFound } from './components/views/NotFound/NotFound';

function App() {
  return (
    <main>
      <TopBar />
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
