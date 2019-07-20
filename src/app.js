import React from 'react';

import { Provider } from './components/navigation/context';
import Router from './router';

import './app.css';

const App = () => (
  <Provider>
    <Router />
  </Provider>
);

export default App;
