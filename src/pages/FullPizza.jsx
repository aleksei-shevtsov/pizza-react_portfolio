import axios from 'axios';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://63db9a41a3ac95cec5a5c8c6.mockapi.io/items/' + id);
        // console.log('log', log);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении товара!');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <div className="container">Загрузка.....</div>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h3>{pizza.price} BYN</h3>
      <p></p>
    </div>
  );
};

export default FullPizza;
