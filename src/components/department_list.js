import React, {PropTypes} from "react";
import {Button, FormControl, FormGroup, ControlLabel, HelpBlock, Col, Glyphicon, Modal, Panel, Row, Table} from "react-bootstrap";
import {Link} from "react-router";
import scheduleService from "./department_service"

class DepartmentList extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);
        this.state = {};
    }

    componentWillMount() {
        let {searchParams, orderParams, pager} = this.state;
        this.searchDepartments(searchParams, orderParams, pager).then(() => this.setState({isLoaded: true}));
    }

    searchDepartments() {
        return scheduleService.findDistinctDepartments()
            .then(departments => {
                this.setState({departments})
            })
            .catch(searchError => this.setState({searchError}));
    }

    renderDepartment(department) {
        return <tr key={department}>
            <td><Link to={`/department/${department}`}>Details</Link></td>
            <td>{department}</td>
        </tr>
    }

    render() {
        let {departments = []} = this.state;
        return ( <div>
            <Row>
              <Col xs={20} sm={20} md={6}>
                  <Table>
                      <thead>
                      <tr>
                          <th>Details</th>
                          <th>Department</th>
                      </tr>
                      </thead>
                      <tbody>
                      {departments.map(this.renderDepartment.bind(this))}
                      </tbody>
                  </Table>
              </Col>
            </Row>
          </div>
       );
    }
}

DepartmentList.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};


export default DepartmentList;
