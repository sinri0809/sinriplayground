import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import './style/index.scss';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import { Provider } from 'react-redux';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      {/* <Provider user = {user}>
      </Provider> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// PWA  https://cra.link/PWA
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
