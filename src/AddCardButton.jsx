import PropTypes from 'prop-types';
import style from './AddCardButton.module.css';

export default function AddCardButton({ onClick }) {
  return (
    <button
      className={style.button}
      onClick={onClick}
    >
      +
    </button>
  );
}

AddCardButton.propTypes = { onClick: PropTypes.func };
AddCardButton.defaultProps = { onClick: () => undefined };
