import BlogSummary from './BlogSummary';
import Navbar from '../Navbar/Navbar';

import './Blog.css';

const Blog = () => (
  <>
    <Navbar />
    <div className="blog__layout">
      <BlogSummary />
      <BlogSummary />
      <BlogSummary />
      <BlogSummary />
      <BlogSummary />
    </div>
  </>
);

export default Blog;
