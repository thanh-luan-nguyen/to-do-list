import { performAllEffects, deleteProjectEffect } from './modules/DOMeffects'
import { selectElement, selectAllElements, clearForm, reset, initProject, createProjectPage, addOneTask, getFromStorage, updateStorage } from './modules/functions'
import { Task, Project } from './modules/classes'

performAllEffects();

import { isToday } from 'date-fns'
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('qwertyuiopasdfghjklzxcvbnm_', 15)

initProject();
let projectList = getFromStorage();

selectElement('[add-project-button]').addEventListener('click', (e) => {
    e.preventDefault();
    selectElement('[cancel-project-button]').click();
    const newProject = new Project(selectElement('#project-title').value);
    projectList.push(newProject);
    updateStorage(projectList);
    displayAll();
    selectElement('#project-title').value = "";
    reset("project-title");
})

function displayAll() {
    selectElement('[project-list]').innerHTML = '';
    for (let project of projectList) {
        let projectName = project.title;
        selectElement('[project-list]').innerHTML += `<div class="task-view-as" data-project-name id="${project.id}"><i class="fas fa-tasks me-3"></i><span>${projectName}</span></div>`
    }
    for (let DOMProject of selectAllElements('[data-project-name]')) {

        const project = projectList.filter(project => project.id === DOMProject.id)
        DOMProject.addEventListener('click', (e) => {
            e.stopPropagation();

            createProjectPage(project);

            for (let task of project[0].tasks) {
                addOneTask(task.title, task.description, task.date, task.priority, project[0].title);
            }
            selectElement(`#addTask${project[0].id}`).addEventListener('click', (e) => {
                e.preventDefault();
                selectElement('[cancel-button]').click();

                let [title, description, date, priority] = [selectElement(`#title${project[0].id}`).value, selectElement(`#description${project[0].id}`).value, selectElement(`#date${project[0].id}`).value, selectElement(`#priority${project[0].id}`).value];

                const newTask = new Task(title, description, date, priority);
                project.push(newTask);

                addOneTask(title, description, date, priority, project[0].title);

                clearForm(`${project[0].id}`)
                reset("title")
                reset("description")
            })
        })
    }
}
displayAll();

// function addProject(e) {
//     e.preventDefault();
//     selectElement('[cancel-project-button]').click();
//     let projectName = selectElement('#project-title').value;
//     selectElement('[project-list]').innerHTML += `<div class="task-view-as" data-project-name><i class="fas fa-tasks me-3"></i><span>${projectName}</span></div>`
//     selectElement('#project-title').value = "";
//     reset("project-title");
//// deleteProjectEffect();
// }