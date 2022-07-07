import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

export default class Breadcrumb extends React.Component {
  render() {
    return (
      <nav className="top-nav">
        <ul className="breadcrumb">
          <button
            className="btn"
            style={{
              backgroundColor: "gray",
              border: "none",
              marginLeft: "5px",
              marginTop: "5px",
            }}
          >
            <Link to="/">
              <AiFillHome /> F-1 Feeder
            </Link>
          </button>
          {this.props.breadcrumb.map((crumb, i) => {
            return (
              <li key={i}>
                <button
                  className="btn"
                  style={{
                    backgroundColor: "gray",
                    border: "none",
                    marginLeft: "5px",
                    marginTop: "5px",
                  }}
                >
                  <Link to={crumb.url}>{crumb.title}</Link>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}
