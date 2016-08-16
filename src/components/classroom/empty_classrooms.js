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
            clicked: []
        };
    }

    // componentWillMount() {
    //     let {searchParams, orderParams, pager} = this.state;
    //     this.searchClassrooms(searchParams, orderParams, pager).then(() => {
    //         this.setState({loaded: true});
    //         this.sortClassrooms();
    //     });
    // }

    // // Credits go to react-auto-suggest, which is no longer a dependency in this project :(.
    // escapeRegexCharacters(str) {
    //     return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // }

    getHour(num) {
        if(num < 2) {
            return "0" + (num + 8) + ":40";
        }
        else if(num >= 2 && num < 4) {
            return (num + 8) + ":40";
        }
        else {
            return (num + 9) + ":40";
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

        this.setState({clicked})
    }

    renderRow(xs, md, index) {
        return <Row className="rowasd show-grid">
            {[0, 1, 2, 3, 4].map(i => i + index * 5).map(this.renderButton.bind(this, xs, md))}
        </Row>
    }

    renderButton(xs, md, index) {
        let {clicked} = this.state;
        let style = "bg-colWhite";

        if(clicked.indexOf(index) != -1) {
            style = "bg-colSel"
        }

        return <Col xs={xs} md={md} className={`bg-col ${style}`} key={index} onClick={this.handleClick.bind(this, index)}>
            {this.getHour(Math.floor(index / 5))}
        </Col>
    }


    render() {
        return <div>
            <UnderConstrution />
            <Grid>
                {[0, 1, 2, 3].map(this.renderRow.bind(this, 2, 2))}
                <hr />
                {[4, 5, 6, 7].map(this.renderRow.bind(this, 2, 2))}
            </Grid>
        </div>;
    }
}

EmptyClassrooms.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};


export default EmptyClassrooms;
