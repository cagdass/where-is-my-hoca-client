import React, {PropTypes} from "react";
import {Button, FormControl, FormGroup, ControlLabel, HelpBlock, Col, Glyphicon, Modal, Panel, Row, Table} from "react-bootstrap";
import {Link} from "react-router";
import scheduleService from "./department_service"

class ProfessorsList extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);
        this.state = {};
    }

    componentWillMount() {
        let {searchParams, orderParams, pager} = this.state;
        this.searchProfessors(searchParams, orderParams, pager).then(() => this.setState({isLoaded: true}));
    }

    searchProfessors() {
        return scheduleService.findProfessors()
        .then(professors => {
            this.setState({professors})
        })
        .catch(searchError => this.setState({searchError}));
    }

    renderProfessor(professor) {
        return <tr key={professor}>
            <td><Link to={`/professor/${professor.replace(" ", "%20")}`}>{professor}</Link></td>
        </tr>
    }

    render() {
        let professors = this.state.professors.sort() || [];

        return ( <div>
                <Row>
                    <Col xs={20} sm={20} md={6}>
                        <Table>
                            <thead>
                            <tr>
                                <th>Professor</th>
                            </tr>
                            </thead>
                            <tbody>
                            {professors.map(this.renderProfessor.bind(this))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        );
    }
}

ProfessorsList.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};


export default ProfessorsList;
