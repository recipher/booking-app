import React, { Component } from 'react';
import find from 'lodash/collection/find';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { modelsSelector, fetch as fetchModels} from '../ducks/models';
import { productsSelector, fetch as fetchProducts } from '../../brand/ducks/products';
import { fetch as fetchBookings } from '../ducks/bookings';
import { brandsSelector } from '../../brands/ducks/brands';
import { slotsSelector } from '../ducks/slots';
import { select } from '../../booking/ducks/booking';
import Product from '../components/product';
import slugify from '../../../support/slugify';

export class Handler extends Component {
  componentDidMount() {
    if (this.props.brand) this.props.fetchProducts(this.props.brand.id);
    if (this.props.product) {
      this.props.fetchModels(this.props.product.id);
      this.props.fetchBookings(this.props.product.id);
    }
  }

  componentDidUpdate(props) {
    if (!props.brand && this.props.brand) this.props.fetchProducts(this.props.brand.id);
    if (!props.product && this.props.product) {
      this.props.fetchModels(this.props.product.id); 
      this.props.fetchBookings(this.props.product.id);
    } 
  }

  handleSelect(model, slot) {
    this.props.select(model, slot);
    this.props.push('/booking');
  }

  render() {
    return <Product {...this.props} select={(model, slot) => this.handleSelect(model, slot)} />;
  }
};

const mapStateToProps = (state, props) => {
  return {
    models: modelsSelector(state)
  , slots: slotsSelector(state)
  , product: find(productsSelector(state).data, product => slugify(product.name) == props.params.product)
  , brand: find(brandsSelector(state).data, brand => slugify(brand.name) == props.params.brand)
  }
};

export default connect(mapStateToProps, { fetchModels, fetchProducts, fetchBookings, select, push })(Handler);
