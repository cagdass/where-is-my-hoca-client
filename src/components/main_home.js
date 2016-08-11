import React from "react";
import {MenuItem, Navbar, Nav, NavItem, NavDropdown} from "react-bootstrap";
import {Link} from "react-router";
import IndexFooter from "./_components/index_footer";

class MainHome extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);
    }


    render() {
        let {children, history} = this.props;
        let currentRouteName = this.props.location.pathname;
        console.log("Current route is " + currentRouteName);

        return <div>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/"><b>Where is my Hoca? v0.0.11</b></Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <Navbar.Brand>
                            <Link to="/departments">Departments</Link>
                        </Navbar.Brand>
                    </Nav>
                    <Nav>
                        <Navbar.Brand>
                            <Link to="/hocas">Hocas</Link>
                        </Navbar.Brand>
                    </Nav>
                    <Nav>
                        <Navbar.Brand>
                            <Link to="/buildings">Buildings</Link>
                        </Navbar.Brand>
                    </Nav>
                    <Nav>
                        <Navbar.Brand>
                            <Link to="/classrooms">Classrooms</Link>
                        </Navbar.Brand>
                    </Nav>
                    <Nav pullRight>
                        <Navbar.Brand>
                            <Link to="/about">About</Link>
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
        </div>;
    }
}

MainHome.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
}

export default MainHome;