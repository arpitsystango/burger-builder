import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredient: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    ordering: false
  }

  isPurchasable = (ingredient) => {
    for (let item in ingredient) {
      if (ingredient[item] > 0) {
        return true;
      }
    }
    return false;
  }

  orderingHandler = () => {
    this.setState({ ordering: true });
  }

  cancelOrderingHandler = () => {
    this.setState({ ordering: false });
  }

  continueOrderHandler = () => {
    alert("You go implement the full functionality first!");
  }

  addRemoveIngredientHandler = (type, add = true) => {
    let updatedPrice = this.state.totalPrice;
    let updatedCount = this.state.ingredient[type];

    if (add) {
      updatedPrice += INGREDIENT_PRICES[type];
      updatedCount++;
    } else if ((updatedCount - 1) > -1) {
      updatedPrice -= INGREDIENT_PRICES[type];
      updatedCount--;
    }

    const updatedIngredient = { ...this.state.ingredient };
    updatedIngredient[type] = updatedCount;
    const isPurchasable = this.isPurchasable(updatedIngredient);
    this.setState({ totalPrice: updatedPrice, ingredient: updatedIngredient, purchasable: isPurchasable });
  }

  render() {
    const disabledInfo = {};

    for (let key in this.state.ingredient) {
      disabledInfo[key] = this.state.ingredient[key] <= 0;
    }

    return (
      <Aux>
        <Modal
          show={this.state.ordering}
          closeOrdering={this.cancelOrderingHandler}>
          <OrderSummary
            ingredient={this.state.ingredient}
            price={this.state.totalPrice}
            cancel={this.cancelOrderingHandler}
            continue={this.continueOrderHandler}
          />
        </Modal>
        <Burger ingredient={this.state.ingredient} />
        <BuildControls
          price={this.state.totalPrice}
          disabledInfo={disabledInfo}
          ingredientAdded={this.addRemoveIngredientHandler}
          ingredientRemoved={this.addRemoveIngredientHandler}
          notPurchasable={!this.state.purchasable}
          order={this.orderingHandler} />
      </Aux>
    );
  }
}

export default BurgerBuilder;