import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import axios from 'axios';
import {Provider} from "react-redux";
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));

axios.defaults.baseURL="https://ticketbookingbackend.onrender.com/"
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

