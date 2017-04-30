import React,{Component} from 'react';
import {Dimmer,Loader,Segment,Button,Divider,Input} from 'semantic-ui-react';
import {bindActionCreators} from 'redux';
import {fetchInsolation, fetchLocation} from '../actions/index';
import {connect} from 'react-redux';

class Location extends Component{
    constructor(props){
        super(props);
        this.showPosition = this.showPosition.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.getInsolation = this.getInsolation.bind(this);
        this.onLatitudeChange = this.onLatitudeChange.bind(this);
        this.onLongitudeChange = this.onLongitudeChange.bind(this);
        this.state = {position: null, gettingLocation: false,latitude:'',longitude:''}
    }

    getLocation(){
        this.props.fetchLocation();
    }

    getInsolation(){
        this.props.fetchInsolation(this.state.latitude,this.state.longitude);
    }

    showPosition(){
        // this.getPosition();
        this.setState({gettingLocation: true});
    }

    onLatitudeChange(event){
        this.setState({latitude: event.target.value})
    }

    onLongitudeChange(event){
        this.setState({longitude: event.target.value})
    }



    render(){
        return <Segment raised id="location">
            {(this.state.position === null)? null : <Dimmer inverted active><Loader/></Dimmer>}
            <Button onClick={this.getPosition} style={{backgroundColor: "#AB1A25", color:"#E6e6e6"}}>
                Get Current Location Automatically
            </Button>
            <Divider horizontal style={{color:"#e6e6e6"}}>Or</Divider>
            <h3>Enter your latitude and longitude</h3>
            <Input label="Latitude" placeholder='Enter latitude here...' value={this.state.latitude} onChange={this.onLatitudeChange} style={{width:"80%",marginBottom:"10px",fontFamily:"Lato"}}/>
            <Input label="Longitude" placeholder='Enter longitude here...' value={this.state.longitude} onChange={this.onLongitudeChange} style={{width:"80%",fontFamily:"Lato",marginBottom:"10px"}}/>
            <Button onClick={this.getInsolation} style={{backgroundColor: "#AB1A25", color:"#E6e6e6"}}>
                Get Entered Location
            </Button>
        </Segment>;
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchInsolation,fetchLocation}, dispatch);
}

export default connect(null, mapDispatchToProps)(Location);
