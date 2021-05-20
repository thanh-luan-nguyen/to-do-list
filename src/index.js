import { performAllEffects } from './modules/DOMeffects'
performAllEffects();

import { isToday } from 'date-fns'


function selectElement(e) {
    return document.querySelector(e);
}

// function selectAllElements(e) {
//     return document.querySelectorAll(e);
// }



selectElement('[add-button]').addEventListener('click', (e) => {
    e.preventDefault();
    selectElement('[cancel-button]').click();

    let [title, description, date, priority] = [selectElement('#title').value, selectElement('#description').value, selectElement('#date').value, selectElement('#priority').value];

    // let [a, b, c] = [...date.split('-')];
    // console.log(isToday(new Date(a, b - 1, c)));

    switch (priority) {
        case 'normal':
            priority = "";
            break;
        case 'important':
            priority = "flag";
            break;
        case 'urgent':
            priority = "exclamation-triangle"
            break;
    }
    if (!date) date = "**/**";
    else date = date.slice(5).split('-').join('/');
    selectElement('.task-list').innerHTML += `
        <div class="task">
            <div class="first-group"><input class="form-check-input shadow-none me-3 " type="checkbox" value=" " id="done?" /><span>${title}</span></div>
            <div class="second-group">
                <i class="fas fa-${priority}"></i>
                <button type="button" class="details btn btn-secondary shadow-none ">Details</button>
                <span class="date">${date}</span>
                <i class="fas fa-edit edit" data-bs-toggle="modal" data-bs-target="#add-or-edit-task"></i>
                <i class="fas fa-trash-alt delete"></i>
            </div>
        </div>
    `;
    clearForm();
    reset("description");
    reset("title");
});

function clearForm() {
    [selectElement('#title').value, selectElement('#description').value, selectElement('#date').value, selectElement('#priority').value] = ["", "", "", ""];
}

// (function() {
//     const globalDB = [];
//     const allDB = new Array;
//     const todayDB = new Array;
//     const thisWeekDB = new Array;

//     function addToGlobalDB(e) {
//         globalDB.push(e)
//     }

//     class Task {
//         constructor(project, title, description, date, priority) {
//             this.projectTitle = project;
//             this.title = title;
//             this.description = description;
//             this.date = date;
//             this.priority = priority;
//         }
//     }

//     class Project {
//         constructor(name) {
//             this.name = name;
//             this.taskList = [];
//         }
//         createNewTask(title, description, date, priority) {
//             const newTask = new Task(this.name, title, description, date, priority);
//             this.taskList.push(newTask);
//             addToGlobalDB(newTask);
//         }
//     }

//     const udemy = new Project("udemy");
//     udemy.createNewTask("master OOP", "abcxyzasdaffafaf", "2020-03-04", "urgent");
//     udemy.createNewTask("master OOP 123", "abcxyzasdaffafaf 123", "2020-03-14", "important");

//     console.log(globalDB)
// })()

selectElement('[add-project-button]').addEventListener('click', (e) => {
    e.preventDefault();
    selectElement('[cancel-project-button]').click();
    let projectName = selectElement('#project-title').value;
    selectElement('[project-list]').innerHTML += `<div class="task-view-as" data-project-name><i class="fas fa-tasks me-3"></i><span>${projectName}</span></div>`
    selectElement('#project-title').value = "";
    reset("project-title");
})

function reset(a) {
    selectElement(`[${a}-limit]`).style.color = "rgba(0, 0, 0, 0.5)";
    selectElement(`[${a}-count]`).innerText = 0;
}