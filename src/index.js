import React from 'react';
import ReactDOM from 'react-dom';
import { createClient, Provider, defaultExchanges, subscriptionExchange } from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import App from './App';

const subscriptionClient = new SubscriptionClient('ws://react.eogresources.com/graphql', {});

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation),
    }),
  ],
});
const EOG = () => (
  <Provider value={client}>
    <App />
  </Provider>
);

ReactDOM.render(<EOG />, document.getElementById('root'));
