import React from "react";

class IndexFooter extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);
    }


    render() {
        return <footer className="footer">
            <div className="container">
                <p>
                    <small>No &copy;opyrights 2016. Please do not use the information to assault the professors. But feel free to find out what class that cute girl is taking.  </small>
                </p>
            </div>
        </footer>
    }
}

export default IndexFooter;