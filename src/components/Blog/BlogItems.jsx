import PropTypes from 'prop-types';

const BlogItems = ({
  title,
  content,
}) => (
  <div>
    <h1>{title}</h1>
    <p>{content}</p>
  </div>
);

BlogItems.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

BlogItems.defaultProps = {
  title: 'Default Title',
  content: 'Default Content',
};

export default BlogItems;
