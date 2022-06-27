import React from "react";
import * as $ from "jquery"

export default class Drivers extends React.Component {

    state = {
        drivers:[]
        
    }

    componentDidMount(){
        this.getDrivers()
    }

    getDrivers = () => {
        const url = "http://ergast.com/api/f1/2022/driverStandings.json"
        $.get(url, (data)=>{
            console.log("data", data)
            this.setState({
                drivers: data
            })
        })
    }

    render(){
        return(
            <div>
               {this.state.map(driver)}
            </div>
        )
    }
}
