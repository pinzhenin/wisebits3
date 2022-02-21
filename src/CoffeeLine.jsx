import { useEffect, useState } from 'react';
import CoffeeLineApi from './api/CoffeeLineApi';
import CoffeeCard from './CoffeeCard';
import style from './CoffeeLine.module.css';

export default function CoffeeLine() {
  const [coffeeLine, setCoffeeLine] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [timerId, setTimerId] = useState(0);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      CoffeeLineApi.getCoffeeItem()
        .then((coffeeItem) => setCoffeeLine([...coffeeLine, coffeeItem]))
        .catch((reason) => console.debug('Something went wrong...', { reason }))
        .finally(() => setLoading(false));
    }
  }, [clickCount]);

  useEffect(() => {
    if (timerId) {
      clearTimeout(timerId);
    }
    setTimerId(setTimeout(() => setClickCount(clickCount + 1), 30000));
    return () => clearTimeout(timerId);
  }, [clickCount]);

  return (
    <div className={style.coffeeLine}>
      <header className={style.header}>
        <button className={style.button} onClick={() => setClickCount(clickCount + 1)}>+</button>
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
