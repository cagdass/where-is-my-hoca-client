import React, {PropTypes} from "react";
import {Button, FormControl, FormGroup, ControlLabel, HelpBlock, Col, Grid, Glyphicon, Modal, Panel, Row, Table} from "react-bootstrap";
import {Link} from "react-router";
import scheduleService from "../schedule_service";
import Loader from "react-loader";
import UnderConstrution from "../_components/under_construction";

/*
 Query empty classrooms.
 */

class EmptyClassrooms extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);

        this.state = {
            clicked: [],
            buildings: [],
            loaded: false,
            selectedBuilding: "All"
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

    // // Credits go to react-auto-suggest, which is no longer a dependency in this project :(.
    // escapeRegexCharacters(str) {
    //     return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // }

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
        this.setState({clicked})

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
        this.setState({selectedBuilding});
    }

    renderBuilding(building) {
        return <option value={building}>{building}</option>;
    }

    render() {
        let [xs, md] = [2, 2];
        let {buildings, loaded} = this.state;

        return <div>
            <UnderConstrution />
            <Loader loaded={loaded}>
                <Row>
                    <Col xs={4} md={4}>
                        <FormGroup controlId="formControlsSelect">
                            <Row>
                                <Col>
                                    <ControlLabel>Select a Building</ControlLabel>
                                </Col>
                                <Col>
                                    <FormControl onChange={this.handleBuildingChange.bind(this)} componentClass="select" placeholder="select">
                                        <option value="All">All Buildings</option>
                                        {buildings.map(this.renderBuilding.bind(this))}
                                    </FormControl>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Col>
                </Row>
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
        </div>;
    }
}

EmptyClassrooms.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};


export default EmptyClassrooms;
