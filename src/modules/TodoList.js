import Project from './Project';
import Task from './Task';

export default class TodoList {
    constructor() {
        this.projects = [];
        this.projects.push(new Project("All"));
        this.projects.push(new Project("Today"));
        this.projects.push(new Project("This Week"));
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
    deleteTask(projectName, taskID) {
        const project = this.getProject(projectName);
        project.deleteTask(taskID);
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