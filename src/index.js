import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';
import './styles/index.scss';
import Entry from './components/Entry';

const store = configureStore();

render(
  <Provider store={store}>
    <BrowserRouter>
      <Entry />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
