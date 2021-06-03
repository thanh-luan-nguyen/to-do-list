import UI from "./modules/UI"

window.addEventListener('DOMContentLoaded', UI.loadHomePage);
// import { selectElement, selectAllElements, clearForm, initProject, createProjectPage, addOneTask, updateTask, getFromStorage, updateStorage } from './modules/functions'
// import { Task, Project } from './modules/classes'



// import { isToday } from 'date-fns'
// import { customAlphabet } from 'nanoid'
// const nanoid = customAlphabet('qwertyuiopasdfghjklzxcvbnm_', 15)

// initProject();
// let projectList = getFromStorage();

// selectElement('[add-project-button]').addEventListener('click', (e) => {
//     e.preventDefault();
//     selectElement('[cancel-project-button]').click();
//     const newProject = new Project(selectElement('#project-title').value);
//     projectList.push(newProject);
//     updateStorage(projectList);
//     displayAll();
//     selectElement('#project-title').value = "";
// })

// let currentProjectID = '';

// function displayAll() {
//     projectList = getFromStorage();
//     selectElement('[project-list]').innerHTML = '';
//     for (let project of projectList) {
//         let projectName = project.title;
//         selectElement('[project-list]').innerHTML += `<div class="task-view-as" data-project-name id="${project.id}"><i class="fas fa-tasks me-3"></i><span>${projectName}</span></div>`
//     }

//     selectAllElements('[data-project-name]').forEach(DOMProject => {
//         const project = projectList.filter(project => project.id === DOMProject.id)[0]

//         DOMProject.addEventListener('click', (e) => {
//             e.stopPropagation();

//             currentProjectID = project.id;

//             createProjectPage(project, projectList);

//             const project_1 = getFromStorage().filter(project => project.id === DOMProject.id)[0];
//             project_1.tasks.forEach(task => {
//                 addOneTask(project_1, task.title, task.done, task.description, task.date, task.priority, task.id, projectList);
//             })

//             selectAllElements('#done').forEach(doneInput => doneInput.addEventListener('click', () => {
//                 const taskID = doneInput.getAttribute('done-id');

//                 projectList = getFromStorage();
//                 const project_2 = projectList.filter(project_ => project_.id === project.id)[0];
//                 const task = project_2.tasks.filter(task => task.id === taskID)[0];

//                 if (doneInput.checked) {
//                     selectElement(`.TASK${taskID}`).style.color = "rgb(0,0,0,0.2)";
//                     selectElement(`.TASK${taskID}`).querySelector('.details').style.opacity = "0.05";
//                     task.done = true;
//                 } else if (doneInput.checked == false) {
//                     selectElement(`.TASK${taskID}`).style.color = "rgb(0,0,0,1)";
//                     selectElement(`.TASK${taskID}`).querySelector('.details').style.opacity = "1";
//                     task.done = false;
//                 }
//                 updateStorage(projectList);

//             }))

//             selectAllElements(`[edit-task]`).forEach(edit => edit.addEventListener('submit', (e) => {
//                 e.preventDefault();
//                 const id = edit.getAttribute('task-id');

//                 selectElement(`[${id}-cancel-update-button]`).click();

//                 let [title, description, date, priority] = [selectElement(`#title${id}`).value, selectElement(`#description${id}`).value, selectElement(`#date${id}`).value, selectElement(`#priority${id}`).value];
//                 updateTask(project, title, description, date, priority, id, projectList)

//                 const task = project.tasks.filter(task => task.id === id)[0];
//                 [task.title, task.description, task.date, task.priority] = [title, description, date, priority];



//                 selectElement(`.TASK${id}`).querySelector('#done').addEventListener('click', () => {
//                     const taskID = id;

//                     projectList = getFromStorage();
//                     const project_2 = projectList.filter(project_ => project_.id === project.id)[0];
//                     const task = project_2.tasks.filter(task => task.id === taskID)[0];

//                     if (selectElement(`.TASK${id}`).querySelector('#done').checked) {
//                         selectElement(`.TASK${taskID}`).style.color = "rgb(0,0,0,0.2)";
//                         selectElement(`.TASK${taskID}`).querySelector('.details').style.opacity = "0.05";
//                         task.done = true;
//                     } else if (selectElement(`.TASK${id}`).querySelector('#done').checked == false) {
//                         selectElement(`.TASK${taskID}`).style.color = "rgb(0,0,0,1)";
//                         selectElement(`.TASK${taskID}`).querySelector('.details').style.opacity = "1";
//                         task.done = false;
//                     }
//                     updateStorage(projectList);
//                 })

//                 updateStorage(projectList);
//             }))

//             selectAllElements("[delete-task]").forEach(button => button.addEventListener('click', () => {
//                 const id = button.id;

//                 selectElement(`.TASK${id}`).innerHTML = ``;

//                 projectList = getFromStorage();
//                 const project_4 = projectList.filter(project => project.id === DOMProject.id)[0];

//                 project_4.tasks = project_4.tasks.filter(task => task.id != id);

//                 updateStorage(projectList);
//             }))
//         })
//     })

// }

// displayAll();

// selectElement(`#add-task-form`).addEventListener('submit', (e) => {
//     e.preventDefault();
//     selectElement(`[cancel-button]`).click();

//     projectList = getFromStorage();
//     const project = projectList.filter(project => project.id === currentProjectID)[0]

//     let [title, description, date, priority] = [selectElement(`#title`).value, selectElement(`#description`).value, selectElement(`#date`).value, selectElement(`#priority`).value];

//     const newTask = new Task(project.title, title, description, date, priority);
//     project.tasks.push(newTask);
//     updateStorage(projectList);

//     addOneTask(project, title, newTask.done, description, date, priority, newTask.id, projectList);


//     selectAllElements("[delete-task]").forEach(button => button.addEventListener('click', () => {
//             const id = button.id;

//             selectElement(`.TASK${id}`).innerHTML = ``;


//             project.tasks = project.tasks.filter(task => task.id != id);

//             updateStorage(projectList);
//         }))
//         // selectElement(`[done-id=${newTask.id}]`).addEventListener('click', () => {
//         //     const id = newTask.id;

//     //     // const task = project.tasks.filter(task => task.id === id)[0];

//     //     projectList = getFromStorage();
//     //     const project_2 = projectList.filter(project_ => project_.id === project.id)[0];
//     //     const task = project_2.tasks.filter(task => task.id === id)[0];

//     //     task.done = done.checked ? true : false;
//     //     updateStorage(projectList);
//     //     if (done.checked == true) {
//     //         selectElement(`.TASK${id}`).style.color = "rgb(0,0,0,0.2)";
//     //         selectElement(`.TASK${id}`).querySelector('.details').style.opacity = "0.05";
//     //     } else {
//     //         selectElement(`.TASK${id}`).style.color = "rgb(0,0,0,1)";
//     //         selectElement(`.TASK${id}`).querySelector('.details').style.opacity = "1";
//     //     }

//     // })

//     selectAllElements(`[edit-task]`).forEach(edit => edit.addEventListener('submit', (e) => {
//         e.preventDefault();
//         const id = edit.getAttribute('task-id');

//         selectElement(`[${id}-cancel-update-button]`).click();

//         let [title, description, date, priority] = [selectElement(`#title${id}`).value, selectElement(`#description${id}`).value, selectElement(`#date${id}`).value, selectElement(`#priority${id}`).value];
//         updateTask(project, title, description, date, priority, id, projectList)

//         const task = project.tasks.filter(task => task.id === id)[0];
//         [task.title, task.description, task.date, task.priority] = [title, description, date, priority];

//         // selectAllElements('#done').forEach(done => done.addEventListener('click', () => {
//         //     const id = done.getAttribute('done-id');

//         //     projectList = getFromStorage();
//         //     const project_2 = projectList.filter(project_ => project_.id === project.id)[0];
//         //     const task = project_2.tasks.filter(task => task.id === id)[0];
//         //     done.addEventListener('change', () => {

//         //         task.done = done.checked ? true : false;
//         //         updateStorage(projectList);
//         //         if (done.checked == true) {
//         //             selectElement(`.TASK${id}`).style.color = "rgb(0,0,0,0.2)";
//         //             selectElement(`.TASK${id}`).querySelector('.details').style.opacity = "0.05";
//         //         } else {
//         //             selectElement(`.TASK${id}`).style.color = "rgb(0,0,0,1)";
//         //             selectElement(`.TASK${id}`).querySelector('.details').style.opacity = "1";
//         //         }

//         //     })
//         // }))

//         updateStorage(projectList);
//     }))

//     clearForm()
// });