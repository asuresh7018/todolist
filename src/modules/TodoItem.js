import { format } from "date-fns";

class TodoItem {
    constructor(id, title, description, dueDate, priority, notes) {
        this._id = id;
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._notes = notes;
    }

    toJson() {
        let jsonString = `
                {
                    "title": "${this._title}",
                    "description": "${this._description}",
                    "dueDate": "${format(this._dueDate, "yyyy-MM-dd")}",
                    "priority": "${this._priority}",
                    "notes": "${this._notes}"
                 }`
        return JSON.parse(jsonString);
    }
    
    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }
    
    set title(value) {
        this._title = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get dueDate() {
        return this._dueDate;
    }

    set dueDate(value) {
        this._dueDate = value;
    }

    get priority() {
        return this._priority;
    }

    set priority(value) {
        this._priority = value;
    }

    get notes() {
        return this._notes;
    }

    set notes(value) {
        this._notes = value;
    }
}

export default TodoItem;