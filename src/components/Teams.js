import React from "react";
import * as $ from "jquery";
import history from "../history";
import { BsBoxArrowUpRight } from "react-icons/bs";
import TopNavigation from "./TopNavigation";

export default class Teams extends React.Component {
  state = {
    teams: [],
    searchApiData: [],
    filterValue: "",
  };

  componentDidMount() {
    this.getPosts();
  }

  getPosts = () => {
    const url = "http://ergast.com/api/f1/2013/constructorStandings.json";
    $.get(url, (data) => {
      this.setState({
        teams:
          data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings,
        searchApiData:
          data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings,
      });
    });
  };

  handleFilter = (searchText) => {
    if (searchText.target.value == "") {
      return this.setState({
        teams: this.state.searchApiData,
      });
    } else {
      const filterResult = this.state.searchApiData.filter((team) =>
        team.Constructor.name
          .toLowerCase()
          .includes(searchText.target.value.toLowerCase())
      );
      this.setState({
        teams: filterResult,
      });
    }
  };

  handleTeamsDetails = (id) => {
    const url = `/teamDetails/${id}`;
    history.push(url);
  };

  render() {
    return (
      <div className="driverBody">
        <TopNavigation
          filterValue={this.state.filterValue}
          handleFilter={this.handleFilter}
        />
        <h2 className="title">Constructors Championship</h2>
        <table className="content-table">
          <thead>
            <tr>
              <th scope="col" colSpan={4}>
                Constructor Championship Standing - 2013
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.teams.map((team) => {
              return (
                <tr key={team.Constructor.constructorId}>
                  <td>{team.position}</td>
                  <td
                    onClick={() =>
                      this.handleTeamsDetails(team.Constructor.constructorId)
                    }
                    className="pointer"
                  >
                    <img
                      src={
                        require(`./../img/flags/${team.Constructor.nationality}.png`)
                          .default
                      }
                      width={30}
                    />{" "}
                    {team.Constructor.name}
                  </td>
                  <td>
                    Details:{" "}
                    <a
                      className="button"
                      href={team.Constructor.url}
                      target="_blank"
                    >
                      {" "}
                      <BsBoxArrowUpRight />
                    </a>
                  </td>
                  <td>{team.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
