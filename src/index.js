import LocalStorage from "localstorage";
import ProjectManager from "./modules/ProjectManager.js";
import Project from "./modules/Project.js";
import TodoItem from "./modules/TodoItem.js";

ProjectManager.initStorage();
ProjectManager.initProjectObject();