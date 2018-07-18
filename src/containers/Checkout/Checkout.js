import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  }

  constructor(props) {
    super(props);
    console.log("[Checkout.js] Inside constructor()");
    debugger
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[Checkout.js] Inside shouldComponentUpdate()");
    debugger
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("[Checkout.js] Inside componentDidUpdate()");
    debugger
  }

  componentWillMount() {
    console.log("[Checkout.js] Inside componentWillMount()");
    debugger
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let totalPrice = 0;
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        totalPrice = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    console.log("[Checkout.js] Inside componentDidMount()");
    debugger
    this.setState({ ingredients: ingredients, totalPrice: totalPrice });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    console.log("[Checkout.js] Inside render()");
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.url + '/contact-data'}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...props} />
          )}
        />
      </div>
    );
  }
}

export default Checkout;