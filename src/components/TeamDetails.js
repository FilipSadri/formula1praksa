import React from "react";
import { BsBook } from "react-icons/bs";
import CircleLoader from "react-spinners/CircleLoader";
import Breadcrumb from "./Breadcrumb";

export default class TeamDetails extends React.Component {
  state = {
    details: [],
    teams: [],
    isLoading: true,
  };

  componentDidMount() {
    this.getTeamDetails();
  }

  getTeamDetails = async () => {
    const id = this.props.match.params.constructorId;
    const constructorStandingsUrl = `http://ergast.com/api/f1/2013/constructors/${id}/constructorStandings.json`;
    const resultsUrl = `http://ergast.com/api/f1/2013/constructors/${id}/results.json`;
    const responseConstructorStandings = await fetch(constructorStandingsUrl);
    const constructorStandings = await responseConstructorStandings.json();
    const responseResults = await fetch(resultsUrl);
    const results = await responseResults.json();
    this.setState({
      details:
        constructorStandings.MRData.StandingsTable.StandingsLists[0]
          .ConstructorStandings,
      teams: results.MRData.RaceTable.Races,
      isLoading: false,
    });
  };

  setColor = (position) => {
    let color = "";
    console.log("position", position);
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
          <CircleLoader color="yellow" size={60} />
        </div>
      );
    }

    const breadcrumb = [
      {
        title: "Teams",
        url: "/teams",
      },
      {
        title: this.state.details[0].Constructor.name,
        url: "/teamDetails/:constructorId",
      },
    ];

    return (
      <div className="navDetails">
        <Breadcrumb breadcrumb={breadcrumb} />
        <div className="main res-size">
          {this.state.details.map((team) => {
            return (
              <div className="info" key={team.Constructor.constructorId}>
                <div className="About">
                  <div className="Picture">
                    <img
                      style={{ backgroundColor: "white" }}
                      src={
                        require(`./../img/teams/${team.Constructor.name}.png`)
                          .default
                      }
                    />
                  </div>
                  <div style={{ marginLeft: "10px" }}>
                    <img
                      src={
                        require(`./../img/flags/${team.Constructor.nationality}.png`)
                          .default
                      }
                    />
                    <p>{team.Constructor.name}</p>
                  </div>
                </div>
                <div>
                  <p>Country: {team.Constructor.nationality}</p>
                  <p>Position: {team.position}</p>
                  <p>Points: {team.points}</p>
                  <p>
                    History:
                    <a
                      className="button"
                      href={team.Constructor.url}
                      target="_blank"
                    >
                      <BsBook />
                    </a>
                  </p>
                </div>
              </div>
            );
          })}

          <table className="content-table details-info">
            <thead>
              <tr>
                <th scope="col" colSpan={5}>
                  Formula 1 2013 Results
                </th>
              </tr>
              <tr>
                <th>Round</th>
                <th>Grand Prix</th>
                <th>{this.state.teams[0].Results[0].Driver.familyName}</th>
                <th>{this.state.teams[0].Results[1].Driver.familyName}</th>
                <th>Points</th>
              </tr>
            </thead>

            <tbody>
              {this.state.teams.map((team) => (
                <tr key={team.round}>
                  <td className="num-b">{team.round}</td>
                  <td>
                    <img
                      src={
                        require(`./../img/flags/${team.raceName}.png`).default
                      }
                    />{" "}
                    {team.raceName}
                  </td>
                  <td
                    className="num-b num-box"
                    style={{
                      backgroundColor: this.setColor(team.Results[0].position),
                    }}
                  >
                    {team.Results[0].position}
                  </td>
                  <td
                    className="num-b"
                    style={{
                      backgroundColor: this.setColor(team.Results[1].position),
                    }}
                  >
                    {team.Results[1].position}
                  </td>
                  <td className="num-b num-box">
                    {parseInt(team.Results[0].points) +
                      parseInt(team.Results[1].points)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
