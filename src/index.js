import LocalStorage from "localstorage";
import Project from "./modules/Project.js";

function initStorage() {
    const projectList = Project.getProjectStorage();
    if (String(projectList.get("Data")[0]).includes("Error")) {
        console.log("No project data found. Initialising default project");
        projectList.put("Data", 
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

initStorage();
Project.initProjectObject();
console.log(Project.getProjectObject());