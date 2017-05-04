import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'; // ES6 
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';


import reducers from './reducers';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import App from './components/app';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
import data from '../data/appliances.json';

const initialState = {
    location: {
        isLoading: false
    },
    data: data.reverse()
};

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers,initialState)}>
        <App/>
    </Provider>
, document.getElementById('root'));