import React, {Component} from 'react';
import '../../styles/scss/main.scss';
import {Button,Icon} from 'semantic-ui-react';
import Battery from './battery';
import Solitude from './solitude_logo';
import Location from '../containers/location';
import HISEAS from '../containers/hiseas';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

export default class App extends Component{
    render(){
        let main = function(){return <div id="main">
            <Solitude size="30%" style={{fill: "#EFE7BE"}} face="orange"/>
            <Location/>
        </div>;}
        return (
            <Router>
            <div className="container">
                <Route exact path="/" component={main}></Route>
                <Route exact path="/hiseas" component={HISEAS} />
            </div>
            </Router>
        );
    }
}