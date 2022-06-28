import React from 'react';
import * as $ from 'jquery';


export default class DriverDetails extends React.Component {

    state = {
        details: [

        ]

        
    }

    componentDidMount (){
        //const location = window.location.href;
        //const id = location.split("/").pop();
        const id = this.props.match.params.driverId;
        console.log("id", this.props.match.params.driverId)
        const url= `http://ergast.com/api/f1/2013/drivers/${id}/driverStandings.json`;
        $.get(url, (data)=>{
            // console.log("data",data)
            this.setState({
                details: data.MRData.StandingsTable.StandingsLists[0].DriverStandings
            })
        })
    }

    render() {
        return (
            <div>  
                {this.state.details.map(detail=>{
                    return (
                    <div key={detail.Driver.driverId}>
                        <h3>Driver details:</h3>
                        <p>Full Name:{detail.Driver.givenName} {detail.Driver.familyName}</p>
                        <p>Birthday:{detail.Driver.dateOfBirth}</p>
                        <p>Country:{detail.Driver.nationality}</p>  
                    </div>
                )           
                })}             
            </div>
       );
    }
}
