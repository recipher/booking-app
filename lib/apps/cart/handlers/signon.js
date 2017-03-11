import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { signOn } from '@recipher/session-web';
import SignOn from '../components/signon';

export const Handler = (props) => {
  return <SignOn {...props} onSubmit={props.signOn}/>;
};

const mapStateToProps = createStructuredSelector({
  session: state => state.session
});

export default connect(mapStateToProps, { signOn })(Handler);


