import React, {PropTypes} from "react";
import {Button, FormControl, Checkbox, FormGroup, ControlLabel, HelpBlock, Col, Grid, Glyphicon, Modal, Panel, Row, Table} from "react-bootstrap";
import {Link} from "react-router";
import scheduleService from "../department_service";
import Loader from "react-loader";

/*
 Query elective classes given time/departments.
 */

class Electives extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);

        this.state = {
            clicked: [],
            loaded: false,
            departments: [],
            electivesLoaded: true,
            foundElectives: [],
            selectedDepartments: [],
            isDirty: false,
            isClicked: false
        };
    }

    componentWillMount() {
        let {searchParams, orderParams, pager} = this.state;
        this.searchDepartments(searchParams, orderParams, pager).then(() => {
            this.setState({loaded: true});
            this.sortDepartments();
        });
    }

    searchDepartments() {
        return scheduleService.findDistinctDepartments()
        .then(departments => {
            this.setState({'departments': departments})
        })
        .catch(searchError => this.setState({searchError}));
    }

    sortDepartments(){
        let {departments = []} = this.state;

        this.setState({
            "departments": departments.sort(),
            "loaded": true
        });
    }

    findElectives() {
        let {clicked = [], selectedDepartments = []} = this.state;
        return scheduleService.findElectives(selectedDepartments, clicked.map(String))
            .then(results => {
                this.setState({'foundElectives': results, 'electivesLoaded': true});
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

        this.setState({'clicked': clicked, 'isDirty': true});
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

    handleDepartmentChange(event) {
        let { value } = event.target;
        let { selectedDepartments = [] } = this.state;
        console.log(value);
        console.log(selectedDepartments);
        if(selectedDepartments.indexOf(value) == -1) {
            this.setState({'selectedDepartments': [...selectedDepartments, value]});
        }
        if(selectedDepartments.indexOf(value) != -1) {
            let index = selectedDepartments.indexOf(value);
            this.setState({'selectedDepartments': [...selectedDepartments.slice(0, index), ...selectedDepartments.slice(index + 1)]})
        }
    }

    renderDepartment(department) {
        // return (
        //     <span>
        //         <Col xs={2}>
        //             <Checkbox value={department} onChange={this.handleDepartmentChange.bind(this)}>
        //                 {department}
        //             </Checkbox>
        //         </Col>
        //     </span> );

        return <option value={`${department}`} onClick={this.handleDepartmentChange.bind(this)}>{`${department}`}</option>
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

    renderElective(elective) {
        if(elective){
            return (
                <tr>
                    <td><Link to={`/department/${elective.departmentCode}`}>{elective.departmentCode}</Link>{elective.courseCode}-{elective.section}</td>
                    <td><Link to={`/hoca/${elective.instructor}`}>{elective.instructor}</Link></td>
                    <td>{elective.title}</td>
                    <td>{elective.lecturesRaw}</td>
                </tr>
            );
        }
    }

    submitQuery() {
        this.setState({'classroomsLoaded': false, 'isClicked': true});
        this.findElectives();
    }

    render() {
        let [xs, md] = [2, 2];
        let {departments, selectedDepartments = [], loaded, clicked = [], foundElectives = [], electivesLoaded, isClicked, isDirty} = this.state;

        let reddishStyle = {
            color: "red"
        };

        return <div>
            <p>The results for given hours include all classes, not only the elective classes, make sure to check out if it has prerequisites and so on.</p>
            <br />
            {(!isClicked || (isDirty || clicked.length > 0)) && <p>Don't forget to select hours, put in all the free time you have to get more results.</p>}
            {(isClicked && (!isDirty && clicked.length == 0)) && <p style={reddishStyle}>Don't forget to select hours, put in all the free time you have to get more results.</p>}
            <hr />
            <pre>{`Departments: ${selectedDepartments}\nHours: ${clicked}`}</pre>
            <Loader loaded={loaded}>
                <Row>
                    <Col xs={10} md={10}>
                        <FormGroup controlId="formControlsSelectMultiple">
                            <ControlLabel>Select departments to see the classes from:</ControlLabel>
                            <FormControl componentClass="select" multiple>
                                {departments.filter(d => d.length > 0).map(this.renderDepartment.bind(this))}
                            </FormControl>
                        </FormGroup>
                    </Col>
                    <Col xs={3}>
                        <Button onClick={this.submitQuery.bind(this)}>Find classes</Button>
                    </Col>
                </Row>
                <hr/>
                <Loader loaded={electivesLoaded}>
                    <Table>
                        <thead>
                        <tr>
                            <th>Course</th>
                            <th>Instructor</th>
                            <th>Title</th>
                            <th>Schedule</th>
                        </tr>
                        </thead>
                        <tbody>
                        {foundElectives.map(this.renderElective.bind(this))}
                        </tbody>
                    </Table>
                </Loader>
                <hr />
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
                        <center><h3>MARMARA TIEM :((((</h3></center>
                        <hr />
                        {[4, 5, 6, 7].map(this.renderRow.bind(this, 2, 2))}
                    </Col>
                </Grid>
            </Loader>
            <hr />
        </div>;
    }
}

Electives.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};


export default Electives;