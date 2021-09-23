import PropTypes from 'prop-types';

// import './BlogView.css';

const BlogView = ({
  title,
  content,
}) => (
  <div className="blogview">
    <h1 className="blogview__title">{title}</h1>
    <p className="blogview__content">{content}</p>
  </div>
);

BlogView.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

BlogView.defaultProps = {
  title: 'Default Title',
  content: 'Default Content',
};

export default BlogView;
