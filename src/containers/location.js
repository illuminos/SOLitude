import React,{Component} from 'react';
import {Dimmer,Label,Loader,Segment,Button,Divider,Input,Popup,Message} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default class Location extends Component{
    render(){
        return <div><Segment raised id="location">
            <h3>
                Get Solar Data for
            </h3>
            <Link to="/hiseas">
             <Button style={{backgroundColor: "#AB1A25", color:"#E6e6e6"}}>
                 HI-SEAS Team
             </Button></Link>
            <Divider horizontal style={{color: "#e6e6e6"}}>Or</Divider>
            <Button style={{backgroundColor: "#AB1A25", color:"#E6e6e6"}}>
                Your Location
            </Button>
        </Segment>
        </div>;
    }
}
