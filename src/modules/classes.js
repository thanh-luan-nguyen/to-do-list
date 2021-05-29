import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('qwertyuiopasdfghjklzxcvbnm_', 15)

export class Task {
    constructor(project, title, description, date, priority) {
        this.project = project;
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.done = false;
        this.id = nanoid();
    }
}

export class Project {
    constructor(title) {
        this.title = title;
        this.id = nanoid();
        this.tasks = [];
    }
}