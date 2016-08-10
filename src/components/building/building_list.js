import React, {PropTypes} from "react";
import {Button, FormControl, FormGroup, ControlLabel, HelpBlock, Col, Glyphicon, Modal, Panel, Row, Table} from "react-bootstrap";
import {Link} from "react-router";
import scheduleService from "../schedule_service"

class BuildingList extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);
        this.state = {"sort": "Sort Ascending", "sorted": false, "isDirty": false};
    }

    componentWillMount() {
        let {searchParams, orderParams, pager} = this.state;
        this.searchBuildings(searchParams, orderParams, pager).then(() => {
            this.setState({isLoaded: true});
            this.sortBuildings();
        });
    }

    searchBuildings() {
        return scheduleService.findDistinctBuildings()
            .then(buildings => {
                this.setState({buildings})
            })
            .catch(searchError => this.setState({searchError}));
    }

    sortBuildings(){
        let {buildings = [], sort, sorted, isDirty} = this.state;
        if(isDirty){
            if(sorted){
                this.setState({"buildings": buildings.reverse(), "sort": "Sort Ascending", "sorted": false})
            }
            else{
                this.setState({"buildings": buildings.reverse(), "sort": "Sort Descending", "sorted": true})
            }
        }
        else{
            this.setState({"buildings": buildings.sort(), "sort": "Sort Descending", "sorted": true, "isDirty": true})
        }
    }

    renderBuilding(building, index) {
        if(building.length > 0){
            return <span>
                <Col xs={3} className="searchCol"><Link to={`/building/${building}`}>{building}</Link></Col>
            </span>
        }
    }

    render() {
        let {buildings = [], sort, sorted, isDirty} = this.state;

        return ( <div>
                <Row>
                    <Col xs={25} sm={25} md={8}>
                        <Table>
                            <thead>
                            <tr>
                                <th>Buildings</th>

                            </tr>
                            </thead>
                            <tbody>
                            {buildings.map(this.renderBuilding.bind(this))}
                            </tbody>
                        </Table>
                    </Col>
                    <Col xs={8} sm={8} md={3}>
                        <div className="containerSortButton">
                            <Button className="sortButton" onClick={this.sortBuildings.bind(this)}>{sort}</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

BuildingList.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};


export default BuildingList;
