import React, {PropTypes} from "react";
import {Button, Col, Glyphicon, Panel, Row, Table} from "react-bootstrap";
import {Link} from "react-router";
import departmentService from "../schedule_service.js";
import scheduleFormatter from "../../utility/scheduler_formatter";
import Schedule from "../schedule";
import Loader from "react-loader";

/*
    Classroom with its weekly schedule.
 */

class ClassroomDetails extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);
        // Initialize empty schedule.
        this.state = {
            loaded: false,
            schedule:
                [[{}, {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}]]
        };
    }

    componentWillMount() {
        console.log(this.props.params);
        // Retrieve the classes at this classroom from the server.
        departmentService.classroomDetails(this.props.params.id)
        .then(classes => {
            this.setState({classes});
        })
        .catch(error => this.setState({error: error}))
        .then(() => this.setState({loaded: true}));
    }

    renderInstructor(instructor){
        return <div>
            {/* Link to the instructor's page */}
            <Link to={`/hoca/${instructor.replace(/ /g, "_")}`}>{instructor}</Link>
            <br/>
        </div>
    }

    renderClass(clase, index) {
        // Render a given class, display instructor, with a link to the instructor's page, the title of the course and the department code.
        return <tr key={index}>
                <td>{clase.instructor.map(this.renderInstructor.bind(this))}</td>
                <td>{clase.title}</td>
                <td>{clase.departmentCode + clase.courseCode + "-" + clase.section}</td>
            </tr>;
    }

    render() {
        let {classes = [], loaded} = this.state;
        let classroom = this.props.params.id;
        let renderClassroom = false;
        let isClassroom = true;

        return (<div>
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
            <Loader loaded={loaded}>
                <Schedule classes={classes} classroom={classroom} renderClassroom={renderClassroom} isClassroom={isClassroom} xs={2} md={2} />
            </Loader>
        </div>);
    }
}

ClassroomDetails.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};


export default ClassroomDetails;
