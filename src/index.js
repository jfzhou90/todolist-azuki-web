import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';
import './styles/index.scss';
import App from './components/App';

const store = configureStore();

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
