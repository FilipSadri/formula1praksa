import React from "react";
import * as $ from "jquery";
import history from "./../history";



export default class Drivers extends React.Component {

    state = {
        drivers :[],

        driverFlags: []
        
    }
    
    componentDidMount(){
        this.getDriversInfo()
    }

    getDriversInfo = async () => {
        const driverStandingsUrl = "http://ergast.com/api/f1/2013/driverStandings.json"
        const countriesUrl = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json"
        const responseDriverStandings = await fetch(driverStandingsUrl)
        const driverStandings = await responseDriverStandings.json();
        const responseCountries = await fetch(countriesUrl);
        const countries = await responseCountries.json();
        this.setState({
            drivers: driverStandings.MRData.StandingsTable.StandingsLists[0].DriverStandings,
            driverFlags: countries
        })
    }

    // getDrivers = () => {
    //     const url = "http://ergast.com/api/f1/2013/driverStandings.json"
    //     $.get(url, (data)=>{
    //         // console.log("data", data)s
    //         this.setState({
    //             drivers: data.MRData.StandingsTable.StandingsLists[0].DriverStandings               
    //         })          
    //     })
    // }

    // getFlags = () => {
    //     const url = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json"
    //     $.get(url, (data)=>{
    //         console.log("flags", data)
    //         this.setState({
    //             driverFlags: data
    //         })
    //     })
    // }

    handleClickDetails = (id) => {
        const url = `/driverDetails/${id}`
        history.push(url);
    }



    render(){
        // console.log("zastave", this.state.driverFlags)
        return(
            <div>                
                <table border={1}>
                    <thead>
                        <tr>
                            <th colSpan={4}> Drivers Championship Standings - 2013</th>
                        </tr>
                    </thead>

                    <tbody>
                        
                        {this.state.drivers.map(driver => 
                             <tr key={driver.Driver.driverId}  onClick={()=> this.handleClickDetails(driver.Driver.driverId)}>
                                <td>{driver.position}</td>
                                
                                <td> <img src={require(`./../img/flags/${driver.Driver.nationality}.png`).default} /> {driver.Driver.givenName} {driver.Driver.familyName}</td>
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
    
    