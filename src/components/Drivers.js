import React from "react";
import * as $ from "jquery"

export default class Drivers extends React.Component {

    state = {
        drivers :[]
        
    }
    
    componentDidMount(){
        this.getDrivers()
    }

    getDrivers = () => {
        const url = "http://ergast.com/api/f1/2013/driverStandings.json"
        $.get(url, (data)=>{
            // console.log("data", data)s
            this.setState({
                drivers: data.MRData.StandingsTable.StandingsLists[0].DriverStandings               
            })          
        })
    }

    render(){
        console.log("state", this.state.drivers)
        return(
            <div>                
                <table border={1}>
                    <thead>
                        <tr>
                            <th colSpan={4}> Drivers Championship Standings - 2013</th>
                        </tr>
                    </thead>

                    <tbody >
                        {this.state.drivers.map(driver => 
                            <tr key={driver.Driver.driverId}>
                                <td>{driver.position}</td>
                                <td>{driver.Driver.givenName} {driver.Driver.familyName}</td>
                                <td>{driver.Constructors[0].name}</td>
                                <td>{driver.points}</td>
                            </tr>
                            )}
                    </tbody>
                    
                </table>              
            </div>
            )
        }
    }
    
    