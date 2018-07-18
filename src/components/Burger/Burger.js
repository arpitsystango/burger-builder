import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const burger = (props) => {
  let ingredients = [];
  for (let key in props.ingredients) {
    for (let i=0; i<props.ingredients[key] ; i++) {
      ingredients.push(<BurgerIngredient key={key+i} type={key} />);
    }
  }

  if (ingredients.length === 0) {
    ingredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default burger;