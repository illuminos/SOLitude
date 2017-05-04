import React,{Component} from 'react';
import {Icon} from 'semantic-ui-react';
import {Motion, spring} from 'react-motion';

export default class Battery extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return <div className="battery">
                <Motion style={{x: spring(parseFloat(this.props.percentage))}}>
                    {
                        value => <h3 style={{color:"#e6e6e6"}}>{parseFloat(value.x).toFixed(2)} % left</h3>
                    }
                </Motion>
                <div className="terminal"></div>
                <div  className="capsule" style={{display: "flex",flexDirection: "column-reverse"}}>
                    <Icon name="sun" size="huge" style={{position:"absolute",top:"40%",right:"30%",backgroundColor:"transparent",color:"#AB1A25!important"}}/>
                    <Motion defaultStyle={{x: parseFloat(this.props.percentage)}} style={{x: spring(parseFloat(this.props.percentage),{stiffness: 80, damping: 17})}}>
                        {
                            value => <div className="fill_capsule" style={{height: `${value.x}%`}}></div>
                        }
                    </Motion>
                    {/*<div className="fill_capsule" style={{height: this.props.percentage}}>*/}
                    {/*</div>*/}
                </div>
                <Motion defaultStyle={{x: this.props.capacity}}
                        style={{x: spring(parseFloat(this.props.capacity * (this.props.percentage/100)) )}}>
                    {
                        value => <h3 style={{color:"#e6e6e6"}}>{parseFloat(value.x).toFixed(0)} Wh left</h3>
                    }
                </Motion>
        </div>;
    }
}
