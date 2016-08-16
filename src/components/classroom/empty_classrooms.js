import React, {PropTypes} from "react";
import {Button, FormControl, FormGroup, ControlLabel, HelpBlock, Col, Grid, Glyphicon, Modal, Panel, Row, Table} from "react-bootstrap";
import {Link} from "react-router";
import scheduleService from "../schedule_service";
import Loader from "react-loader";

/*
 Query empty classrooms.
 */

class EmptyClassrooms extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);

        this.state = {};
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
        console.log(index);
    }

    renderRow(index) {
        return <Row className="show-grid">
            {[0, 1, 2, 3, 4].map(i => i + index * 5).map(this.renderButton.bind(this))}
        </Row>
    }

    renderButton(index) {
        return <Button key={index} onClick={this.handleClick.bind(this, index)}>
            {this.getHour(Math.floor(index / 5))}
        </Button>
    }


    render() {

        return <div>
            <Grid>
                {[0, 1, 2, 3].map(this.renderRow.bind(this))}
                <hr />
                {[4, 5, 6, 7].map(this.renderRow.bind(this))}
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
