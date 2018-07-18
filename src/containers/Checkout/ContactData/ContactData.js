import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: null,
    loading: false,
    isFormValid: false
  }

  constructor(props) {
    debugger
    super(props);
    console.log("[ContactData.js] Inside constructor()");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[ContactData.js] Inside shouldComponentUpdate()");
    debugger
    return true;
  }

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};

    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData
    };

    axios.post('/order.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      }).catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });
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
    console.log("[ContactData.js] Inside componentWillMount()");
    debugger

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
          ]
        })
      }
    });

    debugger
  }

  checkValidity = (value, rules) => {
    let isValid = false;

    value = value.trim();

    if (rules.isRequired) {
      isValid = value !== '';
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
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
    updatedFormElement.isValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validationRules);

    updatedOrderForm[key] = updatedFormElement;

    let isFormValid = true;
    for (let key in updatedOrderForm) {
      if (updatedOrderForm[key].validationRules && !this.state.orderForm[key].isValid) {
        isFormValid = false;
        break;
      }
    }

    this.setState({ orderForm: updatedOrderForm, isFormValid });
  }

  render() {
    console.log("[ContactData.js] Inside Render");
    debugger
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

    if (this.state.loading) {
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

export default ContactData;