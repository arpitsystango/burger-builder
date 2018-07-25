import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../shared/utility';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

let vaildationOptions = {
  validationRules: { isRequired: true },
  isValid: false
};

class Auth extends Component {
  state = {
    controls: {
      email: Auth.inputHelper('input', { type: 'email', placeholder: 'Email Id' }, '', { ...vaildationOptions }),
      password: Auth.inputHelper('input', { type: 'password', placeholder: 'Password' }, '', { ...vaildationOptions, validationRules: { isRequired: true, minLength: 6 } })
    },
    isSignup: true
  }

  static inputHelper = (elementType = 'input', elementConfig, value = '', options = {}) => {
    return {
      elementType,
      elementConfig,
      value,
      touched: false,
      ...options
    };
  }

  inputChangeHandler = (key, event) => {
    const updatedControls = {
      ...this.state.controls,
      [key]: {
        ...this.state.controls[key],
        value: event.target.value,
        isValid: checkValidity(event.target.value, this.state.controls[key].validationRules),
        touched: true
      }
    };

    this.setState({ controls: updatedControls });
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
  }

  switchHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  }

  render() {
    let form = <Spinner />;

    if (!this.props.loading) {
      form = (
        <form onSubmit={this.onSubmitHandler}>
          {Object.entries(this.state.controls).map(formElement => (
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
          <Button btnType="Success">Submit</Button>
        </form>
      );
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = this.props.error.message;
    }

    return (
      <div className={classes.Auth}>
        {this.props.isAuthenticated ? <Redirect to={this.props.authRedirectPath} /> : null}
        {errorMessage}
        {form}
        <Button btnType="Danger" onclick={this.switchHandler}>Switch to {this.state.isSignup ? 'Sign In' : 'Sign Up'}</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token,
  authRedirectPath: state.auth.authRedirectPath
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));