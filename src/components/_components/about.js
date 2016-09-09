import React, { PropTypes } from "react";
import { Row } from "react-bootstrap";

class About extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <h2>Where is my Hoca?</h2>
                </Row>
                <Row>
                    <hr/>
                    <p className="about_p">Hola! I am <a href="http://github.com/cagdass">cagdass</a> on Github, and very hungry for stars.</p>
                    <br/>
                    <p className="about_p">Learning <i>some</i> React made programming this application much easier. Many thanks go to <a href="http://20satir.com">20satir</a> where I got to learn what I learned. And also to Facebook, who created React in the first place.</p>
                    <br/>
                    <p className="about_p">This application, and the accompanying server application are open-source at:</p>
                    <p className="about_p">Take a look at the open issues, new ideas are appreciated: </p>
                    <p className="about_p"><a href="https://github.com/cagdass/where-is-my-hoca-react">https://github.com/cagdass/where-is-my-hoca-react</a></p>
                    <p className="about_p"><a href="https://github.com/cagdass/where-is-my-hoca-server">https://github.com/cagdass/where-is-my-hoca-server</a></p>
                    <br/>
                    <p className="about_p">And the parser program I wrote to extract the data is at: (beware in Python)</p>
                    <p className="about_p"><a href="https://github.com/cagdass/offerings-huntsman">https://github.com/cagdass/offerings-huntsman</a></p>
                    <br/>
                    <p className="about_p">I appreciate any suggestions or bug reports or anything. E-mail me:
                        <li><a href="mailto:zaxd@cgds.me">zaxd@cgds.me</a></li>
                        <li><a href="mailto:lorrabarra@gmail.com">lorrabarra@gmail.com</a></li>
                        <li><a href="mailto:cagdas.oztekin@ug.bilkent.edu.tr">cagdas.oztekin@ug.bilkent.edu.tr</a></li>
                    </p>
                </Row>
            </div>
        );
    }
}

About.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};

export default About;