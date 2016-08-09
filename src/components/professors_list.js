import React, {PropTypes} from "react";
import {Button, FormControl, FormGroup, ControlLabel, HelpBlock, Col, Glyphicon, Modal, Panel, Row, Table} from "react-bootstrap";
import {Link} from "react-router";
import scheduleService from "./department_service"

class ProfessorsList extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            professors : [],
            searchInput: ''
        };
    }

    componentWillMount() {
        let {searchParams, orderParams, pager} = this.state;
        this.searchProfessors(searchParams, orderParams, pager).then(() => this.setState({isLoaded: true}));
    }

    // Credits go to react-auto-suggest
    escapeRegexCharacters(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    getSuggestions() {
        let {professors = []} = this.state;

        let {searchInput} = this.state;

        const escapedValue = this.escapeRegexCharacters(searchInput.trim());
        const regex = new RegExp(escapedValue, 'i');

        let filteredProfessors = professors.filter(professor => regex.test(professor));
        this.setState({filteredProfessors});
    }

    handleChange(e) {
        this.setState({ searchInput: e.target.value });
        this.getSuggestions();
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
        let {filteredProfessors = []} = this.state;

        return ( <div>
                <form>
                    <FormGroup
                        controlId="formBasicText">
                        <ControlLabel>Search for a professor</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.searchInput}
                            placeholder="e.g. Abdullah Atalar"
                            onChange={this.handleChange.bind(this)}
                        />
                        <FormControl.Feedback />
                    </FormGroup>
                </form>
                <Row>
                    <Col xs={20} sm={20} md={6}>
                        <Table>
                            <thead>
                            <tr>
                                <th>Professor</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredProfessors.map(this.renderProfessor.bind(this))}
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
