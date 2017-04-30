import React, {Component} from 'react';
import {Form,Checkbox,Message,Segment, Button, Icon, Table} from 'semantic-ui-react';
import data from '../../data/appliances.json';
import DataTable from '../components/dataTable';


export default class DataEntry extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return <div style={{width: "70%"}}>
            <Segment style={{margin:"0px 20px",backgroundColor: "rgba(107, 107, 107, 0.21)",color:"#e6e6e6"}}>
            <DataTable/>
        </Segment>
            <Message>Your <span className="highlight">72</span> foot solar panels will produce approximately <span className="highlight">{this.props.capacity}</span> watts today. That is enough to power <span className="highlight">{Math.floor(this.props.capacity/6.55)}</span> iPhones!</Message>
            </div>;

    }
}


