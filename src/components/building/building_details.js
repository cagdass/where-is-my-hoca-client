import React, {PropTypes} from "react";
import {Col, Table} from "react-bootstrap";
import {Link} from "react-router";
import Loader from "react-loader"

import departmentService from "../department_service.js";
import config from "../../config";

const path = config.path;

class BuildingDetails extends React.Component {
    constructor (props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            "loaded": false
        };
    }

    componentWillMount () {
        departmentService.buildingDetails(this.props.params.id).then(classrooms => {
            this.setState({"classrooms": classrooms, "loaded": true});
            this.setDistinctClassrooms();
        })
        .catch(error => this.setState({error: error}))
        .then(() => this.setState({isLoaded: true}));
    }

    renderClassroom (classroom) {
        return (
            <div>
                <Col xs={3} className="searchCol">
                    <Link to={"/" + path + "/classroom/" + classroom}>{classroom}</Link>
                </Col>
            </div>
        );
    }

    setDistinctClassrooms () {
        let {classrooms = []} = this.state;
        var distinctClassrooms = [];

        let building = this.props.params.id;

        for(var i = 0; classrooms && i < classrooms.length; i++){
            var lectures = classrooms[i].lectures;
            for(var j = 0; lectures && j < lectures.length; j++){
                var classroom = lectures[j].location;
                if(classroom != '' && building === classroom.slice(0, building.length) && distinctClassrooms.indexOf(classroom) == -1){
                    distinctClassrooms.push(classroom);
                }
            }
        }

        this.setState({"distinctClassrooms": distinctClassrooms.sort()})
    }

    render () {
        let { classrooms = [], distinctClassrooms = [], loaded } = this.state;

        return (
            <Table striped condensed hover>
                <thead>
                    <tr>
                        <th>Classrooms</th>
                    </tr>
                </thead>
                <tbody>
                    <Loader loaded={loaded}>
                        {distinctClassrooms.map(this.renderClassroom.bind(this))}
                    </Loader>
                </tbody>
            </Table>
        );
    }
}

BuildingDetails.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};


export default BuildingDetails;
