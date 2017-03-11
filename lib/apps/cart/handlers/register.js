import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { signUp } from '@recipher/signup-web';
import Register from '../components/register';

export const Handler = props => {
  return (
    <Register {...props} onSubmit={props.signUp} />
  );
};

export default connect(state => ({ signup: state.signup }), { signUp })(Handler);
