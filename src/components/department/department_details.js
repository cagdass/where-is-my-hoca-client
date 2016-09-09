import React, { PropTypes } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router";

import departmentService from "../department_service.js";

/*
    All classes from a department is listed.
 */

class DepartmentDetails extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            loaded: false
        };
    }

    // Retrieve classes from this department from the back-end.
    componentWillMount() {
        departmentService.departmentDetails(this.props.params.id).then(classes => {this.setState({classes});})
        .catch(error => this.setState({error: error}))
        .then(() => this.setState({loaded: true}));
    }

    // Render links to the professor.
    renderInstructor (instructor){
        return <div>
            <Link to={`/hoca/${instructor.replace(/ /g, "_")}`}>{instructor}</Link>
            <br/>
        </div>
    }

    // Display course information: Professor, course title, department, course code and section.
    renderClass (clase, index) {
      return <tr key={index}>
            <td>{clase.instructor.map(this.renderInstructor.bind(this))}</td>
            <td>{clase.title}</td>
            <td>{clase.departmentCode + clase.courseCode + "-" + clase.section}</td>
        </tr>
    }

    render() {
        let {classes = [], loaded} = this.state;

        return <Table striped condensed hover>
            <thead>
                <tr>
                    <th>Instructor</th>
                    <th>Title</th>
                    <th>Course</th>
                </tr>
            </thead>
            <tbody>
                {classes.map(this.renderClass.bind(this))}
            </tbody>
        </Table>;
    }
}

DepartmentDetails.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};

export default DepartmentDetails;
