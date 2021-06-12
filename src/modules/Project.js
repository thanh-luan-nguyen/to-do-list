import { isToday, isThisWeek } from 'date-fns'

export default class Project {
    constructor(name) {
            this.name = name;
            this.tasks = [];
            this.filter = "all";
        }
        // setName(name) {
        //     this.name = name;
        // }
    getName() {
        return this.name;
    }
    setTasks(tasks) {
        this.tasks = tasks;
    }
    getFilter() {
        return this.filter
    }
    changeFilter(filter) {
        this.filter = filter
    }
    getTasks() {
        return this.tasks;
    }
    getTodayTasks() {
        return this.tasks.filter(task => isToday(task.getDateFns()))
    }
    getWeekTasks() {
        return this.tasks.filter(task => isThisWeek(task.getDateFns(), { weekStartsOn: 1 }))
    }
    getTask(taskName) {
        return this.tasks.find(task => task.getName() === taskName)
    }
    addTask(task) {
        this.tasks.push(task);
    }
    deleteTask(taskID) {
        this.tasks = this.tasks.filter(task => task.getIDForTask() !== taskID)
    }
}