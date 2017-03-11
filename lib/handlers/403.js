import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Err } from '@recipher/icons';
import { Heading } from '@recipher/component';
import { signOut } from '@recipher/session-web';

export class Denied extends Component {
  componentDidMount() {
    const { signOut, session } = this.props;

    if (session.user) signOut(session.user.id, { redirect: false });
  }

  render() {
    return (
      <div>
        <Heading style={{color: '#db2828'}}>
          <Err colour='#db2828' style={{marginTop:-4, marginRight:10}} />
          Access Denied
        </Heading>
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return { session: state.session };  
};

export default connect(mapStateToProps, { signOut })(Denied);


