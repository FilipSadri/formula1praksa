import React from 'react';
import * as $ from 'jquery';

export default class DriverDetails extends React.Component {


    state = {
        details: [],
        races: [],
        isLoading: true
    }

    componentDidMount() {
        this.getDriverDetails();
    }

    getDriverDetails = async () => {
        const id = this.props.match.params.driverId;
        const driverStandingsUrl = `http://ergast.com/api/f1/2013/drivers/${id}/driverStandings.json`;
        const resultsUrl = `http://ergast.com/api/f1/2013/drivers/${id}/results.json`;
        const responseDriverStandings = await fetch(driverStandingsUrl);
        const driverStandings = await responseDriverStandings.json();
        const responseResults = await fetch(resultsUrl);
        const results = await responseResults.json();
        this.setState({
            details: driverStandings.MRData.StandingsTable.StandingsLists[0].DriverStandings,
            races: results.MRData.RaceTable.Races,
            isLoading: false
        })
    }

    // getDriverDetails = () => {
    //     const id = this.props.match.params.driverId;
    //     console.log("id", this.props.match.params.driverId)
    //     const url = `http://ergast.com/api/f1/2013/drivers/${id}/driverStandings.json`;
    //     $.get(url, (data) => {
    //         // console.log("data",data)
    //         this.setState({
    //             details: data.MRData.StandingsTable.StandingsLists[0].DriverStandings
    //         })
    //     })
    // }

    // getRaceDetails = () => {
    //     const id = this.props.match.params.driverId;
    //     const url = `http://ergast.com/api/f1/2013/drivers/${id}/results.json`
    //     $.get(url, (data) => {
    //         // console.log("data", data)
    //         this.setState({
    //             races: data.MRData.RaceTable.Races
    //         })
    //     })
    // }
    // setColor = () => {
    //     let colors = "";
    //     this.state.races.map(race =>{
    //         // console.log("races", race.Results[0].position)
    //         if (race.Results[0].position == 1) {
    //             colors = `<td style={{"backgroundColor":"yellow"}}>{race.Results[0].position}</td>`;
    //         } else if (race.Results[0].position == 2){
    //             return (<td style={{"backgroundColor":"gray"}}>{race.Results[0].position}</td>)
    //         } else if (race.Results[0].position == 3){
    //             return (<td style={{"backgroundColor":"orange"}}>{race.Results[0].position}</td>)
    //         } else if (race.Results[0].position == 4){
    //             return (<td style={{"backgroundColor":"lightgreen"}}>{race.Results[0].position}</td>)
    //         } else if (race.Results[0].position == 5){
    //             return (<td style={{"backgroundColor":"lightblue"}}>{race.Results[0].position}</td>)
    //         }else if (race.Results[0].position == 6){
    //             return (<td style={{"backgroundColor":"aqua"}}>{race.Results[0].position}</td>)
    //         }else if (race.Results[0].position == 7){
    //             return (<td style={{"backgroundColor":"lightcoral"}}>{race.Results[0].position}</td>)
    //         }else if (race.Results[0].position == 8){
    //             return (<td style={{"backgroundColor":"lightcyan"}}>{race.Results[0].position}</td>)
    //         }else if (race.Results[0].position == 9){
    //             return (<td style={{"backgroundColor":"lightpink"}}>{race.Results[0].position}</td>)
    //         }else if (race.Results[0].position == 10){
    //             return (<td style={{"backgroundColor":"lightsalmon"}}>{race.Results[0].position}</td>)
    //         }
    //     })
    //     return colors;
    // }

    setColor = (position) => {
        let color = "";
        console.log("position", position)
        switch (position) {
            case "1":
                color = "yellow";
                break;
            case "2":
                color = "gray";
                break; 
            case "3":
                color = "orange";
                break; 
            case "4":
                color = "lightgreen";
                break; 
            case "5":
                color = "lightblue";
                break; 
            case "6":
                color = "aqua";
                break; 
            case "7":
                color = "red";
                break; 
            case "8":
                color = "brown";
                break; 
            case "9":
                color = "cyan";
                break; 
            case "10":
                color = "coral";
                break;
            default:
                color = "darkgrey";
                break;
        }
        return color;
    }

    render() {

        if (this.state.isLoading) {
            return <h2>Loading...</h2>
        }

        return (
            <div>
                {this.state.details.map(detail => {
                    return (
                        <div key={detail.Driver.driverId}>
                            <img src={require(`./../img/drivers/${detail.Driver.driverId}.jpg`).default} />
                            <h3>Driver details</h3>
                            <img src={require(`./../img/flags/${detail.Driver.nationality}.png`).default} />
                            <p>{detail.Driver.givenName} {detail.Driver.familyName}</p>
                            <p>{detail.Driver.dateOfBirth}</p>
                            <p>{detail.Driver.nationality}</p>
                            <p><a href={detail.Driver.url} target="_blank">Biography</a></p>
                        </div>
                    )
                })}

                <table border={1}>
                    <thead>
                        <tr>
                            <th colSpan={5}> Formula 1 2013 Results</th>
                        </tr>
                        <tr>
                            <th>Round</th>
                            <th>Grand Prix</th>
                            <th>Team</th>
                            <th>Grid</th>
                            <th>Race</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.races.map(race =>
                            <tr key={race.round}>
                                <td>{race.round}</td>
                                <td> <img src={require(`./../img/flags/${race.raceName}.png`).default} /> {race.raceName}</td>
                                <td>{race.Results[0].Constructor.name}</td>
                                <td>{race.Results[0].grid}</td>
                                <td style={{ "backgroundColor": this.setColor(race.Results[0].position) }}>{race.Results[0].position}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}