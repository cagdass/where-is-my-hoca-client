import React, {PropTypes} from "react";
import {Button, FormControl, FormGroup, ControlLabel, Pagination, HelpBlock, Col, Glyphicon, Modal, Panel, Row, Table} from "react-bootstrap";
import {Link} from "react-router";
import scheduleService from "../schedule_service"
import Loader from "react-loader";

class ProfessorsList extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            professors : [],
            loaded: false,
            searchInput: '',
            "sort": "Sort Ascending",
            "sorted": false,
            "isDirty": false,
            "activePage": 1,
            "activeFilteredProfessors": [],
            "numItems": 12,
            "numProfessors": 1
        };
    }

    componentWillMount() {
        let {searchParams, orderParams, pager} = this.state;
        this.searchProfessors(searchParams, orderParams, pager)
        .then(() => this.setState({loaded: true}))
        .catch(error => {
            console.error(error);
        });
    }

    // Credits go to react-auto-suggest
    escapeRegexCharacters(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    getSuggestions(searchInput) {
        let {professors = [], numProfessors, numItems, itemsPerPage} = this.state;

        const escapedValue = this.escapeRegexCharacters(searchInput.trim());
        const regex = new RegExp(escapedValue, 'i');

        let filteredProfessors = professors.filter(professor => regex.test(professor));

        let numItemsNew = Math.floor(filteredProfessors.length / itemsPerPage) + 1;

        console.log(`Filtered professors length is ${filteredProfessors.length}`);
        console.log(`New numItems is ${numItemsNew}`);

        this.setState({
            "filteredProfessors": filteredProfessors,
            "numItems": numItemsNew,
            "activeFilteredProfessors": filteredProfessors.slice(0, Math.floor(filteredProfessors.length / numItemsNew) + 1)
        });
    }

    handleChange(e) {
        let searchInput = e.target.value;

        // Update state.
        this.setState({
            "searchInput": searchInput,
            "activePage": 1
        });

        // Get suggestions based on the search.
        this.getSuggestions(searchInput);
    }

    sortProfessors(){
        var trsort = function(a,b){
            return a.localeCompare(b);
        };

        let {filteredProfessors = [], sort, sorted, isDirty, itemsPerPage, numItems} = this.state;

        let numItemsNew = Math.floor(filteredProfessors.length / itemsPerPage) + 1;

        if(isDirty){
            if(sorted){
                this.setState({
                    "filteredProfessors": filteredProfessors.reverse(),
                    "sort": "Sort Ascending",
                    "sorted": false,
                    "numItems": numItemsNew,
                    "activeFilteredProfessors": filteredProfessors.slice(0, Math.floor(filteredProfessors.length / numItemsNew) + 1)
                })
            }
            else{
                this.setState({
                    "filteredProfessors": filteredProfessors.reverse(),
                    "sort": "Sort Descending",
                    "sorted": true,
                    "numItems": numItemsNew,
                    "activeFilteredProfessors": filteredProfessors.slice(0, Math.floor(filteredProfessors.length / numItemsNew) + 1)
                })
            }
        }
        else{
            this.setState({
                "filteredProfessors": filteredProfessors.sort(trsort),
                "sort": "Sort Descending",
                "sorted": true,
                "isDirty": true,
                "numItems": numItemsNew,
                "activeFilteredProfessors": filteredProfessors.slice(0, Math.floor(filteredProfessors.length / numItemsNew) + 1)
            })
        }
    }

    handleSelect(eventKey) {
        let {filteredProfessors = [], itemsPerPage} = this.state;
        let start = (eventKey - 1) * itemsPerPage;
        let end = start + itemsPerPage <= filteredProfessors.length ? start + itemsPerPage : filteredProfessors.length;
        let activeFilteredProfessors = filteredProfessors.slice(start, end);


        this.setState({
            activePage: eventKey,
            "activeFilteredProfessors": activeFilteredProfessors
        });
    }

    searchProfessors() {
        let {numItems} = this.state;

        return scheduleService.findProfessors()
        .then(professors => {
            this.setState({
                "professors": professors,
                "filteredProfessors": professors,
                "numProfessors": professors.length,
                "itemsPerPage": Math.floor(professors.length / numItems) + 1
            });
            this.sortProfessors();
        })
        .catch(searchError => this.setState({searchError}));
    }

    renderProfessor(professor) {
        return <span>
            <Col className="searchCol" xs={6}><Link to={`/hoca/${professor.replace(/ /g, "_")}`}>{professor}</Link></Col>
        </span>
    }

    render() {
        let {activeFilteredProfessors = [], sort, loaded, numItems} = this.state;

        return ( <div>
            <form>
                <FormGroup
                    controlId="formBasicText">
                    <ControlLabel>Search for a hoca</ControlLabel>
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
                    <Pagination
                        bsSize="medium"
                        items={numItems}
                        activePage={this.state.activePage}
                        onSelect={this.handleSelect.bind(this)} />
                </Col>
            </Row>
            <br />
            <Row>
                <Col xs={40} sm={30} md={10}>
                    <Table>
                        <thead>
                        <tr>
                            <th>Hocas</th>
                        </tr>
                        </thead>
                        <tbody>
                            <Loader loaded={loaded}>
                                {activeFilteredProfessors.map(this.renderProfessor.bind(this))}
                            </Loader>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col xs={40} sm={30} md={10}>
                    <Pagination
                        bsSize="medium"
                        items={numItems}
                        activePage={this.state.activePage}
                        onSelect={this.handleSelect.bind(this)} />
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
