import React, { Component } from 'react';
import find from 'lodash/collection/find';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { productsSelector, fetch } from '../ducks/products';
import { brandsSelector } from '../../brands/ducks/brands';
import Products from '../components/products';
import slugify from '../../../support/slugify';

export class Handler extends Component {
  componentDidMount() {
    this.props.fetch(this.props.brand.id);
  }

  render() {
    return <Products {...this.props} />;
  }
};

const mapStateToProps = createStructuredSelector({
  products: productsSelector
, brand: (state, props) => find(brandsSelector(state).data, brand => slugify(brand.name) == props.params.brand)
});

export default connect(mapStateToProps, { fetch })(Handler);
