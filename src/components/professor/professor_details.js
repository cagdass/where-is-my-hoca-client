import React, {PropTypes} from "react";
import {Button, Col, Glyphicon, Panel, Row, Table, Grid} from "react-bootstrap";
import departmentService from "../schedule_service.js";
import {Link} from "react-router";
import scheduleFormatter from "../../utility/scheduler_formatter";

class ProfessorDetails extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);
        this.state = {schedule: [
            [{}, {}, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {}]
        ]};
    }

    componentWillMount() {
        let professor = this.props.params.id.replace(/_/g, " ");
        departmentService.professorDetails(professor).then(classes => {
            this.setState({classes});
        })
        .catch(error => this.setState({error: error}))
        .then(() => this.setState({isLoaded: true}));
    }

    renderClass(clase, index) {
        return <tr key={index}>
            <td>{clase.title}</td>
            <td>{clase.departmentCode + clase.courseCode + "-" + clase.section}</td>
            <td>{clase.instructor}</td>
        </tr>
    }

    renderScheduleCol(schedule, hour, renderClassroom, index){
        return  <Col xs={3} md={2} className={`bg-col ${schedule[index][hour].className}`}>{schedule[index][hour].courseCode != undefined && scheduleFormatter.prettifyCourse(schedule[index][hour]) + " "}
            {renderClassroom && <Link to={`/classroom/${schedule[index][hour].location}`}>{schedule[index][hour].location}</Link>}
            {schedule[index][hour].status != undefined && " " + schedule[index][hour].status}
        </Col>
    }

    renderScheduleRow(schedule, hour, renderClassroom){
        return <div>
            {[0,1,2,3,4].map(this.renderScheduleCol.bind(this, schedule, hour, renderClassroom))}
        </div>;
    }

    renderSchedule(renderClassroom){
        let {classes = []} = this.state;
        let schedule = scheduleFormatter.formatSchedule(classes);
        let marmara = "Marmara Tiem :(";

        console.log(schedule);

        return (<div>
            <Table striped condensed hover>
                <Row className="rowasd">
                    {/*<thead>*/}
                        <Col xs={3} md={2} className="dayCol"></Col>
                        <Col xs={3} md={2} className="dayCol">Monday</Col>
                        <Col xs={3} md={2} className="dayCol">Tuesday</Col>
                        <Col xs={3} md={2} className="dayCol">Wednesday</Col>
                        <Col xs={3} md={2} className="dayCol">Thursday</Col>
                        <Col xs={3} md={2} className="dayCol">Friday</Col>
                    {/*</thead>*/}
                </Row>
                <hr/>
                <Row className="rowasd">
                    <Col xs={3} md={2}>08.40-09.30</Col>
                    {this.renderScheduleRow(schedule, 0, renderClassroom)}
                </Row>
                <br/>
                <Row className="rowasd">
                    <Col xs={3} md={2}>09.40-10.30</Col>
                    {this.renderScheduleRow(schedule, 1, renderClassroom)}
                </Row>
                <br/>
                <Row className="rowasd">
                    <Col xs={3} md={2}>10.40-11.30</Col>
                    {this.renderScheduleRow(schedule, 2, renderClassroom)}
                </Row>
                <br/>
                <Row className="rowasd">
                    <Col xs={3} md={2}>11.40-12.30</Col>
                    {this.renderScheduleRow(schedule, 3, renderClassroom)}
                </Row>
                <br/>
                <Row className="rowasd">
                    <Col xs={3} md={2}><i>{marmara}</i></Col>
                    <Col xs={3} md={2}><i>{marmara}</i></Col>
                    <Col xs={3} md={2}><i>{marmara}</i></Col>
                    <Col xs={3} md={2}><i>{marmara}</i></Col>
                    <Col xs={3} md={2}><i>{marmara}</i></Col>
                    <Col xs={3} md={2}><i>{marmara}</i></Col>
                </Row>
                <br/>
                <Row className="rowasd">
                    <Col xs={3} md={2}>13.40-14.30</Col>
                    {this.renderScheduleRow(schedule, 4, renderClassroom)}
                </Row>
                <br/>
                <Row className="rowasd">
                    <Col xs={3} md={2}>14.40-15.30</Col>
                    {this.renderScheduleRow(schedule, 5, renderClassroom)}
                </Row>
                <br/>
                <Row className="rowasd">
                    <Col xs={3} md={2}>15.40-16.30</Col>
                    {this.renderScheduleRow(schedule, 6, renderClassroom)}
                </Row>
                <br/>
                <Row className="rowasd">
                    <Col xs={3} md={2}>16.40-17.30</Col>
                    {this.renderScheduleRow(schedule, 7, renderClassroom)}
                </Row>
            </Table>
            </div>
        );
    }

    render() {
        let {classes = []} = this.state;
        let professor = this.props.params.id.replace(/_/g, " ");
        let renderClassroom = true;

        return (<div>
            <h2>Search results for {professor}:</h2>
            {/*<pre>{JSON.stringify(classes)}</pre>*/}
            <Table striped condensed hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Course</th>
                        <th>Professor</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map(this.renderClass.bind(this))}
                </tbody>
            </Table>
            <br/>
            <br/>
            {this.renderSchedule(renderClassroom)}
        </div>);
    }
}

ProfessorDetails.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};


export default ProfessorDetails;
