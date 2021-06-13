import Project from './Project';
import Task from './Task';

export default class TodoList {
    constructor() {
        this.projects = [];
        this.projects.push(new Project("All"));
        this.projects.push(new Project("Today"));
        this.projects.push(new Project("This Week"));

        this.projects.push(new Project("freeCodeCamp"));
        this.getProject("freeCodeCamp").setTasks([
            new Task("freeCodeCamp", "ramdom-quote-machine", "organizing your JS code", "normal", new Date().toISOString().slice(0, 10)),
            new Task("freeCodeCamp", "url-shortener-microservice", "APIs and Microservice", "normal", "2021-10-30"),
        ])

        this.projects.push(new Project("The Odin Project"));
        this.getProject("The Odin Project").setTasks([
            new Task("The Odin Project", "to-do-list", "organizing your JS code", "normal", "2021-06-10"),
            new Task("The Odin Project", "weather-app", "asynchronous JS and APIs", "important", ""),
            new Task("The Odin Project", "shopping-cart", "React JS", "crucial", "2021-07-30"),
        ])
        this.getProject("The Odin Project").getTask("to-do-list").switchDoneValue();

        this.projects.push(new Project("Udemy Bootcamp"));
        this.getProject("Udemy Bootcamp").setTasks([
            new Task("Udemy Bootcamp", "yelpcamp", "final project of bootcamp by instructor Colt Steele", "crucial", "2021-12-30"),
        ])
    }
    setProjects(projects) {
        this.projects = projects;
    }
    getProjects() {
        return this.projects;
    }
    getNonDefaultProjects() {
        return this.projects.filter(project => project.getName() !== "All" || project.getName() !== "Today" || project.getName() !== "This Week")
    }
    addProject(newProjectName) {
        this.projects.push(new Project(newProjectName));
    }
    getProject(projectName) {
        return this.projects.find(project => project.getName() === projectName)
    }
    deleteProject(projectName) {
        this.projects = this.projects.filter(project => project.getName() !== projectName);
    }

    getAllTasks() {
        let allTasks = [];
        this.projects.forEach(project => {
            allTasks = [...allTasks, ...project.getTasks()]
        })
        return allTasks;
    }
    getTask(taskName) {
        for (let project of this.projects) {
            if (project.getTasks().some(task => task.getName() === taskName)) {
                return project.getTasks().find(task => task.getName() === taskName)
            }
        }
    }
}