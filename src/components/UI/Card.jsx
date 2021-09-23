import PropTypes from 'prop-types';

import './Card.css';

const Card = ({ children }) => (
  <div className="card">
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node,
};

Card.defaultProps = {
  children: <>Empty Card</>,
};

export default Card;
