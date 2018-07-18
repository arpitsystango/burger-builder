import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    ordering: false,
    loading: false
  }

  isPurchasable = (ingredients) => {
    for (let item in ingredients) {
      if (ingredients[item] > 0) {
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
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }

  addRemoveIngredientHandler = (type, add = true) => {
    let updatedPrice = this.state.totalPrice;
    let updatedCount = this.state.ingredients[type];

    if (add) {
      updatedPrice += INGREDIENT_PRICES[type];
      updatedCount++;
    } else if ((updatedCount - 1) > -1) {
      updatedPrice -= INGREDIENT_PRICES[type];
      updatedCount--;
    }

    const updatedIngredient = { ...this.state.ingredients };
    updatedIngredient[type] = updatedCount;
    const isPurchasable = this.isPurchasable(updatedIngredient);
    this.setState({ totalPrice: updatedPrice, ingredients: updatedIngredient, purchasable: isPurchasable });
  }

  render() {
    const disabledInfo = {};

    for (let key in this.state.ingredients) {
      disabledInfo[key] = this.state.ingredients[key] <= 0;
    }

    let orderSummary = <OrderSummary
      ingredients={this.state.ingredients}
      price={this.state.totalPrice}
      cancel={this.cancelOrderingHandler}
      continue={this.continueOrderHandler}
    />;

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.ordering}
          closeOrdering={this.cancelOrderingHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
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