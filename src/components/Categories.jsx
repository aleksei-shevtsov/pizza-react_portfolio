import React from 'react';

function Categories({ valueId, setValueId }) {
  const CATEGORIES = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {CATEGORIES.map((category, index) => (
          <li
            key={category}
            onClick={() => setValueId(index)}
            className={valueId === index ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
