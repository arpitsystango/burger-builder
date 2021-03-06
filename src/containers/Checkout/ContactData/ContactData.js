import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { checkValidity } from '../../../shared/utility';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class ContactData extends Component {
  state = {
    orderForm: null,
    isFormValid: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};

    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
      userId: this.props.userId
    };

    this.props.onOrderBurger(order, this.props.token);
  }

  inputHelper = (elementType = 'input', elementConfig, value = '', options = {}) => {
    return {
      elementType,
      elementConfig,
      value,
      touched: false,
      ...options
    };
  }

  componentWillMount() {
    let vaildationOptions = {
      validationRules: { isRequired: true },
      isValid: false
    };

    this.setState({
      orderForm: {
        name: this.inputHelper('input', { type: 'text', placeholder: 'Your Name' }, '', { ...vaildationOptions }),
        street: this.inputHelper('input', { type: 'text', placeholder: 'Street' }, '', { ...vaildationOptions }),
        zipCode: this.inputHelper('input', { type: 'text', placeholder: 'Zip Code' }, '', { ...vaildationOptions, validationRules: { isRequired: true, minLength: 6, maxLength: 6 } }),
        country: this.inputHelper('input', { type: 'text', placeholder: 'Country' }, '', { ...vaildationOptions }),
        email: this.inputHelper('input', { type: 'email', placeholder: 'Your Email' }, '', { ...vaildationOptions }),
        deliveryMethod: this.inputHelper('select', {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ],
        },
          'fastest'
        )
      }
    });
  }

  inputChangeHandler = (key, event) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };

    const updatedFormElement = {
      ...updatedOrderForm[key]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.isValid = checkValidity(updatedFormElement.value, updatedFormElement.validationRules);

    updatedOrderForm[key] = updatedFormElement;

    let isFormValid = true;
    for (let key in updatedOrderForm) {
      if (updatedOrderForm[key].validationRules && !updatedOrderForm[key].isValid) {
        isFormValid = false;
        break;
      }
    }

    this.setState({ orderForm: updatedOrderForm, isFormValid });
  }

  render() {
    let form = (
      <form action="">
        {Object.entries(this.state.orderForm).map(formElement => (
          <Input
            key={formElement[0]}
            elementType={formElement[1].elementType}
            elementConfig={formElement[1].elementConfig}
            value={formElement[1].value}
            shouldValidate={formElement[1].validationRules}
            invalid={!formElement[1].isValid}
            touched={formElement[1].touched}
            changed={this.inputChangeHandler.bind(this, formElement[0])}
          />
        ))}
        <Button btnType="Success" onclick={this.orderHandler} disabled={!this.state.isFormValid}>ORDER</Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter you Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));