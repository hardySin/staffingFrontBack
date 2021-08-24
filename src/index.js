import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './Store/index';
import{ Provider } from 'react-redux';
 import SocketHelper from './userPanel/helper/SocketHelper';
import SocketContext from './userPanel/helper/socketProvider';

 // here provider store present against all  child of app.js
ReactDOM.render(
  <React.StrictMode>
    
        <Provider store={store}>  
      <SocketContext.Provider  value={SocketHelper.getSocket()}> 
    <App/>
    </SocketContext.Provider>
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
