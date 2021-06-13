import TodoList from './TodoList'
import Project from './Project'
import Task from './Task'

export default class Storage {
  static saveTodoList(todoList) {
    localStorage.setItem('TodoList', JSON.stringify(todoList))
  }
  static getTodoList() {
    const todoList = Object.assign(
      new TodoList(),
      JSON.parse(localStorage.getItem('TodoList'))
    )
    todoList.setProjects(
      todoList
        .getProjects()
        .map(project => Object.assign(new Project(), project))
    )
    todoList
      .getProjects()
      .forEach(project =>
        project.setTasks(
          project.getTasks().map(task => Object.assign(new Task(), task))
        )
      )
    return todoList
  }
  static addProject(newProjectName) {
    const todoList = this.getTodoList()
    todoList.addProject(newProjectName)
    this.saveTodoList(todoList)
  }
  static addNewTaskToThisProject(projectName, newTask) {
    const todoList = this.getTodoList()
    todoList.getProject(projectName).addTask(newTask)
    this.saveTodoList(todoList)
  }
  static deleteTaskFromThisProject(projectName, taskID) {
    const todoList = this.getTodoList()
    todoList.getProject(projectName).deleteTask(taskID)
    this.saveTodoList(todoList)
  }
  static getProject(projectName) {
    return this.getTodoList().getProject(projectName)
  }
  static deleteProject(projectName) {
    const todoList = this.getTodoList()
    todoList.deleteProject(projectName)
    this.saveTodoList(todoList)
  }
  static getTasksFromOneProject(projectName) {
    return this.getProject(projectName).getTasks()
  }
  static getDefaultTasks(defaultProject) {
    const projects = this.getTodoList().getNonDefaultProjects()
    let tasks = []
    switch (defaultProject) {
      case 'All':
        projects.forEach(project => (tasks = tasks.concat(project.getTasks())))
        break
      case 'Today':
        projects.forEach(
          project => (tasks = tasks.concat(project.getTodayTasks()))
        )
        break
      case 'This Week':
        projects.forEach(
          project => (tasks = tasks.concat(project.getWeekTasks()))
        )
        break
    }
    return tasks
  }
  static changeProjectTaskFilter(projectName, filter) {
    const todoList = this.getTodoList()
    todoList.getProject(projectName).changeFilter(filter)
    this.saveTodoList(todoList)
  }
  static getFilterOfProject(projectName) {
    return this.getProject(projectName).getFilter()
  }
}
