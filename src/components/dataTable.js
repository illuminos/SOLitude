import React, {Component} from 'react';
import { Button, Checkbox, Icon, Table } from 'semantic-ui-react'
import {Scrollbars} from 'react-custom-scrollbars';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toggleDevice} from '../actions/index';
import _ from 'lodash';

class DataTable extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {data: this.props.data};
    }

    toggle(){
        this.props.toggleDevice(arguments[0]);
    }

    render(){
        return <Scrollbars>
            <Table compact celled definition striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell style={{backgroundColor: "#F9FAFB",color:"#222",fontWeight:"bold"}}>Turn On</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Function</Table.HeaderCell>
                    <Table.HeaderCell>Power (watts)</Table.HeaderCell>
                    <Table.HeaderCell>Average Time Spent (hours)</Table.HeaderCell>
                    <Table.HeaderCell>Average Cost ($)</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {this.props.data.map((item,id)=>{
                return <Table.Row key={item.id}>
                <Table.Cell>
                <Checkbox toggle onChange={this.toggle.bind(this,id)} checked={this.props.data[id].enabled}/>
                </Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.function}</Table.Cell>
                <Table.Cell>{item.power}</Table.Cell>
                <Table.Cell>{item.average_time_spent}</Table.Cell>
                    <Table.Cell>{item.average_cost}</Table.Cell>
                </Table.Row>
            })}
            </Table.Body>
        </Table>
        </Scrollbars>;
    }
}

function mapStateToProps(state){
    return {data: state.data};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({toggleDevice}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
