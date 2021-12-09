import React from 'react';
import { Router } from 'react-router-dom';
import { render } from 'react-dom';

import { history } from './_helpers';
import { accountService } from './_services';
import { App } from './app';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import config from 'config';

import './styles.less';


// setup fake backend
//import { configureFakeBackend } from './_helpers';
//configureFakeBackend();

// attempt silent token refresh before startup


accountService.refreshToken().finally(startApp);

// GraphQL Initialization
const httpLink = new HttpLink({
  uri: `${config.graphqlUrlHttp}`,
});

const wsLink = new WebSocketLink({
  uri: `${config.graphqlUrlWs}`,
  options: {
    reconnect: true,
  },
});

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' && operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
const link = ApolloLink.from([terminatingLink]);
const cache = new InMemoryCache();
const client = new ApolloClient({
  link,
  cache,
});

function startApp() {
  render(
    <Router history={history}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Router>,
    document.getElementById('app')
  );
}