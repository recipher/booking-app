import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { brandsSelector } from '../ducks/brands';
import Brands from '../components/brands';

const mapStateToProps = createStructuredSelector({
  brands: brandsSelector
, session: state => state.session
});

export default connect(mapStateToProps)(Brands);
