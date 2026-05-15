import LocalStorage from "localstorage";
import ProjectManager from "./modules/ProjectManager.js";
import Project from "./modules/Project.js";
import TodoItem from "./modules/TodoItem.js";
import GUIHandler from "./modules/GUIHandler.js";
import "./index.css";
import bookshelfImg from "./resources/bookshelf.svg";

function setupResources() {
   document.querySelectorAll(".logoImg").forEach(x => x.src=bookshelfImg);
}

setupResources();
ProjectManager.initStorage();
ProjectManager.initProjectObject();
const guiHandler = new GUIHandler(ProjectManager);
guiHandler.displayProjectsInHTML();
guiHandler.addGeneralEventListeners();

// Next todos:
// Convert ProjectManager project object to a GUI
   // Show all projects (Not necessary, but optional to implement addition/deletion of projects)
   // Show condensed todos under a project (Name/description/duedate, color based on priority)
   // Make todos expandable and editable
   // Delete a todo
// Allow gui elements to call functions on objects
// Redraw the gui when a change is made