import React, {PropTypes} from "react";
import {Button, FormControl, FormGroup, ControlLabel, Col, Grid, Row, Table} from "react-bootstrap";
import {Link} from "react-router";
import Loader from "react-loader";

import scheduleService from "../department_service";
import config from "../../config";

/*
 Query empty classrooms.
 */

const path = config.path;

class EmptyClassrooms extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);

        this.state = {
            clicked: [],
            buildings: [],
            loaded: false,
            classroomsLoaded: true,
            foundClassrooms: []
        };
    }

    componentWillMount() {
        let {searchParams, orderParams, pager} = this.state;
        this.searchBuildings(searchParams, orderParams, pager).then(() => {
            this.setState({loaded: true});
            this.sortBuildings();
        });
    }

    searchBuildings() {
        return scheduleService.findDistinctBuildings()
            .then(buildings => {
                this.setState({buildings})
            })
            .catch(searchError => this.setState({searchError}));
    }

    sortBuildings(){
        let {buildings = []} = this.state;

        this.setState({
            "buildings": buildings.sort(),
            "loaded": true
        });
    }

    findEmptyClassrooms() {
        let {clicked = [], selectedBuilding = ''} = this.state;

        return scheduleService.findEmptyClassrooms(selectedBuilding, clicked.map(String))
        .then(results => {
            this.setState({'foundClassrooms': results, 'classroomsLoaded': true});
            console.log(results);
        })
        .catch(searchError => console.error(error));
    }

    getHour(num) {
        if(num < 1) {
            return "0" + (num + 8) + ":40-0" + (num+9) + ":30";
        }
        else if(num < 2){
            return "0" + (num + 8) + ":40-" + (num+9) + ":30";
        }
        else if(num >= 2 && num < 4) {
            return (num + 8) + ":40-" + (num + 9) + ":30";
        }
        else {
            return (num + 9) + ":40-" + (num + 10) + ":30";
        }
    }

    handleClick(index){
        let {clicked} = this.state;

        if(clicked.indexOf(index) != -1) {
            clicked.splice(clicked.indexOf(index), 1);
        }
        else {
            clicked.push(index);
        }

        console.log(clicked);
        this.setState({'clicked': clicked});
    }

    renderRow(xs, md, index) {
        return <Row className="sg-row show-grid">
            {[0, 1, 2, 3, 4].map(i => i + index * 5).map(this.renderButton.bind(this, xs, md))}
        </Row>
    }

    renderButton(xs, md, index) {
        let {clicked} = this.state;
        var style = "";

        if(clicked.indexOf(index) != -1) {
            style = "sg-col-selected"
        }

        return <Col xs={xs} md={md} className={`sg-col ${style}`} key={index} onClick={this.handleClick.bind(this, index)}>
            {this.getHour(Math.floor(index / 5))}
        </Col>
    }

    handleBuildingChange(event) {
        let selectedBuilding = event.target.value;
        this.setState({'selectedBuilding': selectedBuilding});
    }

    renderBuilding(building) {
        return <option value={building}>{building}</option>;
    }

    getDay(num) {
        var day;
        switch(num){
            case 0:
                day = 'Monday';
                break;
            case 1:
                day = 'Tuesday';
                break;
            case 2:
                day = 'Wednesday';
                break;
            case 3:
                day = 'Thursday';
                break;
            case 4:
                day = 'Friday';
                break;
            default:
                day = 'Some day';
                break;
        }

        return day;
    }

    renderSelections(clicked) {
        return <tr>
            <td>{this.getDay(clicked % 5)}</td>
            <td>{this.getHour(Math.floor(clicked / 5))}</td>
        </tr>
    }

    renderEmptyClassroom(classroom) {
        if(classroom){
            return (
                <span>
                    <Col className="searchCol" xs={6}>
                        <Link to={`/${path}/classroom/${classroom.location}`}>{classroom.location}</Link>
                    </Col>
                </span>
            );
        }
    }

    submitQuery() {
        this.setState({'classroomsLoaded': false});
        this.findEmptyClassrooms();
    }

    render() {
        let [xs, md] = [2, 2];
        let {buildings, selectedBuilding, loaded, clicked = [], foundClassrooms = [], classroomsLoaded} = this.state;

        return <div>
            <Loader loaded={loaded}>
                <Row>
                    <Col xs={4} md={4}>
                        <FormGroup controlId="formControlsSelect">
                            <Row>
                                <Col xs={5}>
                                    <ControlLabel>Filter by building:</ControlLabel>
                                </Col>
                                <Col xs={5}>
                                    <FormControl onChange={this.handleBuildingChange.bind(this)} componentClass="select" placeholder="Select a building.">
                                        {buildings.map(this.renderBuilding.bind(this))}
                                    </FormControl>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col xs={5}>
                                    <Button onClick={this.submitQuery.bind(this)}>Find empty classrooms</Button>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Col>
                </Row>
                <hr/>
                <p>Select time slots by clicking/tapping on them.</p>
                <Grid>
                    <Col>
                        <Row className="show-grid">
                            <Col className="sg-col" xs={xs} md={md}>Monday</Col>
                            <Col className="sg-col" xs={xs} md={md}>Tuesday</Col>
                            <Col className="sg-col" xs={xs} md={md}>Wednesday</Col>
                            <Col className="sg-col" xs={xs} md={md}>Thursday</Col>
                            <Col className="sg-col" xs={xs} md={md}>Friday</Col>
                        </Row>

                        {[0, 1, 2, 3].map(this.renderRow.bind(this, 2, 2))}
                        <hr />
                        {[4, 5, 6, 7].map(this.renderRow.bind(this, 2, 2))}
                    </Col>
                </Grid>
            </Loader>
            <hr />

            <hr />
            <Loader loaded={classroomsLoaded}>
                {foundClassrooms.map(this.renderEmptyClassroom.bind(this))}
            </Loader>
            <br />
            <br />
            <hr />
            <p><b>Results from:</b> {selectedBuilding ? selectedBuilding + " Building" : "All buildings"} </p>
            <Table striped hover>
                <thead>
                    <th>Day</th>
                    <th>Hour</th>
                </thead>
                <tbody>
                    {clicked.map(this.renderSelections.bind(this))}
                </tbody>
            </Table>
        </div>;
    }
}

EmptyClassrooms.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};


export default EmptyClassrooms;