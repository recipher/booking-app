import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bookingsSelector, fetch, cancel } from '../ducks/bookings';
import { confirmation, sendConfirmation } from '../ducks/confirmation';
import { memberSelector } from '@recipher/member-web';
import Bookings from '../components/bookings';

export class Handler extends Component {
  componentDidMount() {
    if (this.props.member) this.props.fetch(this.props.member.id);
  }

  componentDidUpdate(props) {
    if (!props.member && this.props.member) this.props.fetch(this.props.member.id);
  }

  render() {
    return <Bookings {...this.props} />
  }
}

const mapStateToProps = createStructuredSelector({
  bookings: state => bookingsSelector(state)
, confirmation: state => state.bookings.confirmation
, session: state => state.session
, member: state => memberSelector(state)
});

export default connect(mapStateToProps, { fetch, cancel, sendConfirmation })(Handler);
