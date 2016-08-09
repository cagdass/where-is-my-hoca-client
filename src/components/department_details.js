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

    renderClass(clase, index) {
      return <tr key={index}>
        <td><Link to={`/professor/${clase.instructor.replace(" ", "%20")}`}>{clase.instructor}</Link></td>
        <td>{clase.title}</td>
        <td>{clase.departmentCode + clase.courseCode + "-" + clase.section}</td>
        </tr>
    }

    render() {
        let {classes = []} = this.state;
        return (<Row>
            <Col xs={12} sm={12} md={6}>
              <Table>
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
              </Table>

            </Col>
        </Row>);
    }
}

DepartmentDetails.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};


export default DepartmentDetails;
