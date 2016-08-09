import React from "react";
import {Col, Row} from "react-bootstrap";
import DepartmentList from "./department_list";
// import UserInsert from "./user_insert.js";

class TeachersHome extends React.Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);
    }

    render() {
        let {children, history} = this.props;
        return <div>
            {children || <DepartmentList history={history}/>}
        </div>;
    }
}

export default TeachersHome;
