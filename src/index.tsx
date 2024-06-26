import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Modal from 'react-modal'
import { IdentitySerializer, JsonSerializer, RSocketClient } from 'rsocket-core';
import RSocketWebSocketClient from 'rsocket-websocket-client';


Modal.setAppElement('#root')
const accessToken = localStorage.getItem("accessToken")
const jwtToken = {
  accessToken : accessToken,
}
const client = new ApolloClient({
  uri: "https://127.0.0.1:8080/graphql",
  headers: {
    'Authorization' : `Bearer ${jwtToken.accessToken}`,
  },
  cache: new InMemoryCache()
})
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <App/>
        </Provider>
      </ApolloProvider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
