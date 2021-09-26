// import { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  DefaultElement,
} from 'slate-react';

export const renderElementNoCallback = (elementRenderValue) => {
  switch (elementRenderValue.element.type) {
    case 'code':
      return <CodeElement {...elementRenderValue} />;
    default:
      return <DefaultElement {...elementRenderValue} />;
  }
};

export const renderLeafNoCallback = ({ attributes, children, leaf }) => {
  let el = <>{children}</>;

  if (leaf.bold) {
    el = <strong>{el}</strong>;
  }

  if (leaf.code) {
    el = <code>{el}</code>;
  }

  if (leaf.italic) {
    el = <em>{el}</em>;
  }

  if (leaf.underline) {
    el = <u>{el}</u>;
  }

  // Span is the leaf in SlateJS terminology
  return <span {...attributes}>{el}</span>;
};

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
