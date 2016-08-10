import React, {PropTypes} from "react";
import {Button, Col, Glyphicon, Panel, Row, Table} from "react-bootstrap";
import {Link} from "react-router";
import departmentService from "../schedule_service.js";
import scheduleFormatter from "../../utility/scheduler_formatter";

class ClassroomDetails extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);
        // Initialize empty schedule.
        this.state = {schedule: [
            [{}, {}, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {}]
        ]};
    }

    componentWillMount() {
        console.log(this.props.params);
        // Retrieve the classes at this classroom from the server.
        departmentService.classroomDetails(this.props.params.id)
        .then(classes => {
            this.setState({classes});
        })
        .catch(error => this.setState({error: error}))
        .then(() => this.setState({isLoaded: true}));
    }

    renderInstructor(instructor){
        return <div>
            {/* Link to the instructor's page */}
            <Link to={`/professor/${instructor.replace(/ /g, "_")}`}>{instructor}</Link>
            <br/>
        </div>
    }

    renderClass(clase, index) {
        // Render a given class, display instructor, with a link to the instructor's page, the title of the course and the department code.
        return <tr key={index}>
            <td>{clase.instructor.map(this.renderInstructor.bind(this))}</td>
            <td>{clase.title}</td>
            <td>{clase.departmentCode + clase.courseCode + "-" + clase.section}</td>
        </tr>
    }

    renderScheduleCol(schedule, hour, renderClassroom, index){
        let classroom = this.props.params.id;

        console.log(`Index is ${index == 3}`);

        // If the class's location is not different than this classroom, display it. Labs will usually fall into the else part.
        if(schedule[index][hour] && classroom == schedule[index][hour].location){
            return  <Col xs={3} md={2} className={`bg-col ${schedule[index][hour].className}`}>

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
            return <Col xs={3} md={2} className="bg-col"/>
        }

    }

    // Render a row of hours for each day of the week.
    renderScheduleRow(schedule, hour, renderClassroom){
        return <div>
            {[0,1,2,3,4].map(this.renderScheduleCol.bind(this, schedule, hour, renderClassroom))}
        </div>;
    }

    // TODO: Prettify this function, too much redundant stuff.
    renderSchedule(renderClassroom){
        let {classes = []} = this.state;
        let schedule = scheduleFormatter.formatSchedule(classes);
        // 4.40TL FTW.
        let marmara = "Marmara Tiem :(";

        console.log(schedule);

        return (<div>
                <Table striped condensed hover>
                    <Row className="rowasd">
                        <Col xs={3} md={2} className="dayCol"></Col>
                        <Col xs={3} md={2} className="dayCol">Monday</Col>
                        <Col xs={3} md={2} className="dayCol">Tuesday</Col>
                        <Col xs={3} md={2} className="dayCol">Wednesday</Col>
                        <Col xs={3} md={2} className="dayCol">Thursday</Col>
                        <Col xs={3} md={2} className="dayCol">Friday</Col>
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
        let classroom = this.props.params.id;
        let renderClassroom = false;

        return (<div>
            <pre>{JSON.stringify(classes)}</pre>
            <h2>{`Classes at ${classroom}:`}</h2>
            <Table striped condensed hover>
                <thead>
                    <tr>
                        <th>Instructor</th>
                        <th>Title</th>
                        <th>Course</th>
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

ClassroomDetails.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};


export default ClassroomDetails;
