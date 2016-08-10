import baseAPI from "../utility/services/base_api.js";

class DepartmentService {
    constructor() {
    }

    professorDetails(instructor) {
        return baseAPI.get("professors/professor?name=" + instructor).catch(error => {
            return null;
        })
    }

    classroomDetails(classroom) {
        console.log("classrooms/classroom?class=" + classroom);
        return baseAPI.get("classrooms/classroom?classroom=" + classroom).catch(error => {
            return null;
        })
    }

    buildingDetails(building) {
        console.log("buildings/building?building=" + building);
        return baseAPI.get("buildings/building/?building=" + building).catch(error => {
            return null;
        })
    }

    departmentDetails(departmentCode) {
        console.log("departments/department?departmentCode=" + departmentCode);
        return baseAPI.get("departments/department?departmentCode=" + departmentCode).catch(error => {
            return {departmentCode: "CS"};
        })
    }

    findProfessors() {
        return baseAPI.get("professors").catch(error => {
            return {instructor: "David Daveport"}
        })
    }

    findDistinctBuildings(searchParams, orderParams, skip, limit) {
        return baseAPI.get("buildings", {
            searchParams,
            orderParams,
            skip,
            limit
        }).catch(error => {
            return ["EB", "B"];
        })
    }

    findDistinctDepartments(searchParams, orderParams, skip, limit) {
        return baseAPI.get("departments", {
            searchParams,
            orderParams,
            skip,
            limit
        }).catch(error => {
            return ["CS", "ECON"];
        })
    }

    findDistinctClassrooms(searchParams, orderParams, skip, limit) {
        return baseAPI.get("classrooms", {
            searchParams,
            orderParams,
            skip,
            limit
        }).catch(error => {
            return ["B-Z08", "EB-201"];
        })
    }


}

export default new DepartmentService();
