import React from "react";
import { BsBook } from "react-icons/bs";
import CircleLoader from "react-spinners/CircleLoader";

export default class DriverDetails extends React.Component {
  state = {
    details: [],
    races: [],
    isLoading: true,
  };

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
      details:
        driverStandings.MRData.StandingsTable.StandingsLists[0].DriverStandings,
      races: results.MRData.RaceTable.Races,
      isLoading: false,
    });
  };

  setColor = (position) => {
    let color = "";
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
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div className="loader-container">
          <CircleLoader color="red" size={60} />
        </div>
      );
    }

    return (
      <div style={{ width: "100%" }} className="tata">
        {this.state.details.map((detail) => {
          console.log("details", this.state.details);
          return (
            <div
              style={{ width: "12%" }}
              className="dete1"
              key={detail.Driver.driverId}
            >
              <div>
                <img
                  src={
                    require(`./../img/drivers/${detail.Driver.driverId}.jpg`)
                      .default
                  }
                />
                <div>
                  <img
                    src={
                      require(`./../img/flags/${detail.Driver.nationality}.png`)
                        .default
                    }
                  />
                  <p>
                    {detail.Driver.givenName} {detail.Driver.familyName}
                  </p>
                </div>
              </div>
              <div>
                <p>Country: {detail.Driver.nationality}</p>
                <p>Team: {detail.Constructors[0].name}</p>
                <p>Birth: {detail.Driver.dateOfBirth}</p>
                <p>
                  Biography:{" "}
                  <a
                    className="button"
                    href={detail.Driver.url}
                    target="_blank"
                  >
                    {" "}
                    <BsBook />
                  </a>
                </p>
              </div>
            </div>
          );
        })}

        <table style={{ width: "88%" }} className="content-table">
          <thead>
            <tr>
              <th scope="col" colSpan={5}>
                {" "}
                Formula 1 2013 Results
              </th>
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
            {this.state.races.map((race) => (
              <tr key={race.round}>
                <td>{race.round}</td>
                <td>
                  {" "}
                  <img
                    src={require(`./../img/flags/${race.raceName}.png`).default}
                  />{" "}
                  {race.raceName}
                </td>
                <td>{race.Results[0].Constructor.name}</td>
                <td>{race.Results[0].grid}</td>
                <td
                  style={{
                    backgroundColor: this.setColor(race.Results[0].position),
                  }}
                >
                  {race.Results[0].position}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
