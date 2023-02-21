import React from 'react';
import { Link } from 'react-router-dom';
import cartEmptyImg from '../assets/img/empty-cart.png';

const CartEmpty: React.FC = () => (
  <div className="cart cart__empty">
    <h2>
      Корзина пустая <span className="icon">😕</span>
    </h2>
    <p>
      Вероятней всего, вы не заказывали ещё пиццу.
      <br />
      Для того, чтобы заказать пиццу, перейди на главную страницу.
    </p>
    <img src={cartEmptyImg} alt="Empty cart" />
    <Link to="/" className="button button__black">
      <span>Вернуться назад</span>
    </Link>
  </div>
);

export default CartEmpty;
