import { forwardRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export const Portal = ({ children }) => (
  document === 'object'
    ? ReactDOM.createPortal(children, document.body)
    : null
);

export const Menu = forwardRef(
  (
    { className, ...props },
    ref,
  ) => (
    <div
      {...props}
      ref={ref}
    />
  ),
);

export const Leaf = ({ attributes, children, leaf }) => (
  <span
    {...attributes}
    style={{ fontWeight: leaf.bold ? 'bold' : 'normal' }}
  >
    {children}
  </span>
);

Menu.propTypes = {
  className: PropTypes.string,
};

Menu.defaultProps = {
  className: 'string',
};

Leaf.propTypes = {
  attributes: PropTypes.node,
  children: PropTypes.node,
  leaf: PropTypes.node,
};

Leaf.defaultProps = {
  attributes: null,
  children: null,
  leaf: null,
};
