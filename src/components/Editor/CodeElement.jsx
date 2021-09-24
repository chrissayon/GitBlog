import PropTypes from 'prop-types';

// Define a React component renderer for our code blocks.
const CodeElement = ({ attributes, children }) => (
  <pre {...attributes}>
    <code>{children}</code>
  </pre>
);

CodeElement.propTypes = {
  attributes: PropTypes.node,
  children: PropTypes.node,
};

CodeElement.defaultProps = {
  attributes: null,
  children: null,
};

export default CodeElement;
