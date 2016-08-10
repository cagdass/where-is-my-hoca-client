import React, {PropTypes} from "react";
import {Button, FormControl, FormGroup, ControlLabel, HelpBlock, Col, Glyphicon, Modal, Panel, Row, Table} from "react-bootstrap";
import {Link} from "react-router";
import scheduleService from "../schedule_service"

class ClassroomList extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            "classrooms": [],
            searchInput: '',
            "sort": "Sort Ascending",
            "sorted": false,
            "isDirty": false
        };
    }

    componentWillMount() {
        let {searchParams, orderParams, pager} = this.state;
        this.searchClassrooms(searchParams, orderParams, pager).then(() => {
            this.setState({isLoaded: true});
            this.sortClassrooms();
        });
    }

    // Credits go to react-auto-suggest
    escapeRegexCharacters(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    getSuggestions(searchInput) {
        let {classrooms = []} = this.state;

        const escapedValue = this.escapeRegexCharacters(searchInput.trim());
        const regex = new RegExp(escapedValue, 'i');

        let filteredClassrooms = classrooms.filter(classroom => regex.test(classroom));
        this.setState({filteredClassrooms});
    }

    handleChange(e) {
        let searchInput = e.target.value

        // Update state.
        this.setState({searchInput})

        // Get suggestions based on the search.
        this.getSuggestions(searchInput);
    }

    searchClassrooms() {
        return scheduleService.findDistinctClassrooms()
            .then(classrooms => {
                this.setState({"classrooms": classrooms, "filteredClassrooms": classrooms});
                this.sortClassrooms();
            })
            .catch(searchError => this.setState({searchError}));
    }

    sortClassrooms(){
        let {filteredClassrooms = [], sort, sorted, isDirty} = this.state;
        if(isDirty){
            if(sorted){
                this.setState({"filteredClassrooms": filteredClassrooms.reverse(), "sort": "Sort Ascending", "sorted": false})
            }
            else{
                this.setState({"filteredClassrooms": filteredClassrooms.reverse(), "sort": "Sort Descending", "sorted": true})
            }
        }
        else{
            this.setState({"filteredClassrooms": filteredClassrooms.sort(), "sort": "Sort Descending", "sorted": true, "isDirty": true})
        }
    }

    renderBuilding(classroom, index) {
        if(classroom.length > 0){
            return <span>
                <Col xs={3} className="searchCol"><Link to={`/classroom/${classroom}`}>{classroom}</Link></Col>
            </span>
        }
    }

    render() {
        let {filteredClassrooms = [], sort, sorted, isDirty} = this.state;

        return ( <div>
                <form>
                    <FormGroup
                        controlId="formBasicText">
                        <ControlLabel>Search for a classroom</ControlLabel>
                        <Row>
                            <Col xs={12} sm={12} md={7}>
                                <FormControl
                                    type="text"
                                    value={this.state.searchInput}
                                    placeholder="e.g. EB-201 (Yes. This is the year 2016. And I will have two classes at EB-201 next semester."
                                    onChange={this.handleChange.bind(this)}
                                />
                            </Col>
                            <Col xs={8} sm={8} md={3}>
                                <div className="containerSortButton">
                                    <Button className="sortButtonProf" onClick={this.sortClassrooms.bind(this)}>{sort}</Button>
                                </div>
                            </Col>
                        </Row>
                        <FormControl.Feedback />
                    </FormGroup>
                </form>
                <Row>
                    <Col xs={25} sm={25} md={8}>
                        <Table>
                            <thead>
                            <tr>
                                <th>Classrooms</th>

                            </tr>
                            </thead>
                            <tbody>
                            {filteredClassrooms.map(this.renderBuilding.bind(this))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        );
    }
}

ClassroomList.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};


export default ClassroomList;
