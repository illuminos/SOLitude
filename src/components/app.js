import React, {Component} from 'react';
import '../../styles/scss/main.scss';
import {Button,Icon} from 'semantic-ui-react';
import Battery from './battery';
import Solitude from './solitude_logo';
import Location from '../containers/location';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

export default class App extends Component{
    render(){
        return (
            <Router>
            <div className="container">
                <Solitude size="20%" style={{fill: "#EFE7BE"}} face="orange"/>
                <Location/>
                {/*<Battery percentage="30%"/>*/}
            </div>
            </Router>
        );
    }
}