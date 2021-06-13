import Storage from './Storage'
import Task from './Task'
import { performUIEffects } from './UIEffects'
import { isPast, differenceInDays } from 'date-fns'

export default class UI {
  static loadHomePage() {
    performUIEffects()
    UI.initDefaultProjects()
    UI.loadProjects()
    UI.initSubmitAddProject()
    UI.initSubmitEditTask()
  }
  static initDefaultProjects() {
    const defaultProjects = document.querySelectorAll('[default-project]')
    defaultProjects.forEach(project => {
      project.addEventListener('click', () => {
        const defaultProjectName = project.querySelector('span').innerText
        switch (defaultProjectName) {
          case 'All':
            UI.loadProject('All')
            break
          case 'Today':
            UI.loadProject('Today')
            break
          case 'This Week':
            UI.loadProject('This Week')
            break
        }
      })
    })
  }
  static loadProjects() {
    UI.clearAllProjects()
    const todoList = Storage.getTodoList()
    todoList.getProjects().forEach(project => {
      if (
        project.getName() === 'All' ||
        project.getName() === 'Today' ||
        project.getName() === 'This Week'
      )
        return
      UI.addProjectToUI(project.getName())
    })
    UI.initAllButtonProjects()
  }
  static clearAllProjects() {
    const projectList = document.querySelector('[project-list]')
    projectList.innerHTML = ``
  }

  // init submit project START
  static initSubmitAddProject() {
    document
      .querySelector('[submit-add-project]')
      .addEventListener('submit', this.addProject)
  }
  static addProject(e) {
    e.preventDefault()
    const newProjectName = document.querySelector('[input-project-name]').value

    if (!UI.projectNameAlreadyExists(newProjectName)) {
      Storage.addProject(newProjectName)
      UI.addProjectToUI(newProjectName)
      UI.initAllButtonProjects()
      UI.clearAddProjectInput()
      document.querySelector('[button-cancel-project]').click()
    }
    UI.initButtonProject(newProjectName).click()
  }
  static addProjectToUI(projectName) {
    const projectList = document.querySelector('[project-list]')
    projectList.innerHTML += `
            <div class="task-view-as" project><i class="fas fa-tasks me-3"></i><span>${projectName}</span></div>`
    UI.closeNavInSmallDevices()
  }
  // init submit project END

  static initAllButtonProjects() {
    document.querySelectorAll('[project]').forEach(project => {
      const projectName = project.querySelector('span').innerText
      UI.initButtonProject(projectName)
    })
  }
  static initButtonProject(projectName) {
    const projects = Array.from(document.querySelectorAll('[project]'))
    const project = projects.find(
      project => project.querySelector('span').innerText === projectName
    )

    project.addEventListener('click', () => {
      UI.loadProject(projectName)
    })
    return project
  }
  static loadProject(projectName) {
    UI.loadProjectPageContentToUI(projectName)
    UI.addActiveStyle(projectName)
    UI.initSubmitAddNewTask()
    if (
      projectName !== 'All' &&
      projectName !== 'Today' &&
      projectName !== 'This Week'
    )
      UI.initDeleteProjectButton()
    UI.initSortButton()
    UI.addAllTasksOfThisProjectToUI()

    UI.closeNavInSmallDevices()
  }
  static projectNameAlreadyExists(projectName) {
    const todoList = Storage.getTodoList()
    if (
      todoList
        .getProjects()
        .some(
          project =>
            project.getName().toLowerCase() === projectName.toLowerCase()
        )
    ) {
      alert('Project Name Already Exists.')
      return true
    }
    return false
  }
  static loadProjectPageContentToUI(projectName) {
    const projectContentPage = document.querySelector('.content')
    let addTaskInnerHTML = `
        <div class="add-task mb-2" data-bs-toggle="modal" data-bs-target="#add-task" button-add-new-task><i class="fas fa-plus me-3"><span>New Task</span></i></div>
        `
    if (projectName === 'Today' || projectName === 'This Week')
      addTaskInnerHTML = ''
    let deleteButton = `
        <i class="delete-project-button fas fa-times" title="Delete Project" button-delete-project></i>`
    if (
      projectName === 'All' ||
      projectName === 'Today' ||
      projectName === 'This Week'
    )
      deleteButton = ''
    projectContentPage.innerHTML = ''
    projectContentPage.innerHTML += `
            <div class="view-as d-flex justify-content-between">
                <span project-name>${projectName}</span>
                <div class="dropstart">
                    <button type="button" class="btn dropdown-toggle shadow-none " data-bs-toggle="dropdown"><span>Filter</span>: <em class="me-1" sort-by>${Storage.getFilterOfProject(
                      projectName
                    )}</em></button>
                    <ul class="dropdown-menu">
                        <li class="dropdown-item" data-sort>all</li>
                        <li class="dropdown-item" data-sort>incomplete</li>
                    </ul>
                </div>
            </div>
            ${addTaskInnerHTML}
            <div class="task-list">
            </div>
            ${deleteButton}
        `
    UI.sortSelectEffect()
  }
  static addActiveStyle(projectName) {
    const projects = document.querySelectorAll('[project]')
    const defaultProjects = document.querySelectorAll('[default-project]')
    projects.forEach(project => project.classList.remove('active'))
    defaultProjects.forEach(project => project.classList.remove('active'))

    if (
      projectName === 'All' ||
      projectName === 'Today' ||
      projectName === 'This Week'
    )
      addActiveStyleTo(defaultProjects)
    else addActiveStyleTo(projects)

    function addActiveStyleTo(thisOne) {
      thisOne.forEach(project => {
        if (project.querySelector('span').innerText === projectName) {
          project.classList.add('active')
        }
      })
    }
  }
  static initSubmitAddNewTask() {
    const addNewTaskSubmit = document.querySelector('[submit-add-new-task]')
    addNewTaskSubmit.addEventListener('submit', this.addOneTask)
  }

  // init Sort Tasks
  static initSortButton() {
    const items = document.querySelectorAll('[data-sort]')
    items.forEach(item => item.addEventListener('click', UI.filterTasks))
  }
  static filterTasks() {
    const filterBy = this.innerText
    Storage.changeProjectTaskFilter(UI.getCurrentProjectName(), filterBy)
    UI.addAllTasksOfThisProjectToUI()
  }

  // delete Project
  static initDeleteProjectButton() {
    const buttonDeleteProject = document.querySelector(
      '[button-delete-project]'
    )
    buttonDeleteProject.addEventListener('click', this.deleteThisProject)
  }
  static deleteThisProject() {
    const projectName = document.querySelector('[project-name]').innerText
    Storage.deleteProject(projectName)
    UI.clearProjectUIContent()
    UI.loadProjects()
  }
  static clearProjectUIContent() {
    const projectContentPage = document.querySelector('.content')
    projectContentPage.innerHTML = ''
    UI.closeNavInSmallDevices()
  }
  // delete Project END

  static addAllTasksOfThisProjectToUI() {
    const projectName = UI.getCurrentProjectName()
    let tasks = Storage.getTasksFromOneProject(projectName)

    if (
      projectName === 'All' ||
      projectName === 'Today' ||
      projectName === 'This Week'
    )
      tasks = Storage.getDefaultTasks(projectName)

    if (Storage.getFilterOfProject(projectName) === 'incomplete')
      tasks = tasks.filter(task => task.getDone() === false)

    document.querySelector('.task-list').innerHTML = ''
    tasks.forEach(task => {
      document.querySelector('.task-list').innerHTML += `
                    <div TASK${task.getIDForTask()}>
                        <div class="task">
                            <div class="first-group">
                                <input class="form-check-input shadow-none me-3" type="checkbox"  ${task.getDoneCheckboxState()} done-checkbox="${task.getProjectName()}"/>
                                <span>${task.getName()}</span>
                            </div>
                            <div class="second-group">
                                <i class="icon fas fa-${task.getIconPriority()}"></i>
                                <button type="button" class="details btn btn-secondary shadow-none" data-bs-toggle="collapse" data-bs-target="#_${task.getIDForTask()}">Details</button>
                                <span class="date">${task.getDateFormatted()}</span>
                                <i class="fas fa-edit edit" data-bs-toggle="modal" title="edit" data-bs-target="#edit-task" edit-button="${task.getName()}"></i>
                                <i class="fas fa-trash-alt delete" delete-task="${task.getIDForTask()}" title="delete"></i>
                            </div>
                        </div>
                        <div class="collapse" id="_${task.getIDForTask()}">
                            <div class="card card-body rounded-0 border-top-0 border-bottom-0 pt-2 pb-0" style="background-color: oldlace;">
                                <p class="mb-0"><b>Project: </b><span>${task.getProjectName()}</span></p>
                                <p class="mb-0"><b>Date: </b><span class="date">${task.getDateFormatted()}</span></p>
                                <p class="mb-0"><b>Priority: </b>${task.getPriority()} <i class="icon fas fa-${task.getIconPriority()}"></i></p>
                                <p class="mb-0">
                                    <b>Description: </b>${task.getDescript()}
                                </p>
                            </div>
                        </div>
                    </div>`
      UI.isPastEffect(task)
      UI.addDoneEffect(task)
    })
    UI.initAllCheckBoxes()
    UI.initAllEditButtons()
    UI.initAllDeleteButtons()
  }
  // done Checkbox
  static addDoneEffect(task) {
    const TASK = document.querySelector(`[TASK${task.getIDForTask()}]`)
    const icons = TASK.querySelectorAll(`i.icon`)
    console.log(icons)
    if (task.getDone()) {
      TASK.style.color = 'rgb(0,0,0,0.2)'
      TASK.querySelector('.details').style.opacity = '0.05'
      icons.forEach(icon => (icon.style.opacity = '0.2'))
    } else {
      TASK.style.color = 'rgb(0,0,0)'
      TASK.querySelector('.details').style.opacity = '1'
      icons.forEach(icon => (icon.style.opacity = '1'))
    }
  }
  static initAllCheckBoxes() {
    const checkboxes = document.querySelectorAll('[done-checkbox]')
    checkboxes.forEach(checkbox =>
      checkbox.addEventListener('change', this.switchDoneStatus)
    )
  }
  static switchDoneStatus() {
    this.checked
      ? this.removeAttribute('checked')
      : this.setAttribute('checked', '')
    UI.addDoneEffectAll(this)
  }
  static addDoneEffectAll(box) {
    const taskName = box.nextElementSibling.innerText
    const todoList = Storage.getTodoList()
    const task = todoList
      .getProject(box.getAttribute('done-checkbox'))
      .getTask(taskName)
    task.switchDoneValue()
    // UI.addDoneEffect(task);
    Storage.saveTodoList(todoList)
    UI.addAllTasksOfThisProjectToUI()
  }
  // edit
  static initAllEditButtons() {
    const buttonsEditTask = document.querySelectorAll('[edit-button]')
    buttonsEditTask.forEach(button =>
      button.addEventListener('click', UI.openEditTask)
    )
  }
  static taskNameBeingEdited = ''
  static openEditTask() {
    const taskName = this.getAttribute('edit-button')
    ;(function prepopulateEditTask() {
      const todoList = Storage.getTodoList()
      const task = todoList.getTask(taskName)
      document.querySelector('[edit-task-project-name]').innerText =
        task.getProjectName()
      document.querySelector('[edit-task-name]').value = task.getName()
      document.querySelector('[edit-task-descript]').value = task.getDescript()
      document.querySelector('[edit-task-priority]').value = task.getPriority()
      document.querySelector('[edit-task-date]').value = task.getDate()
    })()
    UI.taskNameBeingEdited = taskName
  }
  static initSubmitEditTask() {
    document
      .querySelector('[submit-edit-task]')
      .addEventListener('submit', () => {
        UI.updateTask(UI.taskNameBeingEdited)
      })
  }
  static updateTask(taskName) {
    if (!UI.taskNameAlreadyExists(true, taskName)) {
      const todoList = Storage.getTodoList()
      const task = todoList.getTask(taskName)

      task.setName(document.querySelector('[edit-task-name]').value)
      task.setDescript(document.querySelector('[edit-task-descript]').value)
      task.setPriority(document.querySelector('[edit-task-priority]').value)
      task.setDate(document.querySelector('[edit-task-date]').value)

      Storage.saveTodoList(todoList)
      document.querySelector('[button-cancel-edit-task]').click()
      UI.addAllTasksOfThisProjectToUI()
    }
  }
  static saveTaskToStorage() {
    const newTaskInfos = [
      document.querySelector('[task-name]').value,
      document.querySelector('[task-descript]').value,
      document.querySelector('[task-priority]').value,
      document.querySelector('[task-date]').value,
    ]
    const thisProjectName = UI.getCurrentProjectName()

    Storage.addNewTaskToThisProject(
      thisProjectName,
      new Task(thisProjectName, ...newTaskInfos)
    )
  }
  // delete
  static initAllDeleteButtons() {
    const buttonsDeleteTask = document.querySelectorAll('[delete-task]')
    buttonsDeleteTask.forEach(button =>
      button.addEventListener('click', UI.deleteThisTask)
    )
  }
  static deleteThisTask() {
    const taskID = this.getAttribute('delete-task')
    document.querySelector(`[TASK${taskID}]`).outerHTML = ''
    Storage.deleteTaskFromThisProject(UI.getCurrentProjectName(), taskID)
  }
  // effects
  static isPastEffect(task) {
    const date = document.querySelector(
      `[TASK${task.getIDForTask()}] span.date`
    )
    const descriptDate = document.querySelector(
      `#_${task.getIDForTask()} .date`
    )

    const d = task
      .getDate()
      .split('-')
      .map(a => parseInt(a))
    const D = new Date()
      .toISOString()
      .slice(0, 10)
      .split('-')
      .map(a => parseInt(a))

    if (
      differenceInDays(
        new Date(d[0], d[1] - 1, d[2]),
        new Date(D[0], D[1] - 1, D[2])
      ) <= 3
    ) {
      date.style.cssText = `color:rgb(240, 173, 78${
        task.getDone() ? ', 0.2' : ', 1'
      });font-weight: 900;`
      descriptDate.style.cssText = `color:rgb(240, 173, 78${
        task.getDone() ? ', 0.2' : ', 1'
      });font-weight: 900;`
    }

    if (isPast(new Date(d[0], d[1] - 1, d[2] + 1))) {
      date.style.cssText = `color:rgb(255, 0, 0${
        task.getDone() ? ', 0.1' : ', 1'
      });font-weight: 700;`
      descriptDate.style.cssText = `color:rgb(255, 0, 0${
        task.getDone() ? ', 0.1' : ', 1'
      });font-weight: 700;`
    }
  }
  static closeNavInSmallDevices() {
    const x = window.matchMedia('(max-width: 950px)')
    if (x.matches) document.querySelector('.openNav').click()
  }
  static sortSelectEffect() {
    const dataSorts = document.querySelectorAll('[data-sort]')
    const sortBy = document.querySelector('[sort-by]')
    dataSorts.forEach(e =>
      e.addEventListener('click', () => {
        sortBy.innerText = e.innerText
      })
    )
  }
  static taskNameAlreadyExists(isEdittingTask = false, taskName) {
    let allTasks = Storage.getTodoList().getAllTasks()
    let newTaskName = document.querySelector('[task-name]').value
    if (isEdittingTask) {
      newTaskName = document.querySelector('[edit-task-name]').value
      if (newTaskName == taskName) return false
    }
    if (allTasks.some(task => task.getName() == newTaskName)) {
      alert('Task Name Already Exists')
      return true
    }
    return false
  }
  // effects END

  static addOneTask(e) {
    e.preventDefault()
    if (!UI.taskNameAlreadyExists()) {
      UI.saveTaskToStorage()
      UI.addAllTasksOfThisProjectToUI()
      UI.clearInputsOfAddTask()
      document.querySelector('[button-cancel-add-task]').click()
    }
  }
  static clearInputsOfAddTask() {
    document.querySelector('[task-name]').value = ''
    document.querySelector('[task-descript]').value = ''
    document.querySelector('[task-date]').value = ''
    document.querySelector('[task-priority]').value = 'normal'
  }
  static getCurrentProjectName() {
    return document.querySelector('[project-name]').innerText
  }
  static clearAddProjectInput() {
    document.querySelector('[input-project-name]').value = ''
  }
}
