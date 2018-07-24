import React, { Fragment } from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>Burger Builder</NavigationItem>
    {
      props.isAuthenticated ?
        <Fragment>
          <NavigationItem link="/orders">Orders</NavigationItem>
          <NavigationItem link="/logout">Logout</NavigationItem>
        </Fragment> :
        <NavigationItem link="/auth">Login/Signup</NavigationItem>
    }
  </ul>
);

export default navigationItems;