import React, { Component } from 'react';
import Radium from 'radium';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bookingsSelector, search, reset } from '../ducks/bookings';
import Bookings from '../components/bookings/bookings';

@Radium
export class Handler extends Component {
  componentWillMount() {
    const { bookings, search } = this.props;
    if (bookings.meta.query.q == null) search(bookings.query);
  }

  render() {
    const styles={
      base: {
        margin: '0 auto'
      , width: '80%'
      , minWidth: 400
      , paddingBottom: 20
      , '@media (max-width: 639px)': {
          margin: 0
        , width: '100%'
        , minWidth: 0
        }
      }
    };

    return (
      <div style={styles.base}>
        <Bookings {...this.props} />
      </div>
    );
  }
};

const mapStateToProps = createStructuredSelector({
  bookings: bookingsSelector
, session: state => state.session
});

export default connect(mapStateToProps, { search, reset })(Handler);
