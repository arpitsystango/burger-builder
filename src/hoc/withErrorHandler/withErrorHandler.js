import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axiosInstance) => {
  return class extends Component {
    state = {
      error: null
    }

    componentWillMount() {
      this.reqInterceptor = axiosInstance.interceptors.request.use(request => {
        this.setState({ error: null })
        return request
      })
      this.resInterceptor = axiosInstance.interceptors.response.use(response => {
        return response
      }, error => {
        this.setState({ error: error })
      })
    }

    componentWillUnmount() {
      axiosInstance.interceptors.request.eject(this.reqInterceptor)
      axiosInstance.interceptors.response.eject(this.resInterceptor)
    }

    errorConfirmed = () => {
      this.setState({ error: null })
    }

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} modalClosed={this.errorConfirmed}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default withErrorHandler