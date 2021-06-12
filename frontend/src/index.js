import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';
import './i18n';
import AppRouter from './routers/AppRouter';
import reportWebVitals from './reportWebVitals';

import {getCurrentUser} from "./redux/service";
import {login} from "./redux/userSlice";
import {setPageLoading} from "./redux/commonSlice";

store.dispatch(setPageLoading(true));
getCurrentUser().then((respond) => {
  store.dispatch(login(respond.data));
  store.dispatch(setPageLoading(false));
}).catch(() => {
  store.dispatch(setPageLoading(false));
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
