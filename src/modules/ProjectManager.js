import LocalStorage from "localstorage";
import Project from "../modules/Project.js";
import TodoItem from "../modules/TodoItem.js";

// **The IIFE object that manages the page project data object
// initStorage: Determine if stored local data exists and create it if not
// getProjectStorage: Provide copy of storage object with local storage data
// initProjectObject: Constructs project object from local storage
// getProjectObject: Provides copy of current project object
// writeToStorage: Write current project object to storage
// AddTodoToProjectById: Add a todolist to a project using the project's id to locate the object
// AddProject: Add a new project with a new unique id
// DeleteProjectById: Delete a project and all its TODOs by id
// DeleteTodoById: Delete a todo item by id
const ProjectManager = (() => {
    const projectStorage = new LocalStorage("projectList");
    let projects = JSON.parse("[]"); // This represents the internal array of project data

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
                const proj = new Project(crypto.randomUUID(), project["name"], project["description"]);
                if (JSON.stringify(project["todoList"]) !== undefined) {
                    for (const todo of project["todoList"]) {
                        proj.addTodoItem(
                            new TodoItem(
                                crypto.randomUUID(),
                                todo["title"],
                                todo["description"],
                                todo["dueDate"],
                                todo["priority"],
                                todo["notes"]
                            ));
                    }
                }
                projects.push(proj);
            }
        }
    }

    const initStorage = () => {
        if (String(projectStorage.get("Data")[0]).includes("Error")) {
            console.log("No project data found. Initialising default project");
            projectStorage.put("Data", 
            `{
            "projects": [
                {
                    "name": "Default Project",
                    "description": "This is the default project.",
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
        let parsedJson = JSON.parse(`{"projects": []}`);
        for (const project of projects) {
            parsedJson["projects"].push(project.toJson());
        }
        projectStorage.put("Data", JSON.stringify(parsedJson));
    }

    const addTodoToProjectById = (id, todoItem) => {
        for (const project of projects) {
            if (project.id === projectId) {
                project.todoList.push(todoItem);
            }
        }
    }

    const addProject = (project) => {
        projects.push(project);
    }

    const deleteProjectById = (id) => {
        projects = projects.filter(project => project.id !== id);
        writeToStorage();
    }

    const deleteTodoById = (projectId, id) => {
        
        for (const project of projects) {
            if (project.id === projectId) {
                project.removeTodoById(id);
            }
        }
        writeToStorage();
    }

    return { initStorage, getProjectStorage, initProjectObject, getProjectObject, writeToStorage, addTodoToProjectById, addProject, deleteProjectById, deleteTodoById };
})();

export default ProjectManager;