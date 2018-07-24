import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
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
    if (this.props.isAuthenticated) {
      this.setState({ ordering: true });
    } else {
      this.props.setAuthRedirectPath('/checkout');
      this.props.history.push("/auth");
    }
  }

  cancelOrderingHandler = () => {
    this.setState({ ordering: false });
  }

  continueOrderHandler = () => {
    this.props.onInitPurchase();
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

  componentDidMount() {
    this.props.onInitIngredients();
  }

  render() {
    const disabledInfo = {};

    for (let key in this.props.ingredients) {
      disabledInfo[key] = this.props.ingredients[key] <= 0;
    }

    let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            price={this.props.totalPrice}
            disabledInfo={disabledInfo}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            notPurchasable={!this.isPurchasable()}
            isAuthenticated={this.props.isAuthenticated}
            order={this.orderingHandler} />
        </Aux>
      );
    }

    let orderSummary = <OrderSummary
      ingredients={this.props.ingredients}
      price={this.props.totalPrice}
      cancel={this.cancelOrderingHandler}
      continue={this.continueOrderHandler}
    />;

    return (
      <Aux>
        <Modal
          show={this.state.ordering}
          modalClosed={this.cancelOrderingHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
  isAuthenticated: state.auth.token
});

const mapDispatchToProps = (dispatch) => ({
  onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
  onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
  onInitIngredients: () => dispatch(actions.initIngredients()),
  onInitPurchase: () => dispatch(actions.purchaseInit()),
  setAuthRedirectPath: (pathname) => dispatch(actions.setAuthRedirectPath(pathname))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));