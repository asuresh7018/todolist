import LocalStorage from "localstorage";

// The IIFE object that manages all the page project data
const Project = (() => {
    const projectStorage = new LocalStorage("projectList");
    const projects = []; // This represents the internal array of project data

    const getProjectStorage = function() {
        return projectStorage;
    }

    const getProjectObject = function () {
        return projects;
    }

    // projectData - JSON String of project data obtained from storage
    const initProjectObject = () => {
        const projectJson = JSON.parse(projectStorage.get("Data")[1]);
        for (const project of projectJson["projects"]) {
            projects.push({"name": project["name"], 
                "description": project["description"],
                "todoList": createTodoArray(project["todoList"])})
        }
    }

    const createTodoArray = (todoJson) => {
        const returnValue = [];
        for (const todo of todoJson) {
            returnValue.push({"title": todo["title"], 
                "description": todo["description"],
                "dueDate": todo["dueDate"],
                "priority": todo["priority"],
                "notes": todo["notes"]})
        }
        return returnValue;
    }

    const writeToStorage = () => {
        projectStorage.put("Data", JSON.stringify(projects));
    }

    return { getProjectStorage, initProjectObject, getProjectObject, writeToStorage };
})();

export default Project;