import React, {PropTypes} from "react";
import {Button, FormControl, FormGroup, ControlLabel, HelpBlock, Col, Glyphicon, Modal, Panel, Row, Table} from "react-bootstrap";
import {Link} from "react-router";
import scheduleService from "../schedule_service"

class ProfessorsList extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            professors : [],
            searchInput: '',
            "sort": "Sort Ascending",
            "sorted": false,
            "isDirty": false
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

    getSuggestions(searchInput) {
        let {professors = []} = this.state;

        const escapedValue = this.escapeRegexCharacters(searchInput.trim());
        const regex = new RegExp(escapedValue, 'i');

        let filteredProfessors = professors.filter(professor => regex.test(professor));
        this.setState({filteredProfessors});
    }

    handleChange(e) {
        let searchInput = e.target.value

        // Update state.
        this.setState({searchInput})

        // Get suggestions based on the search.
        this.getSuggestions(searchInput);
    }

    sortProfessors(){
        var trsort = function(a,b){
            return a.localeCompare(b);
        };

        let {filteredProfessors = [], sort, sorted, isDirty} = this.state;
        if(isDirty){
            if(sorted){
                this.setState({"buildings": filteredProfessors.reverse(), "sort": "Sort Ascending", "sorted": false})
            }
            else{
                this.setState({"buildings": filteredProfessors.reverse(), "sort": "Sort Descending", "sorted": true})
            }
        }
        else{
            this.setState({"buildings": filteredProfessors.sort(trsort), "sort": "Sort Descending", "sorted": true, "isDirty": true})
        }
    }

    searchProfessors() {
        return scheduleService.findProfessors()
        .then(professors => {
            this.setState({"professors": professors, "filteredProfessors": professors});
            this.sortProfessors();
        })
        .catch(searchError => this.setState({searchError}));
    }

    renderProfessor(professor) {
        return <span>
            <Col className="searchCol" xs={4}><Link to={`/professor/${professor.replace(/ /g, "_")}`}>{professor}</Link></Col>
        </span>
    }

    render() {
        let {filteredProfessors = [], sort} = this.state;

        return ( <div>

                <form>
                    <FormGroup
                        controlId="formBasicText">
                        <ControlLabel>Search for a professor</ControlLabel>
                        <Row>
                            <Col xs={12} sm={12} md={7}>
                                <FormControl
                                    type="text"
                                    value={this.state.searchInput}
                                    placeholder="e.g. Abdullah Atalar"
                                    onChange={this.handleChange.bind(this)}
                                />
                            </Col>
                            <Col xs={8} sm={8} md={3}>
                                <div className="containerSortButton">
                                    <Button className="sortButtonProf" onClick={this.sortProfessors.bind(this)}>{sort}</Button>
                                </div>
                            </Col>
                        </Row>
                        <FormControl.Feedback />
                    </FormGroup>
                </form>
                <Row>
                    <Col xs={40} sm={30} md={10}>
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
