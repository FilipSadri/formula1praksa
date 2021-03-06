import React from "react";

export default class TopNavigation extends React.Component {
  render() {
    return (
      <input
        className="searchBar"
        placeholder="Search"
        defaultValue={this.props.filterValue}
        onChange={(e) => this.props.handleFilter(e)}
      ></input>
    );
  }
}
