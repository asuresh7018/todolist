import LocalStorage from "localstorage";

// **The IIFE object that manages the page project data object
// getProjectStorage: Provide copy of storage object with local storage data
// initProjectObject: Constructs project object from local storage
// getProjectObject: Provides copy of current project object
// writeToStorage: Write current project object to storage
// AddTodoToProjectById TODO: Add a todolist to a project using the project's id to locate the object
// AddProject TODO: Add a new project with a new unique id
// DeleteProjectById: Delete a project and all its TODOs by id
// DeleteTodoById: Delete a todo item by id
const ProjectManager = (() => {
    const projectStorage = new LocalStorage("projectList");
    let projects = []; // This represents the internal array of project data

    const getProjectStorage = function() {
        return projectStorage;
    }

    const getProjectObject = function () {
        return projects;
    }

    // projectData - JSON String of project data obtained from storage
    const initProjectObject = () => {
        const projectJson = JSON.parse(projectStorage.get("Data")[1]);
        if (JSON.stringify(projectJson) !== "[]") {
            for (const project of projectJson["projects"]) {
                projects.push({
                    "id": crypto.randomUUID(),
                    "name": project["name"], 
                    "description": project["description"],
                    "todoList": (JSON.stringify(project["todoList"]) === undefined ? [] : createTodoArray(project["todoList"]))
                })
            }
        }
    }

    const createTodoArray = (todoJson) => {
        const returnValue = [];
        if (JSON.stringify(todoJson) !== "[]") {
            for (const todo of todoJson) {
            returnValue.push({
                "id": crypto.randomUUID(),
                "title": todo["title"], 
                "description": todo["description"],
                "dueDate": todo["dueDate"],
                "priority": todo["priority"],
                "notes": todo["notes"]})
            }
        }
        
        return returnValue;
    }

    const writeToStorage = () => {
        projectStorage.put("Data", `{"projects": [${JSON.stringify(projects)}]}`);
    }

    const addTodoToProjectById = (id) => {
        // Do stuff. TODO
        // Probably need to pass in form data. It should return the generated object
    }

    const addProject = () => {
        // Do stuff. TODO
        // Probably need to pass in form data. It should return the generated object
    }

    const deleteProjectById = (id) => {
        projects = projects.filter(project => project["id"] !== id);
        writeToStorage();
    }

    const deleteTodoById = (projectId, id) => {
        for (const project of projects) {
            if (project["id"] === projectId) {
                project["todoList"] = project["todoList"].filter(todoItem => todoItem["id"] !== id);
            }
        }
        writeToStorage();
    }

    return { getProjectStorage, initProjectObject, getProjectObject, writeToStorage, addTodoToProjectById, addProject, deleteProjectById, deleteTodoById };
})();

export default ProjectManager;