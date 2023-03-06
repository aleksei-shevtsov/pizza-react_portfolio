import React from 'react';

type CategoriesProps = {
  categoryId: number;
  setCategoryId: (index: number) => void;
};

const CATEGORIES = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];

const Categories: React.FC<CategoriesProps> = React.memo(({ categoryId, setCategoryId }) => {
  return (
    <div className="categories">
      <ul>
        {CATEGORIES.map((category, index) => {
          return (
            <li
              key={category}
              onClick={() => setCategoryId(index)}
              className={categoryId === index ? 'active' : ''}>
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default Categories;
