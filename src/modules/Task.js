export default class Task {
  constructor(projectName, name, descript, priority, date = '') {
    this.projectName = projectName
    this.name = name
    this.descript = descript
    this.priority = priority
    this.date = date
    this.done = false
  }

  getProjectName() {
    return this.projectName
  }

  setName(name) {
    this.name = name
  }

  getName() {
    return this.name
  }

  setDescript(descript) {
    this.descript = descript
  }

  getDescript() {
    if (!this.descript) return '...'
    return this.descript
  }

  setPriority(priority) {
    this.priority = priority
  }

  getPriority() {
    return this.priority
  }

  getIconPriority() {
    let iconPriority = ''
    switch (this.priority) {
      case 'normal':
        iconPriority = ''
        break
      case 'important':
        iconPriority = 'flag text-warning'
        break
      case 'crucial':
        iconPriority = 'exclamation-triangle text-danger'
        break
    }
    return iconPriority
  }

  setDate(date) {
    this.date = date
  }

  getDate() {
    return this.date
  }

  getDateFns() {
    return new Date(this.date.split('-').join(', '))
  }

  getDateFormatted() {
    if (!this.date) return '****/**/**'
    return this.date.split('-').join('/')
  }

  // setDone(done) {
  //     this.done = done;
  // }
  getDone() {
    return this.done
  }

  switchDoneValue() {
    this.done = !this.done
  }

  getDoneCheckboxState() {
    let doneCheckboxState = ''
    switch (this.done) {
      case true:
        doneCheckboxState = 'checked'
        break
      case false:
        doneCheckboxState = ''
        break
    }
    return doneCheckboxState
  }

  getIDForTask() {
    return this.getName().split(' ').join('')
  }
}
