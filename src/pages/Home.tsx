import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock/index';
import Pagination from '../components/Pagination';
import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { selectPizzaData } from '../redux/pizza/selectors';
import { fetchPizzas } from '../redux/pizza/asyncActions';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { sort, categoryId, currentPage, searchValue } = useSelector(selectFilter);

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = (page: number) => dispatch(setCurrentPage(page));

  const getPizzas = async () => {
    const order = sort.sortProperty.includes('+') ? '&order=asc' : '&order=desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sort.sortProperty.replace('+', '');
    const search = searchValue ? `&search=${searchValue}` : '';
    dispatch(
      fetchPizzas({
        order,
        category,
        sortBy,
        search,
        currentPage: String(currentPage),
      }),
    );

    window.scrollTo(0, 0);
  };

  // если был первый рендер и изменили параметры, вшивай в URL параметры
  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId: categoryId > 0 ? categoryId : null,
  //       currentPage: currentPage,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   if (!window.location.search) {
  //     dispatch(fetchPizzas({} as SearchPizzaParams));
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sort.sortProperty, currentPage]);

  // -------------------
  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // Если был первый рендер, то запрашиваем пиццы
  // React.useEffect(() => {
  //   if (!isSearch.current) {
  //     getPizzas();
  //   }
  //   isSearch.current = false;
  // }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || sortList[0],
  //       }),
  //     );
  //   }

  //   isMounted.current = true;
  // }, [categoryId, sort.sortProperty, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} setCategoryId={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>Не удалось получить данные</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
