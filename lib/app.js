import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Root } from 'redux-react-local';
import { Router, browserHistory } from 'react-router';
import { reloadSession } from '@recipher/session-web';
import { fetch as fetchBrands } from './apps/brands/ducks/brands';
import { fetch as fetchSlots } from './apps/product/ducks/slots';
import { server } from '@recipher/io';

import createStore from './store';
import routes from './routes';
import subscriptions from './subscriptions';

const { store, history } = createStore(browserHistory)
    , socket = server(store, subscriptions)
    , root = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Root>
      <Router history={history}>
        {routes(store)}
      </Router>
    </Root>
  </Provider>
, root);

store.dispatch(reloadSession({ forceRefresh: true, redirect: true }));
store.dispatch(fetchBrands());
store.dispatch(fetchSlots());
