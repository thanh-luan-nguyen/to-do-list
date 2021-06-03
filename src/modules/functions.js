// import { customAlphabet } from 'nanoid'
// const nanoid = customAlphabet('qwertyuiopasdfghjklzxcvbnm_', 15)

// export function selectElement(e) {
//     return document.querySelector(e);
// }

// export function selectAllElements(e) {
//     return document.querySelectorAll(e);
// }

// export function clearForm() {
//     [selectElement(`#title`).value, selectElement(`#description`).value, selectElement(`#date`).value, selectElement(`#priority`).value] = ["", "", "", ""];
// }

// export function createProjectPage(project) {
//     selectElement('.content').innerHTML = '';
//     selectElement('.content').innerHTML +=
//         `<div class="view-as d-flex justify-content-between">
//             <span>${project.title}</span>
//             <div class="btn-group dropdown">
//                 <button type="button" class="btn dropdown-toggle shadow-none " data-bs-toggle="dropdown"><span>Filter</span>: <em class="me-1" sort-by>default</em></button>
//                 <ul class="dropdown-menu">
//                     <li class="dropdown-item" data-sort>unfinished</li>
//                     <li class="dropdown-item" data-sort>date</li>
//                     <li class="dropdown-item" data-sort>priority</li>
//                 </ul>
//             </div>
//         </div>

//         <div class="add-task mb-2" data-bs-toggle="modal" data-bs-target="#add-task" >
//             <i class="fas fa-plus me-3" ><span>New Task</span></i>
//         </div>



//         <div class="task-list">

//         <i class="delete-project-button fas fa-times" delete-project title="Delete Project"></i>

//         </div>`

// }

// export function addOneTask(project, title, done, description, date, priority, taskID, projectList) {
//     done ? done = "checked" : done = ""

//     let formatDate;
//     if (!date) formatDate = "**/**"
//     else formatDate = date.slice(5).split('-').join('/')

//     let priorityIcon = '';
//     switch (priority) {
//         case 'normal':
//             priorityIcon = "";
//             break;
//         case 'important':
//             priorityIcon = "flag";
//             break;
//         case 'urgent':
//             priorityIcon = "exclamation-triangle"
//             break;
//     }

//     selectElement('.task-list').innerHTML +=
//         `<div class="TASK${taskID}">
//             <div class="task">

//                 <div class="first-group"><input class="form-check-input shadow-none me-3" type="checkbox" id="done" done-id=${taskID} ${done}/><span>${title}</span></div>
//                 <div class="second-group">
//                     <i class="fas fa-${priorityIcon}"></i>

//                     <button type="button" class="details btn btn-secondary shadow-none" data-bs-toggle="collapse" data-bs-target="#y${taskID}">Details</button>

//                     <span class="date">${formatDate}</span>

//                     <i class="fas fa-edit edit" data-bs-toggle="modal" title="edit" data-bs-target="#x${taskID}"></i>

//                     <i class="fas fa-trash-alt delete" id="${taskID}" delete-task title="delete"></i>
//                 </div>

//             </div>

//             <div class="collapse" id="y${taskID}">
//                 <div class="card card-body rounded-0 border-top-0 border-bottom-0 pt-2 pb-0" style="background-color: oldlace;">
//                     <p class="mb-0"><b>Project: </b>${project.title}</p>
//                     <p class="mb-0"><b>Date: </b>${date}</p>
//                     <p class="mb-0"><b>Priority: </b>${priority} <i class="fas fa-${priorityIcon}"></i></p>
//                     <p class="mb-0">
//                         <b>Description: </b>${description}
//                     </p>
//                 </div>
//             </div>

//         </div>`

//     selectElement('.content').innerHTML += `
//     <div class="modal" id="x${taskID}" tabindex="-1">
//         <div class="modal-dialog modal-dialog-centered">
//             <div class="modal-content">
//                 <form id="${taskID}-update" edit-task task-id="${taskID}">
//                     <div class="modal-body">
//                         <div class="mb-1">
//                             <label>Task title</label>
//                             <input type="text" class="form-control shadow-none mt-1" id="title${taskID}" value="${title}" maxlength="30" required>
//                             <div class="word-count text-end"  style="color:rgba(0, 0, 0, 0.5)">Max: 30</div>
//                         </div>

//                         <div class="mb-1">
//                             <label>Detailed Description</label>
//                             <textarea class="form-control shadow-none mt-1" id="description${taskID}" style="height: 100px;resize:none;" maxlength="200">${description}</textarea>
//                             <div class="word-count text-end" style="color:rgba(0, 0, 0, 0.5)">Max: 200</div>
//                         </div>

//                         <div class="row">
//                             <div class="col">
//                                 <label>Date</label>
//                                 <input type="date" class="form-control shadow-none mt-1" id="date${taskID}" value="${date}">
//                             </div>
//                             <div class="col">
//                                 <label>Priority</label>
//                                 <select class="form-control shadow-none mt-1" id="priority${taskID}" aaa>
//                                     <option value="normal" id="${taskID}normal">Normal</option>
//                                     <option value="important" id="${taskID}important">Important</option>
//                                     <option value="urgent" id="${taskID}urgent">Urgent</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="modal-footer border-top-0">
//                         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"  ${taskID}-cancel-update-button>Cancel</button>
//                         <button type="submit" class="btn btn-primary">Update</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     </div>`

//     if (done) {
//         selectElement(`.TASK${taskID}`).style.color = "rgb(0,0,0,0.2)";
//         selectElement(`.TASK${taskID}`).querySelector('.details').style.opacity = "0.05";
//     }

//     const doneInput = selectElement(`.TASK${taskID}`).querySelector('#done')
//     doneInput.addEventListener('change', () => {

//         projectList = getFromStorage();
//         const project_2 = projectList.filter(project_ => project_.id === project.id)[0];
//         const task = project_2.tasks.filter(task => task.id === taskID)[0];

//         if (doneInput.checked) {
//             selectElement(`.TASK${taskID}`).style.color = "rgb(0,0,0,0.2)";
//             selectElement(`.TASK${taskID}`).querySelector('.details').style.opacity = "0.05";
//             task.done = true;
//         } else if (doneInput.checked == false) {
//             selectElement(`.TASK${taskID}`).style.color = "rgb(0,0,0,1)";
//             selectElement(`.TASK${taskID}`).querySelector('.details').style.opacity = "1";
//             task.done = false;
//         }
//         updateStorage(projectList);
//     })

//     selectElement(`#${taskID}${priority}`).setAttribute('selected', '')

//     selectElement(`#${taskID}-update`).addEventListener('submit', (e) => {
//         e.preventDefault();

//         selectElement(`[${taskID}-cancel-update-button]`).click();

//         let [title, description, date, priority] = [selectElement(`#title${taskID}`).value, selectElement(`#description${taskID}`).value, selectElement(`#date${taskID}`).value, selectElement(`#priority${taskID}`).value];
//         updateTask(project, title, description, date, priority, taskID, projectList)

//         const task = project.tasks.filter(task => task.id === taskID)[0];
//         [task.title, task.description, task.date, task.priority] = [title, description, date, priority];
//         updateStorage(projectList);
//     })

// }

// export function updateTask(project, title, description, date, priority, taskID, projectList) {
//     let formatDate;
//     if (!date) formatDate = "**/**"
//     else formatDate = date.slice(5).split('-').join('/')

//     let priorityIcon = '';
//     switch (priority) {
//         case 'normal':
//             priorityIcon = "";
//             break;
//         case 'important':
//             priorityIcon = "flag";
//             break;
//         case 'urgent':
//             priorityIcon = "exclamation-triangle"
//             break;
//     }

//     selectElement(`.TASK${taskID}`).innerHTML = '';
//     selectElement(`.TASK${taskID}`).innerHTML += `
//             <div class="task">

//                 <div class="first-group"><input class="form-check-input shadow-none me-3" type="checkbox" id="done"/><span>${title}</span></div>
//                 <div class="second-group">
//                     <i class="fas fa-${priorityIcon}"></i>

//                     <button type="button" class="details btn btn-secondary shadow-none" data-bs-toggle="collapse" data-bs-target="#y${taskID}">Details</button>

//                     <span class="date">${formatDate}</span>

//                     <i class="fas fa-edit edit" data-bs-toggle="modal" data-bs-target="#x${taskID}"></i>

//                     <i class="fas fa-trash-alt delete"></i>
//                 </div>

//             </div>

//             <div class="collapse" id="y${taskID}">
//                 <div class="card card-body rounded-0 border-top-0 border-bottom-0 pt-2 pb-0" style="background-color: oldlace;">
//                     <p class="mb-0"><b>Project: </b>${project.title}</p>
//                     <p class="mb-0"><b>Date: </b>${date}</p>
//                     <p class="mb-0"><b>Priority: </b>${priority} <i class="fas fa-${priorityIcon}"></i></p>
//                     <p class="mb-0">
//                         <b>Description: </b>${description}
//                     </p>
//                 </div>
//             </div>`

//     selectElement('.content').querySelector(`#x${taskID}`).innerHTML = ``
//     selectElement('.content').querySelector(`#x${taskID}`).innerHTML += `
//         <div class="modal-dialog modal-dialog-centered">
//             <div class="modal-content">
//                 <form id="${taskID}-update" edit-task task-id="${taskID}">
//                     <div class="modal-body">
//                         <div class="mb-1">
//                             <label>Task title</label>
//                             <input type="text" class="form-control shadow-none mt-1" id="title${taskID}" value="${title}"} maxlength="30" required>
//                             <div class="word-count text-end"  style="color:rgba(0, 0, 0, 0.5)">Max: 30</div>
//                         </div>

//                         <div class="mb-1">
//                             <label>Detailed Description</label>
//                             <textarea class="form-control shadow-none mt-1" id="description${taskID}" style="height: 100px;resize:none;" maxlength="200"}>${description}</textarea>
//                             <div class="word-count text-end" style="color:rgba(0, 0, 0, 0.5)">Max: 200</div>
//                         </div>

//                         <div class="row">
//                             <div class="col">
//                                 <label>Date</label>
//                                 <input type="date" class="form-control shadow-none mt-1" id="date${taskID}" value="${date}">
//                             </div>
//                             <div class="col">
//                                 <label>Priority</label>
//                                 <select class="form-control shadow-none mt-1" id="priority${taskID}" aaa>
//                                     <option value="normal" id="${taskID}normal">Normal</option>
//                                     <option value="important" id="${taskID}important">Important</option>
//                                     <option value="urgent" id="${taskID}urgent">Urgent</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="modal-footer border-top-0">
//                         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" ${taskID}-cancel-update-button>Cancel</button>
//                         <button type="submit" class="btn btn-primary">Update</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     `

//     selectElement(`#${taskID}${priority}`).setAttribute('selected', '')

//     selectElement(`#${taskID}-update`).addEventListener('submit', (e) => {
//             e.preventDefault();

//             selectElement(`[${taskID}-cancel-update-button]`).click();

//             let [title, description, date, priority] = [selectElement(`#title${taskID}`).value, selectElement(`#description${taskID}`).value, selectElement(`#date${taskID}`).value, selectElement(`#priority${taskID}`).value];
//             updateTask(project, title, description, date, priority, taskID, projectList)

//             const task = project.tasks.filter(task => task.id === taskID)[0];
//             [task.title, task.description, task.date, task.priority] = [title, description, date, priority];
//             updateStorage(projectList);
//         })
//         // selectAllElements('#done').forEach(done => done.addEventListener('click', () => {
//         //     const id = done.getAttribute('done-id');

//     //     projectList = getFromStorage();
//     //     const project_2 = projectList.filter(project => project.id === DOMProject.id)[0];
//     //     const task = project_2.tasks.filter(task => task.id === id)[0];
//     //     done.addEventListener('change', () => {

//     //         task.done = done.checked ? true : false;
//     //         updateStorage(projectList);
//     //         if (done.checked == true) {
//     //             selectElement(`.TASK${id}`).style.color = "rgb(0,0,0,0.2)";
//     //             selectElement(`.TASK${id}`).querySelector('.details').style.opacity = "0.05";
//     //         } else {
//     //             selectElement(`.TASK${id}`).style.color = "rgb(0,0,0,1)";
//     //             selectElement(`.TASK${id}`).querySelector('.details').style.opacity = "1";
//     //         }

//     //     })
//     // }))
// }

// export function initProject() {
//     let projectList = JSON.parse(localStorage.getItem('projectList'));

//     if (!projectList) {
//         projectList = [{
//                 title: "The Odin Project",
//                 id: nanoid(),
//                 tasks: [{
//                         project: "The Odin Project",
//                         title: "master OOP Concepts",
//                         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem repellendus necessitatibus sint.",
//                         date: "2021-05-01",
//                         priority: "normal",
//                         done: true,
//                         id: nanoid()
//                     },
//                     {
//                         project: "The Odin Project",
//                         title: "complete the to-do-list",
//                         description: "",
//                         date: "2021-05-23",
//                         priority: "important",
//                         done: false,
//                         id: nanoid()
//                     }
//                 ]
//             }, {
//                 title: "YelpCamp",
//                 id: nanoid(),
//                 tasks: [{
//                     project: "YelpCamp",
//                     title: "finish yelpcamp, udemy",
//                     description: "",
//                     date: "2021-08-31",
//                     priority: "important",
//                     done: false,
//                     id: nanoid()
//                 }]
//             },
//             {
//                 title: "freeCodeCamp",
//                 id: nanoid(),
//                 tasks: [{
//                     project: "freeCodeCamp",
//                     title: "JS Alg & Data Struct",
//                     description: "",
//                     date: "2021-05-31",
//                     priority: "important",
//                     done: false,
//                     id: nanoid()
//                 }, {
//                     project: "freeCodeCamp",
//                     title: "Front End Libraries",
//                     description: "",
//                     date: "2021-06-30",
//                     priority: "important",
//                     done: true,
//                     id: nanoid()
//                 }, {
//                     project: "freeCodeCamp",
//                     title: "Data Visualization",
//                     description: "",
//                     date: "2021-07-31",
//                     priority: "normal",
//                     done: false,
//                     id: nanoid()
//                 }, {
//                     project: "freeCodeCamp",
//                     title: "APIs & Microservices",
//                     description: "",
//                     date: "2021-08-31",
//                     priority: "important",
//                     done: false,
//                     id: nanoid()
//                 }, {
//                     project: "freeCodeCamp",
//                     title: "Quality Assurance",
//                     description: "",
//                     date: "2021-09-30",
//                     priority: "normal",
//                     done: true,
//                     id: nanoid()
//                 }]
//             }
//         ];
//     }
//     localStorage.setItem('projectList', JSON.stringify(projectList));
// }

// export function getFromStorage() {
//     return JSON.parse(localStorage.getItem('projectList'));
// }

// export function updateStorage(projectList) {
//     localStorage.setItem('projectList', JSON.stringify(projectList));
// }