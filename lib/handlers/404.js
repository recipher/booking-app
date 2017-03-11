import React from 'react';
import { Err } from '@recipher/icons';
import { Heading } from '@recipher/component';

export default props => {
  return (
    <div>
      <Heading style={{color: '#db2828'}}>
        <Err colour='#db2828' style={{marginTop:-4, marginRight:10}} />
        Page Not Found
      </Heading>
      <p>You have attempted to access a page that does not exist.</p>
    </div>
  );
};
