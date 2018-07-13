import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = [];
  for (let key in props.ingredient) {
    ingredientSummary.push(
      <li key={key}>
        <span style={{ textTransform: 'capitalize' }}>{key}</span>: {props.ingredient[key]}
      </li>
    );
  }

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <strong>Total Price: {props.price.toFixed(2)}</strong>
      <p>Continue to Checkout?</p>
      <Button btnType="Success" onclick={props.continue}>Continue</Button>
      <Button btnType="Danger" onclick={props.cancel}>Cancel</Button>
    </Aux>
  );
};

export default orderSummary;