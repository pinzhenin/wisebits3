import { useCallback, useEffect, useState } from 'react';
import CoffeeLineApi from './api/CoffeeLineApi';
import CoffeeCard from './CoffeeCard';
import style from './CoffeeLine.module.css';

export default function CoffeeLine() {
  const [coffeeLine, setCoffeeLine] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timerId, setTimerId] = useState(0);

  const restartTimer = useCallback(() => {
    clearTimeout(timerId);
    setTimerId(setTimeout(() => setLoading(true), 30000));
  }, [timerId]);

  useEffect(() => {
    if (loading) {
      CoffeeLineApi.getCoffeeItem()
        .then((item) => setCoffeeLine((line) => [...line, item]))
        .catch((reason) => console.debug('Something went wrong...', { reason }))
        .finally(() => setLoading(false));
      restartTimer();
    }
  }, [loading]);

  useEffect(() => () => clearTimeout(timerId), [timerId]);

  return (
    <div className={style.coffeeLine}>
      <header className={style.header}>
        <button className={style.button} onClick={() => setLoading(true)}>+</button>
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
