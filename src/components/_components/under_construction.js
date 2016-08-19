import React, {PropTypes} from "react";
import {Row} from "react-bootstrap";

class UnderConstruction extends React.Component {
    render() {
        return (<div>
            <Row>
                <h2>This page is currently being implemented.</h2>
            </Row>
            <Row>
                <p>So why not be a cutie and help me!</p>
                <p>
                    <li>Here is the Github repository: <a href="https://github.com/cagdass/where-is-my-hoca-react">https://github.com/cagdass/where-is-my-hoca-react</a></li>
                    <li>Here are some current issues: <a href="https://github.com/cagdass/where-is-my-hoca-react/issues">https://github.com/cagdass/where-is-my-hoca-react/issues</a></li>
                </p>
            </Row>
            <hr />
        </div>)
    }
}

UnderConstruction.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};

export default UnderConstruction;