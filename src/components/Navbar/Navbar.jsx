import { Link } from 'react-router-dom';
import Button from '../Button';
import MenuItems from './MenuItems';

import './Navbar.css';

const Navbar = () => {
  const menuItemsMapped = MenuItems.map((item) => (
    <li>
      <Link key={item.title} className={item.cName} to={item.url}>
        {item.title}
      </Link>
    </li>
  ));

  return (
    <nav className="NavbarItems">
      <h1 className="navbar-logo">
        GitBlog
        <i className="fab fa-react" />
      </h1>
      <ul className="nav-menu">
        {menuItemsMapped}
      </ul>
      <Button>Sign Up</Button>
    </nav>
  );
};

export default Navbar;
