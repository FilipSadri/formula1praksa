import React from "react";
import * as $ from "jquery";
import history from "./../history";
import TopNavigation from "./TopNavigation";

export default class Drivers extends React.Component {
  state = {
    drivers: [],
    searchApiData: [],
    filterValue: "",
  };

  componentDidMount() {
    this.getDriversInfo();
  }

  getDriversInfo = async () => {
    const driverStandingsUrl =
      "http://ergast.com/api/f1/2013/driverStandings.json";
    const responseDriverStandings = await fetch(driverStandingsUrl);
    const driverStandings = await responseDriverStandings.json();
    this.setState({
      drivers:
        driverStandings.MRData.StandingsTable.StandingsLists[0].DriverStandings,
      searchApiData:
        driverStandings.MRData.StandingsTable.StandingsLists[0].DriverStandings,
    });
  };

  //filter metoda
  handleFilter = (searchText) => {
    if (searchText.target.value == "") {
      return this.setState({
        drivers: this.state.searchApiData,
      });
    } else {
      const filterResult = this.state.searchApiData.filter(
        (driver) =>
          driver.Driver.givenName
            .toLowerCase()
            .includes(searchText.target.value.toLowerCase()) ||
          driver.Driver.familyName
            .toLowerCase()
            .includes(searchText.target.value.toLowerCase())
      );
      this.setState({
        drivers: filterResult,
      });
    }
  };

  handleClickDetails = (id) => {
    const url = `/driverDetails/${id}`;
    history.push(url);
  };

  render() {
    return (
      <div className="driverBody">
        <TopNavigation
          filterValue={this.state.filterValue}
          handleFilter={this.handleFilter}
        />
        <h2 className="title">Drivers Championship</h2>
        <table className="content-table">
          <thead>
            <tr>
              <th scope="col" colSpan={4}>
                {" "}
                Drivers Championship Standings - 2013
              </th>
            </tr>
          </thead>

          <tbody>
            {this.state.drivers.map((driver) => (
              <tr key={driver.Driver.driverId}>
                <td className="num-b">{driver.position}</td>
                <td
                  onClick={() =>
                    this.handleClickDetails(driver.Driver.driverId)
                  }
                  className="pointer"
                >
                  {" "}
                  <img
                    src={
                      require(`./../img/flags/${driver.Driver.nationality}.png`)
                        .default
                    }
                  />{" "}
                  {driver.Driver.givenName} {driver.Driver.familyName}
                </td>
                <td>{driver.Constructors[0].name}</td>
                <td className="num-b num-box">{driver.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
