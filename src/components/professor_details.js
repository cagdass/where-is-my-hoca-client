import React, {PropTypes} from "react";
import {Button, Col, Glyphicon, Panel, Row, Table, Grid} from "react-bootstrap";
import departmentService from "./department_service.js";

class ProfessorDetails extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);
        this.state = {};
    }

    componentWillMount() {
        console.log(this.props.params)
        departmentService.professorDetails(this.props.params.id).then(classes => {this.setState({classes});})
        .catch(error => this.setState({error: error}))
        .then(() => this.setState({isLoaded: true}));
    }

    componentWillReceiveProps() {
        console.log(this.props.params)
        departmentService.professorDetails(this.props.params.id).then(classes => {this.setState({classes});})
        .catch(error => this.setState({error: error}))
        .then(() => this.setState({isLoaded: true}));
    }

    renderClass(clase, index) {
        return <tr key={index}>
            <td>{clase.title}</td>
            <td>{clase.departmentCode + clase.courseCode + "-" + clase.section}</td>
            <td>{clase.instructor}</td>
        </tr>
    }

    formatSchedule(classes) {
        var schedule = [[{}, {}, {}, {}, {}, {}, {}, {}], [{}, {}, {}, {}, {}, {}, {}, {}], [{}, {}, {}, {}, {}, {}, {}, {}], [{}, {}, {}, {}, {}, {}, {}, {}], [{}, {}, {}, {}, {}, {}, {}, {}]]

        for (var i = 0; i < classes.length; i++) {
            console.log("Printing lectures")
            console.log(classes[i].lectures);
        }

        return schedule;
    }


    renderSchedule(){
        let {classes = []} = this.state;
        console.log(classes);

        let schedule = this.formatSchedule(classes);

        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}>Monday</Col>
                    <Col xs={3} md={2}>Tuesday</Col>
                    <Col xs={3} md={2}>Wednesday</Col>
                    <Col xs={3} md={2}>Thursday</Col>
                    <Col xs={3} md={2}>Friday</Col>
                </Row>
                <br/>
                <Row className="show-grid">
                    <Col xs={3} md={2}>08.40-09.30</Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                </Row>
                <br/>
                <Row className="show-grid">
                    <Col xs={3} md={2}>09.40-10.30</Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                </Row>
                <br/>
                <Row className="show-grid">
                    <Col xs={3} md={2}>10.40-11.30</Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                </Row>
                <br/>
                <Row className="show-grid">
                    <Col xs={3} md={2}>11.40-12.30</Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                </Row>
                <br/>
                <Row className="show-grid">
                    <Col xs={3} md={2}>Marmara tiem :(</Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                </Row>
                <br/>
                <Row className="show-grid">
                    <Col xs={3} md={2}>13.40-14.30</Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                </Row>
                <br/>
                <Row className="show-grid">
                    <Col xs={3} md={2}>14.40-15.30</Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                </Row>
                <br/>
                <Row className="show-grid">
                    <Col xs={3} md={2}>15.40-16.30</Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                </Row>
                <br/>
                <Row className="show-grid">
                    <Col xs={3} md={2}>16.40-17.30</Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                    <Col xs={3} md={2}></Col>
                </Row>
            </Grid>
        );
    }

    render() {
        let {classes = []} = this.state;
        return (<div>
            <h2>Search results for {this.props.params.id}:</h2>
            <Table striped condensed hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Course</th>
                        <th>Professor</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map(this.renderClass.bind(this))}
                </tbody>
            </Table>
            <div>{this.renderSchedule()}</div>
        </div>);
    }
}

ProfessorDetails.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};


export default ProfessorDetails;
