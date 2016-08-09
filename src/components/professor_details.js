import React, {PropTypes} from "react";
import {Button, Col, Glyphicon, Panel, Row, Table} from "react-bootstrap";
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
            <td></td>
            <td>{clase.title}</td>
            <td>{clase.departmentCode + clase.courseCode + "-" + clase.section}</td>
            <td>{clase.instructor}</td>
        </tr>
    }

    render() {
        let {classes = []} = this.state;
        return (<div>
            <h2>Search results for {this.props.params.id}:</h2>
            <Row>
            <Col xs={12} sm={12} md={6}>
            <Table>
            <thead>
            <tr>
            <th>Lectures</th>
            <th>Title</th>
            <th>Course</th>
            <th>Professor</th>
            </tr>
            </thead>
            <tbody>
            {classes.map(this.renderClass.bind(this))}
    </tbody>
        </Table>

        </Col>
        </Row></div>);
    }
}

ProfessorDetails.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};


export default ProfessorDetails;
