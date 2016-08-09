import React from "react";
import {MenuItem, Navbar, Nav, NavItem, NavDropdown} from "react-bootstrap";
import {Link} from "react-router";

class MainHome extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);
    }


    render() {
        let {children, history} = this.props;
        return <div>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Home</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <Navbar.Brand>
                            <Link to="/departments">Departments</Link>
                        </Navbar.Brand>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="container">
                {children}
            </div>
        </div>;
    }
}

export default MainHome;
