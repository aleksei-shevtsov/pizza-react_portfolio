import React from 'react';

type CategoriesProps = {
  categoryId: number;
  setCategoryId: (index: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({ categoryId, setCategoryId }) => {
  const CATEGORIES = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {CATEGORIES.map((category, index) => (
          <li
            key={category}
            onClick={() => setCategoryId(index)}
            className={categoryId === index ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
