import React from "react";
import CircleLoader from "react-spinners/CircleLoader";

export default class RaceResults extends React.Component {
  state = {
    details: [],
    qualifyingResults: [],
    racesResults: [],
    isLoading: true,
  };

  componentDidMount() {
    this.getRaceResults();
  }

  getRaceResults = async () => {
    const id = this.props.match.params.circuitId;
    const races1Url = `http://ergast.com/api/f1/2013/${id}/results.json`;
    const qualifyngResults1Url = `http://ergast.com/api/f1/2013/${id}/qualifying.json`;
    const raceDetalis1Url = `http://ergast.com/api/f1/2013/${id}/results.json`;
    const responseRaces = await fetch(races1Url);
    const races1 = await responseRaces.json();
    const qualifyingResults1 = await fetch(qualifyngResults1Url);
    const results1 = await qualifyingResults1.json();
    const raceDetalis = await fetch(raceDetalis1Url);
    const race1 = await raceDetalis.json();

    this.setState({
      details: races1.MRData.RaceTable.Races,
      qualifyingResults: results1.MRData.RaceTable.Races[0].QualifyingResults,
      racesResults: race1.MRData.RaceTable.Races[0].Results,
      isLoading: false,
    });
  };

  setColor = (position) => {
    let color = "";
    switch (position) {
      case "25":
        color = "yellow";
        break;
      case "18":
        color = "gray";
        break;
      case "15":
        color = "orange";
        break;
      case "12":
      case "10":
      case "8":
      case "6":
      case "4":
      case "2":
      case "1":
        color = "lightgreen";
        break;
      default:
        color = "darkgrey";
        break;
    }
    return color;
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div className="loader-container">
          <CircleLoader color="yellow" size={60} />
        </div>
      );
    }
    return (
      <div style={{ width: "100%" }} className="tata">
        {this.state.details.map((race) => {
          return (
            <div
              style={{ width: "12%" }}
              className="dete1"
              key={race.Circuit.circuitId}
            >
              <h3 className="raceResults">
                <img
                  src={require(`./../img/flags/${race.raceName}.png`).default}
                />
                {race.raceName}
              </h3>
              <p>Country: {race.Circuit.Location.country}</p>
              <p>Location: {race.Circuit.Location.locality}</p>
              <p>Date: {race.date}</p>
            </div>
          );
        })}

        <table style={{ width: "44%" }} className="content-table">
          <thead>
            <tr>
              <th scope="col" colSpan={4}>
                Qualifying Results
              </th>
            </tr>
            <tr>
              <th scope="col">Pos</th>
              <th scope="col">Driver</th>
              <th scope="col">Team</th>
              <th scope="col">Best Time</th>
            </tr>
          </thead>
          <tbody>
            {this.state.qualifyingResults.map((race) => {
              let times = [];
              times.push(race.Q1);
              times.push(race.Q2);
              times.push(race.Q3);
              times.sort();

              return (
                <tr key={race.position}>
                  <td>{race.position}</td>
                  <td>
                    <img
                      src={
                        require(`./../img/flags/${race.Driver.nationality}.png`)
                          .default
                      }
                    />
                    {race.Driver.familyName}
                  </td>
                  <td>{race.Constructor.name}</td>
                  <td>{times[0]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <table style={{ width: "44%" }} className="content-table">
          <thead>
            <tr>
              <th scope="col" colSpan={5}>
                Race results
              </th>
            </tr>
            <tr>
              <th scope="col">Pos</th>
              <th scope="col">Driver</th>
              <th scope="col">Team</th>
              <th scope="col">Result</th>
              <th scope="col">Points</th>
            </tr>
          </thead>
          <tbody>
            {this.state.racesResults.map((race) => {
              return (
                <tr key={race.position}>
                  <td>{race.position}</td>
                  <td>
                    <img
                      src={
                        require(`./../img/flags/${race.Driver.nationality}.png`)
                          .default
                      }
                    />
                    {race.Driver.familyName}
                  </td>
                  <td>{race.Constructor.name}</td>
                  <td>{race?.Time?.time}</td>
                  <td style={{ backgroundColor: this.setColor(race.points) }}>
                    {race.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
