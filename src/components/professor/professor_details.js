import React, {PropTypes} from "react";
import {Button, Col, Glyphicon, Panel, Row, Table, Grid} from "react-bootstrap";
import departmentService from "../schedule_service.js";
import {Link} from "react-router";

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
            this.formatSchedule(classes);
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

    numerizeHour(hour){
        // '08:40' returns 0, '12:30' returns 4
        return Number(hour.split(":")[0]) - 8;
    }

    getClassSpan(start, end){
        var nums = [];
        if(start > 4){
            start -= 1;
            end -=1;
        }
        for(var i = start; i < end; i++){
            nums.push(i)
        }

        // 08:40, 10:30 would return, after stopping at numerizeHour(), [0, 1]
        return nums;
    }

    numerizeDay(day){
        if(day === 'Mon'){
            return 0;
        }
        else if(day === 'Tue'){
            return 1;
        }
        else if(day === 'Wed'){
            return 2;
        }
        else if(day === 'Thu'){
            return 3;
        }
        else if(day === 'Fri'){
            return 4;
        }
        else{
            return 5;
        }
    }



    tokenizeLecture(lecture){
        var day = lecture.day;
        var start = lecture.hours[0];
        var end = lecture.hours[1];
        var location = lecture.location;
        var status = lecture.status;

        var dayNum = this.numerizeDay(day);
        var classSpan = this.getClassSpan(this.numerizeHour(start), this.numerizeHour(end));

        return {day, start, end, location, status, dayNum, classSpan};
    }

    formatSchedule(classes) {
        var schedule = [
            [{}, {}, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {}],
            [{}, {}, {}, {}, {}, {}, {}, {}]
        ];

        for (var i = 0; i < classes.length; i++) {
            var lectures = classes[i].lectures;
            for (var j = 0;lectures != undefined && j < lectures.length; j++){
               var tokenizedLecture = this.tokenizeLecture(lectures[j]);
               var obj = {
                   "departmentCode": classes[i].departmentCode,
                   "courseCode": classes[i].courseCode,
                   "section": classes[i].section,
                   "status": tokenizedLecture.status,
                   "location": tokenizedLecture.location,
                   "className": "bg-col" + (i+1)
               };



               var day = tokenizedLecture.dayNum;
               var hours = tokenizedLecture.classSpan;

               for(var k = 0; k < hours.length; k++){
                   let existingClass = schedule[day][hours[k]];

                   // Meaning that (simply) the current hour is not empty.
                   if(Object.getOwnPropertyNames(existingClass) > 0){
                       if(existingClass.status != "[L]"){
                        // If the current hour has a regular class, leave it be.
                       }
                       // Otherwise, replace it with a regular class.
                       else{
                           schedule[day][hours[k]] = obj;
                       }
                   }
                   else{
                       console.log("ASSIGNING")
                       schedule[day][hours[k]] = obj;
                   }
               }
            }
        }

        return schedule;
    }

    prettifyCourse(schedule){
        return schedule.departmentCode + schedule.courseCode + "-" + schedule.section;
    }

    renderScheduleRow(schedule, hour){
        return <div>
                <Col xs={3} md={2} className={`bg-col ${schedule[0][hour].className}`}>{schedule[0][hour].courseCode != undefined && this.prettifyCourse(schedule[0][hour]) + " "}
                    <Link to={`/classroom/${schedule[0][hour].location}`}>{schedule[0][hour].location}</Link>
                    {schedule[0][hour].status != undefined && " " + schedule[0][hour].status}
                </Col>
                <Col xs={3} md={2} className={`bg-col ${schedule[1][hour].className}`}>{schedule[1][hour].courseCode != undefined && this.prettifyCourse(schedule[1][hour]) + " "}
                    <Link to={`/classroom/${schedule[1][hour].location}`}>{schedule[1][hour].location}</Link>
                    {schedule[1][hour].status != undefined && " " + schedule[1][hour].status}
                </Col>
                <Col xs={3} md={2} className={`bg-col ${schedule[2][hour].className}`}>{schedule[2][hour].courseCode != undefined && this.prettifyCourse(schedule[2][hour]) + " "}
                    <Link to={`/classroom/${schedule[2][hour].location}`}>{schedule[2][hour].location}</Link>
                    {schedule[2][hour].status != undefined && " " + schedule[2][hour].status}
                </Col>
                <Col xs={3} md={2} className={`bg-col ${schedule[3][hour].className}`}>{schedule[3][hour].courseCode != undefined && this.prettifyCourse(schedule[3][hour]) + " "}
                    <Link to={`/classroom/${schedule[3][hour].location}`}>{schedule[3][hour].location}</Link>
                    {schedule[3][hour].status != undefined && " " + schedule[3][hour].status}
                </Col>
                <Col xs={3} md={2} className={`bg-col ${schedule[4][hour].className}`}>{schedule[4][hour].courseCode != undefined && this.prettifyCourse(schedule[4][hour]) + " "}
                    <Link to={`/classroom/${schedule[4][hour].location}`}>{schedule[4][hour].location}</Link>
                    {schedule[4][hour].status != undefined && " " + schedule[4][hour].status}
                </Col>
            </div>;
    }

    renderSchedule(){

        let {classes = []} = this.state;
        let schedule = this.formatSchedule(classes);
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
                    {this.renderScheduleRow(schedule, 0)}
                </Row>
                <br/>
                <Row className="rowasd">
                    <Col xs={3} md={2}>09.40-10.30</Col>
                    {this.renderScheduleRow(schedule, 1)}
                </Row>
                <br/>
                <Row className="rowasd">
                    <Col xs={3} md={2}>10.40-11.30</Col>
                    {this.renderScheduleRow(schedule, 2)}
                </Row>
                <br/>
                <Row className="rowasd">
                    <Col xs={3} md={2}>11.40-12.30</Col>
                    {this.renderScheduleRow(schedule, 3)}
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
                    {this.renderScheduleRow(schedule, 4)}
                </Row>
                <br/>
                <Row className="rowasd">
                    <Col xs={3} md={2}>14.40-15.30</Col>
                    {this.renderScheduleRow(schedule, 5)}
                </Row>
                <br/>
                <Row className="rowasd">
                    <Col xs={3} md={2}>15.40-16.30</Col>
                    {this.renderScheduleRow(schedule, 6)}
                </Row>
                <br/>
                <Row className="rowasd">
                    <Col xs={3} md={2}>16.40-17.30</Col>
                    {this.renderScheduleRow(schedule, 7)}
                </Row>
            </Table>
            </div>
        );
    }

    render() {
        let {classes = []} = this.state;
        let professor = this.props.params.id.replace(/_/g, " ");
        return (<div>
            <h2>Search results for {professor}:</h2>
            <pre>{JSON.stringify(classes)}</pre>
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
            {this.renderSchedule()}
        </div>);
    }
}

ProfessorDetails.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};


export default ProfessorDetails;
