import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CoffeeLineApi from './api/CoffeeLineApi';
import style from './CoffeeCard.module.css';

const coffeeItemPlaceholder = {
  id: 0,
  uid: '0',
  intensifier: 'Loading...',
  origin: 'Loading...',
  variety: 'Loading...',
  blend_name: 'Loading...',
  notes: 'Loading...',
};
const coffeeImagePlaceholder = 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Coffee_cup_flat.svg';
const coffeeImageCache = new Map([[coffeeItemPlaceholder.uid, coffeeImagePlaceholder]]);

export default function CoffeeCard({ coffeeItem }) {
  const notes = coffeeItem.notes.split(', ');
  const [imageUrl, setImageUrl] = useState(coffeeImageCache.get(coffeeItem.uid) || coffeeImagePlaceholder);

  useEffect(() => {
    if (!coffeeImageCache.has(coffeeItem.uid)) {
      CoffeeLineApi.getCoffeeImage()
        .then((url) => {
          const image = new Image();
          image.src = url;
          image.onload = () => {
            coffeeImageCache.set(coffeeItem.uid, url);
            setImageUrl(url);
          };
        })
        .catch((reason) => console.debug('Something went wrong...', { reason }));
    }
  }, [coffeeItem.uid]);

  return (
    <div className={style.coffeeCard}>
      <div className={style.image}>
        <img src={imageUrl} alt={coffeeItem.blend_name} />
      </div>
      <div className={style.intensifier}>{coffeeItem.intensifier}</div>
      <div className={style.text}>
        <div className={style.origin}>{coffeeItem.origin}</div>
        <div className={style.blend_name}>{coffeeItem.blend_name}</div>
        <div className={style.variety}>{coffeeItem.variety}</div>
        <div className={style.notes}>
          {notes.map((note, index) => <div className={style.note} key={index}>{note}</div>) /* use index because of duplicates */}
        </div>
      </div>
    </div>
  );
}

CoffeeCard.propTypes = {
  coffeeItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    uid: PropTypes.string.isRequired,
    intensifier: PropTypes.string.isRequired,
    origin: PropTypes.string.isRequired,
    variety: PropTypes.string.isRequired,
    blend_name: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
  })
};
CoffeeCard.defaultProps = { coffeeItem: coffeeItemPlaceholder };
