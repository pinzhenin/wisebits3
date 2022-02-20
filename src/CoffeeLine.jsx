import { useEffect, useMemo, useReducer } from 'react';
import CoffeeLineApi from './api/CoffeeLineApi';
import CoffeeCard from './CoffeeCard';
import style from './CoffeeLine.module.css';

const initialState = {
  coffeeLine: [],
  loading: false,
  timerId: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'addCoffeeItem':
      return { ...state, coffeeLine: [...state.coffeeLine, action.payload] };
    case 'setLoading':
      return { ...state, loading: action.payload };
    case 'setTimerId':
      return { ...state, timerId: action.payload };
    default:
      throw new Error();
  }
}

export default function CoffeeLine() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { coffeeLine, loading, timerId } = state;

  const getCoffeeItem = useMemo(() => () => {
      if (!loading) {
        dispatch({ type: 'setLoading', payload: true });
        CoffeeLineApi.getCoffeeItem()
          .then((coffeeItem) => dispatch({ type: 'addCoffeeItem', payload: coffeeItem }))
          .catch((reason) => console.debug('Something went wrong...', { reason }))
          .finally(() => dispatch({ type: 'setLoading', payload: false }));
      }
    }, []
  );

  useEffect(() => getCoffeeItem(), []);

  useEffect(() => () => clearTimeout(timerId), []);

  useEffect(() => {
    if (loading) {
      clearTimeout(timerId);
      dispatch({ type: 'setTimerId', payload: setTimeout(getCoffeeItem, 30000) });
    }
  }, [loading]);

  return (
    <div className={style.coffeeLine}>
      <header className={style.header}>
        <button className={style.button} onClick={getCoffeeItem}>+</button>
        <h1 className={style.h1}>Coffee Line</h1>
        <hr />
      </header>

      <main className={style.main}>
        {coffeeLine.map((coffeeItem, index) => <CoffeeCard coffeeItem={coffeeItem} key={index} />)}
        {loading && <CoffeeCard />}
      </main>

      <footer>
        <hr />
        Total: {coffeeLine.length} card{coffeeLine.length !== 1 && 's'}
      </footer>
    </div>
  );
}
