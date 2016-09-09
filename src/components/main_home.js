import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router";

import IndexFooter from "./_components/index_footer";
import config from "../config";

const path = config.path;

class MainHome extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
    }

    render () {
        let {children, history} = this.props;
        let currentRouteName = this.props.location.pathname;
        console.log("Current route is " + currentRouteName);

        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to={`/${path}/`}><b>Where is my Hoca?</b></Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav stacked>
                            <Navbar.Brand>
                                <Link to={`/${path}/hocas`}>Hocas</Link>
                            </Navbar.Brand>
                        </Nav>
                        <Nav stacked>
                            <Navbar.Brand>
                                <Link to={`/${path}/departments`}>Departments</Link>
                            </Navbar.Brand>
                        </Nav>
                        <Nav stacked>
                            <Navbar.Brand>
                                <Link to={`/${path}/buildings`}>Buildings</Link>
                            </Navbar.Brand>
                        </Nav>
                        <Nav stacked>
                            <Navbar.Brand>
                                <Link to={`/${path}/classrooms`}>Classrooms</Link>
                            </Navbar.Brand>
                        </Nav>
                        <Nav stacked>
                            <Navbar.Brand>
                                <Link to={`/${path}/empty_classrooms`}>EmptyClassrooms</Link>
                            </Navbar.Brand>
                        </Nav>
                        <Nav stacked pullRight>
                            <Navbar.Brand>
                                <Link to={`/${path}/about`}><b>About</b></Link>
                            </Navbar.Brand>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className="container">
                    {currentRouteName === "/" && <h2>Where is my Hoca?</h2>}
                    {currentRouteName === "/" && <hr/>}
                    {children}
                </div>
                <br/>
                <br/>
                <IndexFooter/>
            </div>
        );
    }
}

MainHome.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};

export default MainHome;
