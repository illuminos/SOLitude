import React,{Component} from 'react';
import {Dimmer,Loader,Segment,Button,Divider,Input,Popup,Message} from 'semantic-ui-react';
import {bindActionCreators} from 'redux';
import {fetchInsolation, fetchLocation,startLoader} from '../actions/index';
import {connect} from 'react-redux';

class Location extends Component{
    constructor(props){
        super(props);
        this.getLocation = this.getLocation.bind(this);
        this.getInsolation = this.getInsolation.bind(this);
        this.onLatitudeChange = this.onLatitudeChange.bind(this);
        this.onLongitudeChange = this.onLongitudeChange.bind(this);
        this.state = {location: null, latitude:'',longitude:'',emptyFields: false}
    }

    getLocation(){
        this.props.fetchLocation();
        this.props.startLoader();
    }

    getInsolation(){
        this.props.fetchInsolation(this.state.latitude,this.state.longitude);
        if(this.state.latitude === '' && this.state.longitude === ''){
            this.setState({emptyFields: true});
        }
        else{
            this.setState({emptyFields: false});
            this.props.fetchInsolation(this.state.latitude,this.state.longitude);
        }
    }

    onLatitudeChange(event){
        this.setState({latitude: event.target.value})
    }

    onLongitudeChange(event){
        this.setState({longitude: event.target.value})
    }



    render(){
        return <div><Segment raised id="location">
            {(this.props.isLoading )? <Dimmer active page blurring><Loader>Gathering Sunlight...</Loader></Dimmer> : null}
            <Button onClick={this.getLocation} style={{backgroundColor: "#AB1A25", color:"#E6e6e6"}}>
                Get Current Location Automatically
            </Button>
            <Divider horizontal style={{color:"#e6e6e6"}}>Or</Divider>
            <h3>Enter your latitude and longitude</h3>
            <Input label="Latitude" placeholder='Enter latitude here...' value={this.state.latitude}
                                   onChange={this.onLatitudeChange} style={{width:"80%",marginBottom:"10px",fontFamily:"Lato"}}/>

            <Input label="Longitude" placeholder='Enter longitude here...' value={this.state.longitude} onChange={this.onLongitudeChange} style={{width:"80%",fontFamily:"Lato",marginBottom:"10px"}}/>
            <Button onClick={this.getInsolation} style={{backgroundColor: "#AB1A25", color:"#E6e6e6"}}>
                Get Entered Location
            </Button>
        </Segment>
            {(this.state.emptyFields) ? <Message error>
                We need your location to get the solar radiation data !
            </Message> : null}
        </div>;
    }
}

function mapStateToProps(state){
    return {coords: state.location.coords, isLoading: state.location.isLoading};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchInsolation,fetchLocation,startLoader}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);
