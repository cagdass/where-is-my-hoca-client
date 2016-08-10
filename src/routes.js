import React from "react";
import {Route, IndexRoute} from "react-router";
import MainHome from "./components/main_home";
import DepartmentList from "./components/department/department_list";
import DepartmentDetails from "./components/department/department_details";
import ProfessorsList from "./components/professor/professors_list";
import ProfessorDetails from "./components/professor/professor_details";
import BuildingList from "./components/building/building_list";
import BuildingDetails from "./components/building/building_details";
import NoMatch from "components/no_match";

const routes = (
    <Route path="/" component={MainHome}>
        <IndexRoute component={DepartmentList}/>
        <Route path="departments" component={DepartmentList}/>
        <Route path="professors" component={ProfessorsList}/>
        <Route path="department/:id" component={DepartmentDetails}/>
        <Route path="professor/:id" component={ProfessorDetails}/>
        <Route path="buildings" component={BuildingList}/>
        <Route path="building/:id" component={BuildingDetails}/>
        <Route path="*" component={NoMatch}/>
    </Route>
);

export default routes;
