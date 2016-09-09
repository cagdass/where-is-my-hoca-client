import React, {PropTypes} from "react";
import {Table} from "react-bootstrap";
import Loader from "react-loader";

import departmentService from "../department_service.js";
import Schedule from "../schedule";

class ProfessorDetails extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            loaded: false,
            schedule: [
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
            this.setState({"classes": classes, "loaded": true});
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
        let {classes = [], loaded} = this.state;
        let professor = this.props.params.id.replace(/_/g, " ");
        let renderClassroom = true;
        let isClassroom = false;

        return (<div>
            <h2>{professor === "Can Alkan" ? "The teachings of magnificent" : "Classes from "} {professor}:</h2>
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
            {professor !== "Staff" && <Loader loaded={loaded}>
                <Schedule classes={classes} classroom="" renderClassroom={renderClassroom} isClassroom={isClassroom} xs={2} md={2} />
            </Loader>}
        </div>);
    }
}

ProfessorDetails.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};


export default ProfessorDetails;
