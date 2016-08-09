import React, {PropTypes} from "react";
import {Button, Col, Glyphicon, Panel, Row, Table} from "react-bootstrap";
import {Link} from "react-router";
import departmentService from "./department_service.js";

class DepartmentDetails extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);
        this.state = {};
    }

    componentWillMount() {
        console.log(this.props.params)
        departmentService.departmentDetails(this.props.params.id).then(classes => {this.setState({classes});})
            .catch(error => this.setState({error: error}))
            .then(() => this.setState({isLoaded: true}));
    }

    renderInstructor(instructor){
        return <div><Link to={`/professor/${instructor.replace(/ /g, "_")}`}>{instructor}</Link>
            <br/></div>
    }

    renderClass(clase, index) {
      return <tr key={index}>
        <td>{clase.instructor.map(this.renderInstructor.bind(this))}</td>
        <td>{clase.title}</td>
        <td>{clase.departmentCode + clase.courseCode + "-" + clase.section}</td>
        </tr>
    }

    render() {
        let {classes = []} = this.state;
        return (<Table striped condensed hover>
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
              </Table>);
    }
}

DepartmentDetails.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};


export default DepartmentDetails;
