import React, {PropTypes} from "react";
import {Button, Col, Glyphicon, Panel, Row, Table, Grid} from "react-bootstrap";
import departmentService from "../schedule_service.js";
import {Link} from "react-router";
import Schedule from "../schedule";

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

    render() {
        let {classes = []} = this.state;
        let professor = this.props.params.id.replace(/_/g, " ");
        let renderClassroom = true;

        return (<div>
            <h2>Search results for {professor}:</h2>
            <Table striped condensed hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Course</th>
                        <th>Hoca</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map(this.renderClass.bind(this))}
                </tbody>
            </Table>
            <br/>
            <br/>
            <Schedule classes={classes} renderClassroom={renderClassroom} xs={2} md={2} />
        </div>);
    }
}

ProfessorDetails.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};


export default ProfessorDetails;
