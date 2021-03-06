import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={props.ingredientAdded.bind(this, ctrl.type)}
        remove={props.ingredientRemoved.bind(this, ctrl.type)}
        lessIsDisabled={props.disabledInfo[ctrl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={props.notPurchasable}
      onClick={props.order}>{props.isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
    </button>
  </div>
);

export default buildControls;