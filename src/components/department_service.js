import baseAPI from "../utility/services/base_api.js";

class DepartmentService {
    constructor() {
    }

    professorDetails(instructor) {
        return baseAPI.get("professors/professor?name=" + instructor).catch(error => {
            return null;
        })
    }

    departmentDetails(departmentCode) {
        console.log("departments/department?departmentCode=" + departmentCode);
        return baseAPI.get("departments/department?departmentCode=" + departmentCode).catch(error => {
            return {departmentCode: "CS"};
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

    updateUser(user_id, user) {
      return baseAPI.post("users/update?user_id=" + user_id, user).then(result => this.retrieveAllUsers().then(() => result));
    }

    saveUser(user) {
        return baseAPI.post("users/save", user).then(result => this.retrieveAllUsers().then(() => result));
    }

    deleteUser(user_id) {
        return baseAPI.delete("users/delete?user_id=" + user_id).then(result => this.retrieveAllUsers().then(() => result));
    }
}

export default new DepartmentService();
