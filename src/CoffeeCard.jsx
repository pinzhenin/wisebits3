import {useEffect, useState} from 'react';
import style from './CoffeeLine.module.css';

export default function CoffeeLineMain() {
  const [coffeeLine, setCoffeeLine] = useState([]);
  return (
    <main className={style.main}>
      {coffeeLine.map((coffeeItem) => <CoffeeItem {...coffeeItem} />)}
    </main>
  )
}
