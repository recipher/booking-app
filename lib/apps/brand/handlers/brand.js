import React from 'react';
import find from 'lodash/collection/find';
import { connect } from 'react-redux';
import { brandsSelector } from '../../brands/ducks/brands';
import Brand from '../components/brand';
import slugify from '../../../support/slugify';

const mapStateToProps = (state, props) => {
  return {
    brand: find(brandsSelector(state).data, brand => slugify(brand.name) == props.params.brand)
  }
};

export default connect(mapStateToProps)(Brand);
