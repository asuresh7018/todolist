import LocalStorage from "localstorage";
import ProjectManager from "./modules/ProjectManager.js";

function initStorage() {
    const projectStorage = ProjectManager.getProjectStorage();
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

initStorage();
ProjectManager.initProjectObject();
