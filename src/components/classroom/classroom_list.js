import React, {PropTypes} from "react";
import {Button, FormControl, FormGroup, ControlLabel, Col, Row, Table} from "react-bootstrap";
import {Link} from "react-router";
import scheduleService from "../department_service";
import Loader from "react-loader";

/*
    List of all classrooms.
 */

class ClassroomList extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);

        // No search input initially.
        // "sort" will toggle betweeen "Sort Ascending" and "Sort Descending".
        // "sorted" will toggle between true and false.
        // "isDirty" will be set to true once buttom is clicked to sort.
        this.state = {
            "classrooms": [],
            searchInput: '',
            loaded: false,
            "sort": "Sort Ascending",
            "sorted": false,
            "isDirty": false
        };
    }

    // Retrieve and sort the classrooms.
    componentWillMount() {
        let {searchParams, orderParams, pager} = this.state;
        this.searchClassrooms(searchParams, orderParams, pager).then(() => {
            this.setState({loaded: true});
        });
    }

    // Credits go to react-auto-suggest, which is no longer a dependency in this project :(.
    escapeRegexCharacters(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Filter the classrooms based on the search input.
    getSuggestions(searchInput) {
        let {classrooms = []} = this.state;

        const escapedValue = this.escapeRegexCharacters(searchInput.trim());
        const regex = new RegExp(escapedValue, 'i');

        let filteredClassrooms = classrooms.filter(classroom => regex.test(classroom.replace('-', '')) || regex.test(classroom));
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

    // It all makes sense now.
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

    // Links to classrooms' own pages with weekly schedules on them.
    renderBuilding(classroom, index) {
        // There are some courses without classroom information, so check if the string is not blank.
        if(classroom.length > 0){
            return <span>
                <Col xs={3} className="searchCol"><Link to={`/classroom/${classroom}`}>{classroom}</Link></Col>
            </span>
        }
    }

    render() {
        let {filteredClassrooms = [], sort, sorted, isDirty, loaded} = this.state;

        return <div>
            <form>
                <FormGroup
                    controlId="formBasicText">
                    <ControlLabel>Search for a classroom</ControlLabel>
                    <Row>
                        <Col xs={12} sm={12} md={7}>
                            <FormControl
                                type="text"
                                value={this.state.searchInput}
                                onSubmit={event => event.preventDefault()}
                                placeholder="e.g. EB-201 (Yes. This is the year 2016. And I will have two classes at EB-201 next semester."
                                onChange={this.handleChange.bind(this)}/>
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
                            <Loader loaded={loaded}>
                                {filteredClassrooms.map(this.renderBuilding.bind(this))}
                            </Loader>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>;
    }
}

ClassroomList.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};


export default ClassroomList;
