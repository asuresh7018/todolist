import LocalStorage from "localstorage";

// BIG TODO: Project array should actually be an array of Project objects

// **The IIFE object that manages the page project data object
// initStorage: Determine if stored local data exists and create it if not
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
        for (const todo of todoJson) {
        returnValue.push({
            "id": crypto.randomUUID(),
            "title": todo["title"], 
            "description": todo["description"],
            "dueDate": todo["dueDate"],
            "priority": todo["priority"],
            "notes": todo["notes"]})
        }
        
        return returnValue;
    }

    const initStorage = () => {
        if (String(projectStorage.get("Data")[0]).includes("Error")) {
            console.log("No project data found. Initialising default project");
            projectStorage.put("Data", 
            `{
            "projects": [
                {
                    "name": "Default Project",
                    "description": "Default project description",
                    "todoList": [
                        {
                        "title": "Sample Todo",
                        "description": "Description Sample",
                        "dueDate": "Sample due date",
                        "priority": "Sample priority",
                        "notes": "Sample notes"
                        }
                    ]
                }
            ]
            }`);
        }
    }

    const writeToStorage = () => {
        projectStorage.put("Data", `{"projects": [${JSON.stringify(projects)}]}`);
    }

    const addTodoToProjectById = (id, todoItem) => {
        // Do stuff. TODO
        // Should accept a TodoItem object
    }

    const addProject = (project) => {
        // Do stuff. TODO
        // Should accept a Project object
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

    return { initStorage, getProjectStorage, initProjectObject, getProjectObject, writeToStorage, addTodoToProjectById, addProject, deleteProjectById, deleteTodoById };
})();

export default ProjectManager;