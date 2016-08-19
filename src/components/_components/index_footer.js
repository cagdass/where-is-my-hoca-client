import React from "react";

class IndexFooter extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);
    }

    render() {
        return <footer className="footer">
            <div className="container">
                <p>
                    <small>No &copy;opyrights 2016. Please do not use the information to assault the professors. Or stalk people going in the classrooms. </small>
                </p>
            </div>
        </footer>
    }
}

export default IndexFooter;