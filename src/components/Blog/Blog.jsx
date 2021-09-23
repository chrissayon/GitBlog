import BlogSummary from './BlogSummary';
import Navbar from '../Navbar/Navbar';
import Card from '../UI/Card';

import './Blog.css';

const Blog = () => (
  <>
    <Navbar />
    <div className="blog__layout">
      <Card><BlogSummary /></Card>
      <Card><BlogSummary /></Card>
      <Card><BlogSummary /></Card>
      <Card><BlogSummary /></Card>
      <Card><BlogSummary /></Card>
    </div>
  </>
);

export default Blog;
