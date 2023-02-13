import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { increment_count_plus_1, decrement_count_minus_1 } from './redux_/slices_/filter_slice';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';

import { Home } from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

import './scss/app.scss';

export const SearchValueContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState('');
  const dispatch = useDispatch();

  console.log(searchValue);
  return (
    <div className="wrapper">
      <SearchValueContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchValueContext.Provider>
    </div>
  );
}

export default App;
