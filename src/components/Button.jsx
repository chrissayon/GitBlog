import PropTypes from 'prop-types';

import './Button.css';

const STYLES = [
  'btn--primary',
  'btn--outline',
];

const SIZES = [
  'btn--medium',
  'btn--large',
];

const Button = ({
  children,
  buttonStyle,
  buttonSize,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      type="button"
      tabIndex={0}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string,
  buttonStyle: PropTypes.string,
  buttonSize: PropTypes.string,
};

Button.defaultProps = {
  children: 'none',
  buttonStyle: 'btn--primary',
  buttonSize: 'btn--medium',
};

export default Button;
