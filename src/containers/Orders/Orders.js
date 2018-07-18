import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: null,
    loading: true
  }

  componentDidMount() {
    axios.get('/order.json')
      .then(response => {
        const fetchOrders = [];
        for (let key in response.data) {
          fetchOrders.push({
            ...response.data[key],
            id: key
          });
        }
        this.setState({ loading: false, orders: fetchOrders });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  }

  render() {

    return (
      <div>
        { 
          this.state.orders ?
          this.state.orders.map(order => {
            return <Order
              key={order.id}
              ingredients={order.ingredients}
              price={+order.price}
            />;
          }) : <Spinner />
        }
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);