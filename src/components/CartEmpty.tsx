import React from 'react';
import { Link } from 'react-router-dom';
import cartEmptyImg from '../assets/img/empty-cart.png';

const CartEmpty: React.FC = () => (
  <div className="cart cart__empty">
    <h2>
      Cart is empty <span className="icon">😕</span>
    </h2>
    <p>
    Most likely, you have not ordered pizza yet.
      <br />
      In order to order pizza, go to the Main page.
    </p>
    <img src={cartEmptyImg} alt="Empty cart" />
    <Link to="/" className="button button__black">
      <span>Return</span>
    </Link>
  </div>
);

export default CartEmpty;
