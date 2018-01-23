import React from "react";
import { Navbar, Nav, Modal, Button } from "react-bootstrap";
import { Link } from "react-router";
import IndexFooter from "./_components/index_footer";

class MainHome extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            "modalOpen": false,
        }
    }

    modalClose () {
        this.setState({
            "modalOpen": false,
        })
    }

    render() {
        let {children, history} = this.props;
        let currentRouteName = this.props.location.pathname;

        let { modalOpen } = this.state;

        let navStyle = {
            fontSize: "14px"
        };

        let semStyle = {
            fontSize: "14px"
        };

        return <div>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/"><b>Where is my Hoca?</b></Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse style={navStyle}>
                    <Nav stacked>
                        <Navbar.Brand>
                            <Link style={navStyle} to="/hocas">Hocas</Link>
                        </Navbar.Brand>
                    </Nav>
                    <Nav stacked>
                        <Navbar.Brand>
                            <Link style={navStyle} to="/departments">Departments</Link>
                        </Navbar.Brand>
                    </Nav>
                    <Nav stacked>
                        <Navbar.Brand>
                            <Link style={navStyle} to="/buildings">Buildings</Link>
                        </Navbar.Brand>
                    </Nav>
                    <Nav stacked>
                        <Navbar.Brand>
                            <Link style={navStyle} to="/classrooms">Classrooms</Link>
                        </Navbar.Brand>
                    </Nav>
                    <Nav stacked>
                        <Navbar.Brand>
                            <Link style={navStyle} to="/empty_classrooms">EmptyClassrooms</Link>
                        </Navbar.Brand>
                    </Nav>
                    <Nav stacked>
                        <Navbar.Brand>
                            <Link style={navStyle} to="/electives">Electives</Link>
                        </Navbar.Brand>
                    </Nav>
                    <Nav stacked pullRight>
                        <Navbar.Brand>
                            <Link to="/about"><b>About</b></Link>
                        </Navbar.Brand>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="container">
                {currentRouteName === "/" && <h2>Where is my Hoca? <span style={semStyle}>2018 Spring</span></h2>}
                {currentRouteName === "/" && <hr/>}
                {modalOpen &&
                    <div className="static-modal">
                    <Modal.Dialog>
                    <Modal.Header>
                    <Modal.Title>Where is my Hoca may be spreading fake news :(</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Dear people,
                        <br />
                        <br />
                        The data on Where is my Hoca is not quite up-to-date.
                        <br />
                        <br />
                        I get the schedules data from Stars website but BCC suddenly decided to add Captcha there. So be warned that some data here may be inaccurate, the data was last updated back in January and there have been changes to the schedules since then.
                        <br />
                        <br />
                        And feel free to send jerky emails to BCC.
                        <br />
                        <br />
                        Best,
                        <br />
                        Çağdaş
                    </Modal.Body>

                    <Modal.Footer>
                    <Button onClick={this.modalClose.bind(this)}>Close</Button>
                    </Modal.Footer>

                    </Modal.Dialog>
                    </div>
                }
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
