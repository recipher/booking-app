import React from 'react';
import { Route } from 'react-router';
import { handlers } from '@recipher/session-web';
import { Wrapper } from '../../components';

export default [ 
  <Route path='signon' component={Wrapper(handlers.SignOn)} key='signon' />
, <Route path='forgotten' component={Wrapper(handlers.Forgotten)} key='forgotten' /> 
, <Route path='verify/:code' component={handlers.Verify} key='verify' /> 
];