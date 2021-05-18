import { performAllEffects } from './modules/DOMeffects'
performAllEffects();

function selectElement(e) {
    return document.querySelector(e);
}

function selectAllElements(e) {
    return document.querySelectorAll(e);
}
// class Task {
//     constructor(project, title, description, date, priority) {
//         this.project = project;
//         this.title = title;
//         this.description = description;
//         this.date = date;
//         this.priority = priority;
//     }
// }

// class Project {
//     constructor(title) {
//         this.title = title;
//     }
//     addTask() {
//         return {

//         }
//     }
// }

// (function displayTasks() {})()



selectElement('[add-button]').addEventListener('click', (e) => {
    e.preventDefault();
    console.log(selectElement('#title').value, selectElement('#description').value, selectElement('#date').value, selectElement('#priority').value)
})