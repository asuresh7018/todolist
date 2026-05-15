import ProjectManager from "./ProjectManager.js";
import Project from "./Project.js";
import TodoItem from "./TodoItem.js";
import { format } from "date-fns";

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
                const allButtons = document.querySelectorAll("button");
                allButtons.forEach(x => x.dataset["projectid"] = project.dataset["id"]);
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
                <div class="todoHeading priority-${todo.priority.toLowerCase()}">
                    <div class="todoTitle">${todo.title}</div>
                    <div class="todoDescription">${todo.description}</div>
                    <div class="todoDueDate">${format(todo.dueDate, "dd/MM/yyyy")}</div>
                    <div class="todoExpandDiv"><button class="expandTodo" data-id="${todo.id}">+</button></div>
                </div>
                <div class="todoBody detailHidden" data-id="${todo.id}">
                    <div class="todoBodyText">${todo.notes}</div>
                    <div id="todoButtons">
                    <button class="editTodo" data-id="${todo.id}">Edit</button>
                    <button class="deleteTodo" data-id="${todo.id}">Delete</button>
                </div>
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
    }

    addEventListenerToTodos() {
        // Expand buttons
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

        // Edit buttons
        const editButtons = document.querySelectorAll(".editTodo");
        for (const editButton of editButtons) {
            editButton.addEventListener("click", (e) => {
                const todo = this._projectManager.getTodoById(editButton.dataset["id"]);
                // Set form fields
                document.querySelector("#hiddenEditId").value = todo.id;
                document.querySelector("#editTitle").value = todo.title;
                document.querySelector("#editDescription").value = todo.description;
                document.querySelector("#editDate").value = format(todo.dueDate, "yyyy-MM-dd");
                document.querySelector("#editPriority").value = todo.priority;
                document.querySelector("#editNotes").value = todo.notes;
                document.querySelector("#editTodoDialog").showModal();
            });
        }

        // Delete buttons
        const deleteButtons = document.querySelectorAll(".deleteTodo");
        for (const deleteButton of deleteButtons) {
            deleteButton.addEventListener("click", (e) => {
                const todo = this._projectManager.getTodoById(deleteButton.dataset["id"]);
                document.querySelector("#hiddenDeleteId").value = todo.id;
                document.querySelector("#deleteTodoDialog").showModal();
            })
        }
    }

    addGeneralEventListeners() {
        // New todo button
        const newButton = document.querySelector("#newTodo");
        const newDialog = document.querySelector("#newTodoDialog");
        newButton.addEventListener("click", () => { 
            const selectedProject = document.querySelector(".activeProject");
            if (selectedProject !== null) {
                newDialog.showModal(); 
            }
        });

        // New todo dialog - Regarding cancelling and submitting form
        // Submit button
        const submitButtonNew = document.querySelector("#submitNewTodo");
        submitButtonNew.addEventListener("click", (e) => {
            const formData = document.querySelector("#newTodoDialog .dialogFormForm");
            const formObject = {
                "title": formData["title"].value,
                "description": formData["description"].value,
                "dueDate": formData["dueDate"].value,
                "priority": formData["priority"].value,
                "notes": formData["notes"].value,
            };
            // Validate data
            if (formObject["title"] !== "" && formObject["description"] !== "" && formObject["dueDate"] !== "" & formObject["priority"] != "") {
                const [year, month, day] = formObject["dueDate"].split("-");
                const newTodo = new TodoItem(crypto.randomUUID(), formObject["title"], formObject["description"], new Date(year,month-1,day), formObject["priority"], formObject["notes"]);
                this._projectManager.addTodoToProjectById(submitButtonNew.dataset["projectid"], newTodo);
                const project = this._projectManager.getProjectById(submitButtonNew.dataset["projectid"]);
                document.querySelector("#newTodoDialog").close();
                this.displayTodosInHTML(project.id, project.name);
            }
            else {
                console.log("Invalid form data!");
            }
        });
        // Cancel button
        document.querySelector("#closeDialogNew").addEventListener("click", (e) => {
            document.querySelector("#newTodoDialog").close();
        })

        // Edit todo dialog - Regarding cancelling and submitting form
        // Submit button
        const submitButtonEdit = document.querySelector("#editTodo");
        submitButtonEdit.addEventListener("click", (e) => {
            const formData = document.querySelector("#editTodoDialog .dialogFormForm");
            const formObject = {
                "id": formData["todoId"].value,
                "title": formData["title"].value,
                "description": formData["description"].value,
                "dueDate": formData["dueDate"].value,
                "priority": formData["priority"].value,
                "notes": formData["notes"].value,
            };
            const todo = this._projectManager.getTodoById(formObject["id"]);
            // Validate data
            if (formObject["title"] !== "" && formObject["description"] !== "" && formObject["dueDate"] !== "" & formObject["priority"] != "") {
                const [year, month, day] = formObject["dueDate"].split("-");
                todo.title = formObject["title"];
                todo.description = formObject["description"];
                todo.dueDate = new Date(year,month-1,day);
                todo.priority = formObject["priority"];
                todo.notes = formObject["notes"];
                this._projectManager.updateTodo(todo);
                const project = this._projectManager.getProjectById(submitButtonEdit.dataset["projectid"]);
                document.querySelector("#editTodoDialog").close();
                this.displayTodosInHTML(project.id, project.name);
            }
            else {
                console.log("Invalid form data!");
            }
        });
        // Cancel button
        document.querySelector("#closeDialogEdit").addEventListener("click", (e) => {
            document.querySelector("#editTodoDialog").close();
        })

        // Delete todo dialog - Regarding cancelling and submitting form
        // Delete/Yes button
        const submitButtonDelete = document.querySelector("#deleteTodo");
        submitButtonDelete.addEventListener("click", (e) => {
            const formData = document.querySelector("#deleteTodoDialog .dialogFormForm");
            const todoId = formData["todoId"].value;
            const project = this._projectManager.getProjectById(submitButtonDelete.dataset["projectid"]);
            this._projectManager.deleteTodoById(project.id, todoId);
            document.querySelector("#deleteTodoDialog").close();
            this.displayTodosInHTML(project.id, project.name);
        });

        // Cancel button
        document.querySelector("#closeDialogDelete").addEventListener("click", (e) => {
            document.querySelector("#deleteTodoDialog").close();
        })
    }
}

export default GUIHandler;