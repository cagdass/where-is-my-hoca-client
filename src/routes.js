import React from "react";
import {Route, IndexRoute} from "react-router";
import MainHome from "./components/main_home";
import DepartmentList from "./components/department/department_list";
import DepartmentDetails from "./components/department/department_details";
import ProfessorsList from "./components/professor/professors_list";
import ProfessorDetails from "./components/professor/professor_details";
import BuildingList from "./components/building/building_list";
import BuildingDetails from "./components/building/building_details";
import ClassroomList from "./components/classroom/classroom_list";
import ClassroomDetails from "./components/classroom/classroom_details";
import EmptyClassrooms from "./components/classroom/empty_classrooms";
import About from "./components/_components/about";
import NoMatch from "components/_components/no_match";

const routes = (
    <Route path="/" component={MainHome}>
        <IndexRoute component={ProfessorsList}/>
        <Route path="departments" component={DepartmentList}/>
        <Route path="hocas" component={ProfessorsList}/>
        <Route path="department/:id" component={DepartmentDetails}/>
        <Route path="hoca/:id" component={ProfessorDetails}/>
        <Route path="buildings" component={BuildingList}/>
        <Route path="building/:id" component={BuildingDetails}/>
        <Route path="classrooms" component={ClassroomList}/>
        <Route path="classroom/:id" component={ClassroomDetails}/>
        <Route path="empty_classrooms" component={EmptyClassrooms}/>
        <Route path="about" component={About}/>
        <Route path="*" component={NoMatch}/>
    </Route>
);

export default routes;
