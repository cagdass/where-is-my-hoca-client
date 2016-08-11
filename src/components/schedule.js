import React, {PropTypes} from "react";
import {Button, Col, Glyphicon, Panel, Row, Table, Grid} from "react-bootstrap";
import {Link} from "react-router";
import scheduleFormatter from "../utility/scheduler_formatter";

class Schedule extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);
        this.state = {};
    }

    renderScheduleCol(schedule, hour, index) {
        let {renderClassroom, xs, md, classroom} = this.props;

        if(!renderClassroom){
            // If the class's location is not different than this classroom, display it. Labs will usually fall into the else part.
            if(schedule[index][hour] && classroom == schedule[index][hour].location){
                return  <Col xs={xs} md={md} className={`bg-col ${schedule[index][hour].className}`}>

                    {/* Display the course with the following format [departmentCode][courseCode]-[section], e.g. CS425-1 */}
                    {schedule[index][hour].courseCode != undefined && scheduleFormatter.prettifyCourse(schedule[index][hour]) + " "}

                    {/* Put up a link to that classroom's page. */}
                    {renderClassroom && <Link to={`/classroom/${schedule[index][hour].location}`}>{schedule[index][hour].location}</Link>}

                    {/* Don't display the class's status if it is undefined */}
                    {schedule[index][hour].status != undefined && " " + schedule[index][hour].status}
                </Col>
            }
            // This hour of class takes place at a different classroom than this.
            else {
                return <Col xs={xs} md={md} className="bg-col"/>
            }
        }
        else{
            return  <Col xs={xs} md={md} className={`bg-col ${schedule[index][hour].className}`}>{schedule[index][hour].courseCode != undefined && scheduleFormatter.prettifyCourse(schedule[index][hour]) + " "}
                {renderClassroom && <Link to={`/classroom/${schedule[index][hour].location}`}>{schedule[index][hour].location}</Link>}
                {schedule[index][hour].status != undefined && " " + schedule[index][hour].status}
            </Col>
        }
    }

    // Render a row of hours for each day of the week.
    renderScheduleRow(schedule, hour) {
        return <div>
            {[0,1,2,3,4].map(this.renderScheduleCol.bind(this, schedule, hour))}
        </div>;
    }

    // TODO: Prettify this function, too much redundant stuff.
    renderSchedule() {
        let {classes = [], renderClassroom, xs, md} = this.props;
        let schedule = scheduleFormatter.formatSchedule(classes);

        // 4.40TL FTW.
        let marmara = "Marmara Tiem :(";

        return (<div>
                <Grid>
                    <Row className="rowasd show-grid">
                        <Col xs={xs} md={md} className="dayCol">Monday</Col>
                        <Col xs={xs} md={md} className="dayCol">Tuesday</Col>
                        <Col xs={xs} md={md} className="dayCol">Wednesday</Col>
                        <Col xs={xs} md={md} className="dayCol">Thursday</Col>
                        <Col xs={xs} md={md} className="dayCol">Friday</Col>
                    </Row>
                    <hr/>
                    <Row className="rowasd show-grid">
                        {this.renderScheduleRow(schedule, 0, renderClassroom, xs, md)}
                    </Row>
                    <br/>
                    <Row className="rowasd show-grid">
                        {this.renderScheduleRow(schedule, 1, renderClassroom, xs, md)}
                    </Row>
                    <br/>
                    <Row className="rowasd show-grid">
                        {this.renderScheduleRow(schedule, 2, renderClassroom, xs, md)}
                    </Row>
                    <br/>
                    <Row className="rowasd show-grid">
                        {this.renderScheduleRow(schedule, 3, renderClassroom, xs, md)}
                    </Row>
                    <br/>
                    <Row className="rowasd show-grid">
                        <Col xs={xs} md={md}><i>{marmara}</i></Col>
                        <Col xs={xs} md={md}><i>{marmara}</i></Col>
                        <Col xs={xs} md={md}><i>{marmara}</i></Col>
                        <Col xs={xs} md={md}><i>{marmara}</i></Col>
                        <Col xs={xs} md={md}><i>{marmara}</i></Col>
                    </Row>
                    <br/>
                    <Row className="rowasd show-grid">
                        {this.renderScheduleRow(schedule, 4, renderClassroom, xs, md)}
                    </Row>
                    <br/>
                    <Row className="rowasd show-grid">
                        {this.renderScheduleRow(schedule, 5, renderClassroom, xs, md)}
                    </Row>
                    <br/>
                    <Row className="rowasd show-grid">
                        {this.renderScheduleRow(schedule, 6, renderClassroom, xs, md)}
                    </Row>
                    <br/>
                    <Row className="rowasd show-grid">
                        {this.renderScheduleRow(schedule, 7, renderClassroom, xs, md)}
                    </Row>
                </Grid>
            </div>
        );
    }

    render() {
        return this.renderSchedule()
    }
}

Schedule.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};


export default Schedule;