import React, {PropTypes} from "react";
import {Col, Row, Table} from "react-bootstrap";
import {Link} from "react-router";
import Loader from "react-loader";

import scheduleService from "../department_service"
import config from "../../config";

const path = config.path;

/*
    The list of all departments.
 */

class DepartmentList extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            loaded: false
        };
    }

    componentWillMount() {
        let {searchParams, orderParams, pager} = this.state;
        this.searchDepartments(searchParams, orderParams, pager).then(() => this.setState({loaded: true}));
    }

    // Retrieve all departments from the back-end service and sort the array of departments alphabetically.
    searchDepartments() {
        return scheduleService.findDistinctDepartments()
            .then(departments => {
                this.setState({"departments": departments.sort()});
            })
            .catch(searchError => this.setState({searchError}));
    }

    // Render department with a link to its own page.
    renderDepartment(department) {
        return <span>
                <Col xs={3} sm={3} className="searchCol"><Link to={`/${path}/department/${department}`}>{department}</Link></Col>
            </span>
    }

    render() {
        let {departments = [], loaded} = this.state;

        return ( <div>
            <Row>
                <Col xs={40} sm={40} md={12}>
                    <Table>
                        <thead>
                            <tr>
                                <th>Departments</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Loader loaded={loaded}>
                                {departments.map(this.renderDepartment.bind(this))}
                            </Loader>
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
