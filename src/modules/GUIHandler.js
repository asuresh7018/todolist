import ProjectManager from "./ProjectManager.js";
import Project from "./Project.js";
import TodoItem from "./TodoItem.js";

class GUIHandler {
    constructor(ProjectManager) {
        this._projectManager = ProjectManager;
    }

    convertProjectToHTML(project) {
        return `<div class="project">
            <div class="projectTitle">${project.name}</div>
            <div class="projectDescription">${project.description}</div>
        </div>`;
    }

    getProjectsAsHTML() {
        let returnValue = "";
        for (const project of this._projectManager.getProjectObject()) {
            returnValue += this.convertProjectToHTML(project);
        }
        return returnValue;
    }

    displayProjectsInHTML () {
        const projectHTML = this.getProjectsAsHTML();
        const targetDiv = document.querySelector("#sidebarProjects");
        targetDiv.innerHTML = projectHTML;
    }

    convertTodoToHTML(todo) {

    }

    getTodosAsHTML() {

    }
}

export default GUIHandler;