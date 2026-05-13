// Please complete the TodoItem class and its properties
// Should generate a random id when created

import { isThisSecond } from "date-fns";

class TodoItem {
    constructor(id, name, title, description, dueDate, priority, notes) {
        this.id = id;
        this.name = name;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }

    toJson() {
        let jsonString = `
                {
                    "title": "${this.title}",
                    "description": "${this.description}",
                    "dueDate": "${this.dueDate}",
                    "priority": "${this.priority}",
                    "notes": "${this.notes}"
                 }`
        return JSON.parse(jsonString);
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

    get title() {
        return this.title;
    }

    set title(value) {
        this.title = value;
    }

    get description() {
        return this.description;
    }

    set description(value) {
        this.description = value;
    }

    get dueDate() {
        return this.dueDate;
    }

    set dueDate(value) {
        this.dueDate = value;
    }

    get priority() {
        return this.priority;
    }

    set priority(value) {
        this.priority = value;
    }

    get notes() {
        return this.notes;
    }

    set notes(value) {
        this.notes = value;
    }
}

export default TodoItem;