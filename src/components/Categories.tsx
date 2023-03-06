import React from 'react';

type CategoriesProps = {
  categoryId: number;
  setCategoryId: (index: number) => void;
};

const CATEGORIES = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

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
