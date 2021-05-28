import { performAllEffects } from './modules/DOMeffects'
import { selectElement, selectAllElements, clearForm, initProject, createProjectPage, addOneTask, updateTask, getFromStorage, updateStorage } from './modules/functions'
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
})

let currentProjectID = '';

function displayAll() {
    projectList = getFromStorage();
    selectElement('[project-list]').innerHTML = '';
    for (let project of projectList) {
        let projectName = project.title;
        selectElement('[project-list]').innerHTML += `<div class="task-view-as" data-project-name id="${project.id}"><i class="fas fa-tasks me-3"></i><span>${projectName}</span></div>`
    }

    selectAllElements('[data-project-name]').forEach(DOMProject => {
        const project = projectList.filter(project => project.id === DOMProject.id)[0]

        DOMProject.addEventListener('click', (e) => {
            e.stopPropagation();

            currentProjectID = project.id;

            createProjectPage(project, projectList);

            project.tasks.forEach(task => {
                addOneTask(project, task.title, task.done, task.description, task.date, task.priority, task.id, projectList);
            })

            selectAllElements(`[edit-task]`).forEach(edit => edit.addEventListener('submit', (e) => {
                e.preventDefault();
                const id = edit.getAttribute('task-id');

                selectElement(`[${id}-cancel-update-button]`).click();

                let [title, description, date, priority] = [selectElement(`#title${id}`).value, selectElement(`#description${id}`).value, selectElement(`#date${id}`).value, selectElement(`#priority${id}`).value];
                updateTask(project, title, description, date, priority, id, projectList)

                const task = project.tasks.filter(task => task.id === id)[0];
                [task.title, task.description, task.date, task.priority] = [title, description, date, priority];

                updateStorage(projectList);
            }))

            selectAllElements("[delete-task]").forEach(button => button.addEventListener('click', () => {
                const id = button.id;

                selectElement(`.TASK${id}`).innerHTML = ``;

                project.tasks = project.tasks.filter(task => task.id != id);

                updateStorage(projectList);
            }))
        })
    })

}

displayAll();

selectElement(`#add-task-form`).addEventListener('submit', (e) => {
    e.preventDefault();
    selectElement(`[cancel-button]`).click();

    projectList = getFromStorage();
    const project = projectList.filter(project => project.id === currentProjectID)[0]

    let [title, description, date, priority] = [selectElement(`#title`).value, selectElement(`#description`).value, selectElement(`#date`).value, selectElement(`#priority`).value];

    const newTask = new Task(project.title, title, description, date, priority);
    project.tasks.push(newTask);

    addOneTask(project, title, description, date, priority, newTask.id, projectList);


    selectAllElements("[delete-task]").forEach(button => button.addEventListener('click', () => {
        const id = button.id;

        selectElement(`.TASK${id}`).innerHTML = ``;

        project.tasks = project.tasks.filter(task => task.id != id);

        updateStorage(projectList);
    }))

    selectAllElements()

    updateStorage(projectList);
    clearForm()
});