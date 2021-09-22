import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import MenuItems from './MenuItems';

import './Navbar.css';

const Navbar = () => {
  const [menuIconClicked, setMenuIconClicked] = useState(false);

  const menuItemsMapped = MenuItems.map((item) => (
    <li>
      <Link key={item.title} className={item.cName} to={item.url}>
        {item.title}
      </Link>
    </li>
  ));

  const onMenuIconClickHandler = () => {
    setMenuIconClicked(!menuIconClicked);
  };

  return (
    <nav className="NavbarItems">
      <h1 className="navbar-logo">
        React
        <i className="fab fa-react" />
      </h1>
      <div
        className="menu-icon"
        onClick={onMenuIconClickHandler}
        onKeyDown={onMenuIconClickHandler}
        role="menuitem"
        tabIndex={0}
      >
        <i className={menuIconClicked ? 'fas fa-times' : 'fas fa-bars'} />
      </div>
      <ul className={menuIconClicked ? 'nav-menu active' : 'nav-menu'}>
        {menuItemsMapped}
      </ul>
      <Button>Sign Up</Button>
    </nav>
  );
};

export default Navbar;
