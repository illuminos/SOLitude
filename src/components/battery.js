import React,{Component} from 'react';

export default class Battery extends Component{
    render(){
        return <div className="battery">
                <div className="terminal"></div>
                <div  className="capsule">
                    <div className="fill_capsule">
                    </div>
                </div>
        </div>;
    }
}
