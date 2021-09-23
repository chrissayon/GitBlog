import PropTypes from 'prop-types';

import './BlogSummary.css';

const BlogSummary = ({
  title,
  content,
}) => (
  <div className="summary">
    <h1 className="summary__title">{title}</h1>
    <p className="summary__content">{content}</p>
  </div>
);

BlogSummary.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

BlogSummary.defaultProps = {
  title: 'Default Title',
  content: 'Default Content',
};

export default BlogSummary;
