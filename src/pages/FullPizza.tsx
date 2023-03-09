import React from "react";
import axios from "axios";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://63db9a41a3ac95cec5a5c8c6.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Error while receiving the goods!");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container-fullpizza">
      <img src={pizza.imageUrl} alt="Pizza Image" />
      <div className="container-fullpizza__description">
        <h2>{pizza.title}</h2>
        <h3>{pizza.price} USD</h3>
        <Link to="/">
          <button className="button button--outline button--add">
            <span>Back</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FullPizza;
