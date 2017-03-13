import React from 'react';
import { Route } from 'react-router';
import { handlers } from '@recipher/contact-web';
import { Wrapper } from '../../components';

export default <Route path='contact' component={Wrapper(handlers.Contact)} />;
