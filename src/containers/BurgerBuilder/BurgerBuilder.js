import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    ordering: false,
    loading: false
  }

  isPurchasable = () => {
    for (let item in this.props.ingredients) {
      if (this.props.ingredients[item] > 0) {
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
    this.props.history.push({ pathname: '/checkout' });
  }

  // addRemoveIngredientHandler = (type, add = true) => {
  //   let updatedPrice = this.props.totalPrice;
  //   let updatedCount = this.props.ingredients[type];

  //   if (add) {
  //     updatedPrice += INGREDIENT_PRICES[type];
  //     updatedCount++;
  //   } else if ((updatedCount - 1) > -1) {
  //     updatedPrice -= INGREDIENT_PRICES[type];
  //     updatedCount--;
  //   }

  //   const updatedIngredient = { ...this.props.ingredients };
  //   updatedIngredient[type] = updatedCount;
  //   const isPurchasable = this.isPurchasable(updatedIngredient);
  //   this.setState({ totalPrice: updatedPrice, ingredients: updatedIngredient, purchasable: isPurchasable });
  // }

  render() {
    const disabledInfo = {};

    for (let key in this.props.ingredients) {
      disabledInfo[key] = this.props.ingredients[key] <= 0;
    }

    let orderSummary = <OrderSummary
      ingredients={this.props.ingredients}
      price={this.props.totalPrice}
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
        <Burger ingredients={this.props.ingredients} />
        <BuildControls
          price={this.props.totalPrice}
          disabledInfo={disabledInfo}
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          notPurchasable={!this.isPurchasable()}
          order={this.orderingHandler} />
      </Aux>
    );
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.ingredients,
  totalPrice: state.totalPrice
});

const mapDispatchToProps = (dispatch) => ({
  onIngredientAdded: (ingredientName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
  onIngredientRemoved: (ingredientName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName })
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));