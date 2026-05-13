import TodoItem from "./TodoItem.js";

class Project {
    constructor(id, name, description) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._todoList = [];
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
                    "name": "${this._name}",
                    "description": "${this._description}",
                    "todoList": []
                }`;
        let parsedJson = JSON.parse(jsonString);
        for (const todoItem of this.todoList) {
            parsedJson["todoList"].push(todoItem.toJson());
        }
        return parsedJson;
    }
    
    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get todoList() {
        return this._todoList;
    }
}

export default Project;