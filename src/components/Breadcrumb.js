import React from "react";
import { Link } from "react-router-dom";


export default class Breadcrumb extends React.Component {
    render() {
        return (
            <nav className="top-nav">
                <ul className="breadcrumb">
                    <Link to="/">Home</Link>
                    {this.props.breadcrumb.map((crumb, i) => {
                        return (
                            <li key={i}>
                                <Link to={crumb.url}>/{crumb.title}</Link>
                            </li>
                        );
                    })
                    }
                </ul>
            </nav>
        );
    };
}