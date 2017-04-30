import React,{Component} from 'react';
import Battery from '../components/battery';
import Solitude from '../components/solitude_logo';
import DataEntry from '../containers/data_entry';
import {Message} from 'semantic-ui-react';
import {connect} from 'react-redux';


class HISEAS extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return <div id="hiseas">
            <div className="logo" style={{height: "120px"}}>
                <Solitude size="30%" style={{fill: "#EFE7BE",marginTop:"10px"}} face="orange"/>
                <h3 style={{marginTop:"-10px"}}>Location: Mauna Loa, Hawaii</h3>
            </div>
            <div id="hiseas-inner">
                <DataEntry capacity={this.props.capacity}/>
                <Battery percentage={this.props.percentage} capacity={this.props.capacity}/>
            </div>
        </div>;
    }
}


function calculatePercentage(data){
    // console.log(data);

    var month = new Date().getMonth();
    var monthlyUsage = [32674, 38431, 26635, 36533, 43745, 40990, 39758, 38213, 42306, 40652, 28629, 29480];
    var capacity = monthlyUsage[month];
    let totalConsumption = 0;
    for(var i = 0;i< data.length;i++){
        if(data[i].enabled){
            totalConsumption += (data[i].power * data[i].average_time_spent);
        }
    }
    console.log(totalConsumption);
    let finalPercentage =((capacity-totalConsumption)*100/capacity).toString();
    return [(finalPercentage>0 ? finalPercentage: "0")+'%',capacity];
}

function mapStateToProps(state){
    var data = calculatePercentage(state.data);
    console.log(data);
    return {percentage: data[0], capacity: data[1]};
}

export default connect(mapStateToProps, null)(HISEAS);