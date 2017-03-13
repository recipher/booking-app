import React from 'react';
import { Route } from 'react-router';
import { handlers } from '@recipher/signup-web';
import { Wrapper } from '../../components';

export default <Route path='signup' component={Wrapper(handlers.SignUp)} />;
