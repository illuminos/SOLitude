import React, {Component} from 'react';
import {Form,Checkbox,Message,Segment, Button, Icon, Table,Input} from 'semantic-ui-react';
import DataTable from '../components/dataTable';
import {connect} from 'react-redux';
import {updateTable} from '../actions/index';
import {bindActionCreators} from 'redux';

class DataEntry extends Component{
    constructor(props){
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.state = {name:'',function:'',power:'',average_time_spent:'',average_cost:'',enabled: false};
    }

    formSubmit(e){
        e.preventDefault();
        console.log(this.state);
        this.props.updateTable(this.state);
        this.setState({name:'',function:'',power:'',average_time_spent:'',average_cost:'',enabled: false});
    }

    inputChange(e,{name,value}){
        this.setState({
            [name]: value
        });
    }

    render(){
        return <div id="middleArea">
            <Segment id="data" style={{flex:"1",backgroundColor: "rgba(107, 107, 107, 0.21)",color:"#e6e6e6"}}>
                <Form size="tiny" onSubmit={this.formSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Field control={Input} name="name" value={this.state.name} onChange={this.inputChange} placeholder='Name of item/action' />
                        <Form.Field control={Input} name="function" value={this.state.function} onChange={this.inputChange} placeholder='Function' />
                        <Form.Field control={Input} name="power" value={this.state.power} onChange={this.inputChange} placeholder='Power in watts' />
                        <Form.Field control={Input} name="average_time_spent" value={this.state.average_time_spent} onChange={this.inputChange} placeholder='Avg time spent in hours' />
                        <Form.Field control={Input} name="average_cost" value={this.state.average_cost} onChange={this.inputChange} placeholder='Avg cost' />
                        <Form.Button size="tiny" control={Button}>Add to list</Form.Button>
                    </Form.Group>
                </Form>
            <DataTable/>
        </Segment>
            <Message>Your <span className="highlight">72</span> foot solar panels will produce approximately <span className="highlight">{this.props.capacity}</span> watts today. That is enough to power <span className="highlight">{Math.floor(this.props.capacity/6.55)}</span> iPhones!</Message>
            </div>;

    }
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({updateTable}, dispatch);
}

export default connect(null, mapDispatchToProps)(DataEntry);


