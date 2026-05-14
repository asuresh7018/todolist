import ProjectManager from "./ProjectManager.js";
import Project from "./Project.js";
import TodoItem from "./TodoItem.js";

class GUIHandler {
    constructor(ProjectManager) {
        this._projectManager = ProjectManager;
    }

    convertProjectToHTML(project) {
        return `<div class="project" data-id="${project.id}" data-name="${project.name}">
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

    addEventListenerToProjects() {
        const projects = document.querySelectorAll(".project");
        for (const project of projects) {
            project.addEventListener("click", () => {
                projects.forEach(x => x.className = "project");
                this.displayTodosInHTML(project.dataset["id"], project.dataset["name"]);
                project.className = "project activeProject";
            });
        }
    }

    displayProjectsInHTML () {
        const projectHTML = this.getProjectsAsHTML();
        const targetDiv = document.querySelector("#sidebarProjects");
        targetDiv.innerHTML = projectHTML;
        this.addEventListenerToProjects();
    }

    convertTodoToHTML(todo) {
        return `<div class="todo">
                <div class="todoHeading">
                    <div class="todoTitle">${todo.title}</div>
                    <div class="todoDescription">${todo.description}</div>
                    <div class="todoDueDate">${todo.dueDate}</div>
                    <div class="todoExpandDiv"><button class="expandTodo" data-id="${todo.id}">+</button></div>
                </div>
                <div class="todoBody detailHidden" data-id="${todo.id}">
                    Stuff that expands.
                </div>
            </div>`;
    }

    getTodosAsHTML(projectId) {
        let returnvalue = "";
        let project = this._projectManager.getProjectObject().filter(x => x.id === projectId)[0];
        for (const todo of project.todoList) {
            returnvalue += this.convertTodoToHTML(todo);
        }
        return returnvalue;
    }

    displayTodosInHTML(projectId, projectName) {
        document.querySelector("#contentHeader").textContent = `My Todo List - ${projectName}`;
        const todoHTML = this.getTodosAsHTML(projectId);
        const targetDiv = document.querySelector("#contentTodoContainer");
        targetDiv.innerHTML = todoHTML;
        this.addEventListenerToTodos();
        console.log("Tried to display todos for project " + projectId);
    }

    addEventListenerToTodos() {
        const expandButtons = document.querySelectorAll(".expandTodo");
        for (const button of expandButtons) {
            button.addEventListener("click", (e) => {
                const todoBody = document.querySelector(`.todoBody[data-id="${button.dataset["id"]}"]`);
                todoBody.classList.toggle('detailHidden')
                if (button.textContent === "+") {
                    button.textContent = "-"
                }
                else {
                    button.textContent = "+";
                }
            });
        }
    }
}

export default GUIHandler;