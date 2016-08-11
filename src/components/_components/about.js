import React, {PropTypes} from "react";
import {Button, Col, Glyphicon, Panel, Row, Table, Grid, Clearfix} from "react-bootstrap";
import {Link} from "react-router";

class About extends React.Component {
    render() {
        return (<div>
            <Row>
                <h2>Where is my Hoca? (and stalk girls)</h2>
            </Row>
            <Row>
                <hr/>
                <p>Hola! I am <a href="http://github.com/cagdass">cagdass</a> on Github, and very hungry for stars.</p>
                <br/>
                <p>I meant to work on a web application to share all the professors' schedules and the classroom schedules for some time.</p>
                <br/>
                <p>Learning <i>some</i> React made it possible. So thanks go to <a href="http://20satir.com">20satir</a> where I got to learn what I learned and also Facebook, who made React in the first place.</p>
            </Row>
            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col sm={6} md={3}><code>&lt;{'Col sm={6} md={3}'} /&gt;</code><br/>{"aasud as diua sdhi asd jajksd kakjsdkasdkj ajksdk jkas djk kjas dkj jkas dkj jakhsdjkhakjsd kjahksdhihaisdhihaisud iashd jashdj asdamsd am sdjahsd"}</Col>
                        <Col sm={6} md={3}><code>&lt;{'Col sm={6} md={3}'} /&gt;</code><br/>{"asd jajksd kakjsdkasdkj ajksdk jkas djk kjas dkj jkas dkj jakhsdjkhakjsd kjahksdhihaisdhihaisud iashd jashdj a"}</Col>
                        <Clearfix visibleSmBlock><code>&lt;{'Clearfix visibleSmBlock'} /&gt;</code></Clearfix>
                        <Col sm={6} md={3}><code>&lt;{'Col sm={6} md={3}'} /&gt;</code><br/>{" asd jajksd kakjsdkasdkj ajksdk jkas djk kjas dkj jkas dkj jakhsdjkhakjsd kjahksdhihaisdhihaisud iashd jashdj a  asd jajksd kakjsdkasdkj ajksdk jkas djk kjas dkj jkas dkj jakhsdjkhakjsd kjahksdhihaisdhihaisud iashd jashdj a"}</Col>
                        <Col sm={6} md={3}><code>&lt;{'Col sm={6} md={3}'} /&gt;</code><br/>{"jkas djk kjas dkj jkas dkj jakhsdjkhakjsd kjahksdhihaisdhihaisud iashd jashdj a  asd jajksd kakjsdkasdkj ajksdk jkas djk kjas dkj"}</Col>
                    </Row>
                </Grid>
            </div>
        </div>)
    }
}

About.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};

export default About;