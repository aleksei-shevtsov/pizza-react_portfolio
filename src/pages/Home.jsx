import React from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { set_category_id, set_current_page, set_filters } from '../redux_/slices_/filter_slice';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock/index';
import Pagination from '../components/Pagination';
import { fetch_pizzas } from '../redux_/slices_/pizza_slice';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { sort_, category_id, current_page } = useSelector((state) => state.filter);
  const { items_, status_ } = useSelector((state) => state.pizza);

  const search_value = useSelector((state) => state.filter.search_value);

  const onChangeCategory = (id) => {
    dispatch(set_category_id(id));
  };

  const onChangePage = (num) => dispatch(set_current_page(num));

  const getPizzas = async () => {
    const order = sort_.sortProperty.includes('+') ? '&order=asc' : '&order=desc';
    const category = category_id > 0 ? `category=${category_id}` : '';
    const sortBy = sort_.sortProperty.replace('+', '');
    const search = search_value ? `&search=${search_value}` : '';
    dispatch(
      fetch_pizzas({
        order,
        category,
        sortBy,
        search,
        current_page,
      }),
    );

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {}, [category_id, sort_.sortProperty, search_value, current_page]);

  // если был первый рендер и изменили параметры, вшивай в URL параметры
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort_.sortProperty,
        categoryId: category_id,
        currentPage: current_page,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [category_id, sort_.sortProperty, current_page]);

  React.useEffect(() => {
    getPizzas();
  }, [category_id, sort_.sortProperty, search_value, current_page]);

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [category_id, sort_.sortProperty, search_value, current_page]);

  const pizzas = items_.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories valueId={category_id} setValueId={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status_ === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>Не удалось получить данные</p>
        </div>
      ) : (
        <div className="content__items">{status_ === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={current_page} onChangePage={onChangePage} />
    </div>
  );
};
