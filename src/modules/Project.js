import TodoItem from "./TodoItem.js";

class Project {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.todoList = [];
    }

    removeTodoById(id) {
        this.todoList = this.todoList.filter(todoItem => todoItem.id !== id);
    }

    addTodoItem(todoItem) {
        this.todoList.push(todoItem);
    }

    toJson() {
        let jsonString = `
                {
                    "name": "${this.name}",
                    "description": "${this.description}}",
                    "todoList": []
                }`;
        let parsedJson = JSON.parse(jsonString);
        for (const todoItem of this.todoList) {
            parsedJson["todoList"].push(todoItem.toJson());
        }
        return parsedJson;
    }
    
    get id() {
        return this.id;
    }

    get name() {
        return this.name;
    }

    set name(value) {
        this.name = value;
    }

    get description() {
        return this.description;
    }

    set description(value) {
        this.description = value;
    }

    get todoList() {
        return this.todoList;
    }
}

export default Project;