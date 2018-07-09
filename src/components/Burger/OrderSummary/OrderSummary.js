import React from 'react';
import Aux from '../../../hoc/Aux';

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
      <p>Continue to Checkout?</p>
    </Aux>
  );
};

export default orderSummary;