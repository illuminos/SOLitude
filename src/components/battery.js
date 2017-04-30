import React,{Component} from 'react';
import {Icon} from 'semantic-ui-react';
export default class Battery extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return <div className="battery">
                <div className="terminal"></div>
                <div  className="capsule" style={{display: "flex",flexDirection: "column-reverse"}}>
                    {/*<Icon name="white sun" size="huge"/>*/}
                    <div className="fill_capsule" style={{height: this.props.percentage}}>
                    </div>
                </div>
        </div>;
    }
}
