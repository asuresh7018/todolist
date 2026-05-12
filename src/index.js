import LocalStorage from "localstorage";

const Project = (() => {
    const projectList = new LocalStorage("projectList");

    const getProjectList = function() {
        return projectList;
    }

    return { getProjectList };
})();

function initStorage() {
    const projectList = Project.getProjectList();
    if (String(projectList.get("Data")[0]).includes("Error")) {
        console.log("No project data found. Initialising default project");
        projectList.put("Data", 
        `{
	    "projects": [
            {
		        "name": "Default Project",
		        "description": "Default project description",
		        "todoList": [
		        ]
            }
	    ]
        }`);
    }
}

initStorage();