import React, {PropTypes} from "react";
import {Button, Col, Glyphicon, Panel, Row, Table, Grid, Clearfix} from "react-bootstrap";
import {Link} from "react-router";

class About extends React.Component {
    render() {
        return (<div>
            <Row>
                <h2>Where is my Hoca?</h2>
            </Row>
            <Row>
                <hr/>
                <p>Hola! I am <a href="http://github.com/cagdass">cagdass</a> on Github, and very hungry for stars.</p>
                <br/>
                <p>I meant to work on a web application to share all the professors' schedules and the classroom schedules for some time.</p>
                <br/>
                <p>Learning <i>some</i> React made it much easier. Many thanks go to <a href="http://20satir.com">20satir</a> where I got to learn what I learned. And also to Facebook, who created React in the first place.</p>
                <br/>
                <p>This application, and the accompanying server application are open-source at:</p>
                <p><a href="https://github.com/cagdass/where-is-my-hoca-react">https://github.com/cagdass/where-is-my-hoca-react</a></p>
                <p><a href="https://github.com/cagdass/where-is-my-hoca-server">https://github.com/cagdass/where-is-my-hoca-server</a></p>
                <br/>
                <p>And the parser program I wrote to extract the data is at: (beware in Python)</p>
                <p><a href="https://github.com/cagdass/offerings-huntsman">https://github.com/cagdass/offerings-huntsman</a></p>
                <br/>
                <p>I appreciate any suggestions or bug reports or anything. E-mail me:
                    <li><a href="mailto:lorrabarra@gmail.com">lorrabarra@gmail.com</a></li>
                    <li><a href="mailto:cagdas.oztekin@ug.bilkent.edu.tr">cagdas.oztekin@ug.bilkent.edu.tr</a></li>
                </p>
            </Row>
        </div>)
    }
}

About.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};

export default About;