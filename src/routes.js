import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import App from './components/app';

export default (
    <Route exact path="/" component={App}/>
);
