import { performAllEffects, deleteProjectEffect } from './modules/DOMeffects'
import { selectElement, selectAllElements, clearForm, reset } from './modules/functions'

performAllEffects();

import { isToday } from 'date-fns'
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('qwertyuiopasdfghjklzxcvbnm_', 15)

const projectList = [{
        title: "project1",
        id: nanoid(),
        tasks: [{
                title: "master OOP Concepts",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem repellendus necessitatibus sint.",
                date: "2021-06-01",
                priority: "important"
            },
            {
                title: "complete the to-do-list",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem repellendus necessitatibus sint, nobis neque eius iste aspernatur repudiandae architecto deleniti animi error placeat pariatur a ducimus laborum. Dolore, libero alias.",
                date: "2021-05-22",
                priority: "urgent"
            }
        ]
    }, {
        title: "project2",
        id: nanoid(),
        tasks: [{
            title: "bla bla huhuahu hua",
            description: "Dolore, libero alias. Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem repellendus necessitatibus sint, nobis neque eius iste aspernatur repudiandae architecto deleniti animi error placeat pariatur a ducimus laborum.",
            date: "2021-08-15",
            priority: "important"
        }]
    },
    {
        title: "project3",
        id: nanoid(),
        tasks: [{
            title: "alahu akbar",
            description: "badabidabadum",
            date: "2021-12-02",
            priority: "urgent"
        }, {
            title: "chinese commies",
            description: ":)))))))))))))))))))))))))))))))))))))))))t pariatur a ducimus laborum.",
            date: "2021-01-08",
            priority: "important"
        }, {
            title: "bèo nhèo",
            description: "><<><><><><><><><><><><><7832y873y78lendus necessitatibus sint, nobis neque eius iste aspernatur repudiandae architecto deleniti animi error placeat pariatur a ducimus laborum.",
            date: "2021-02-16",
            priority: "normal"
        }]
    }
];

function displayAll() {
    for (let project of projectList) {
        let projectName = project.title;
        selectElement('[project-list]').innerHTML += `<div class="task-view-as" data-project-name id="${project.id}"><i class="fas fa-tasks me-3"></i><span>${projectName}</span></div>`
        deleteProjectEffect();
    }

    for (let DOMProject of selectAllElements('[data-project-name]')) {

        const project = projectList.filter(project => project.id === DOMProject.id)
        DOMProject.addEventListener('click', () => {
            selectElement('.content').innerHTML = '';
            selectElement('.content').innerHTML +=
                `<div class="view-as d-flex justify-content-between">
                    <span>${project[0].title}</span>
                    <div class="btn-group dropdown">
                        <button type="button" class="btn dropdown-toggle shadow-none " data-bs-toggle="dropdown"><span>Sort by</span>: <em class="me-1 " sort-by>default</em></button>
                        <ul class="dropdown-menu">
                            <li class="dropdown-item" data-sort>default</li>
                            <li class="dropdown-item" data-sort>date</li>
                            <li class="dropdown-item" data-sort>priority</li>
                        </ul>
                    </div>
                </div>

                <div class="add-task mb-2" data-bs-toggle="modal" data-bs-target="#add-task">
                    <i class="fas fa-plus me-3 "><span>New Task</span></i>

                </div>

                <div class="modal fade" id="add-task" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <form action="">
                                <div class="modal-body">
                                    <div class="mb-1">
                                        <label for="title"></label>Task title</label>
                                        <input type="text" class="form-control  shadow-none mt-1" id="title" xyz required>
                                        <div class="word-count text-end" title-limit style="color:rgba(0, 0, 0, 0.5)"><span title-count>0</span>/30</div>
                                    </div>

                                    <div class="mb-1">
                                        <label for="description">Detailed Description</label>
                                        <textarea class="form-control shadow-none mt-1" id="description" style="height: 100px;resize:none;" xyz></textarea>
                                        <div class="word-count text-end" description-limit style="color:rgba(0, 0, 0, 0.5)"><span description-count>0</span>/200</div>
                                    </div>

                                    <div class="row">
                                        <div class="col">
                                            <label for="date">Date</label>
                                            <input id="date" type="date" class="form-control shadow-none mt-1">
                                        </div>
                                        <div class="col">
                                            <label for="priority">Priority</label>
                                            <select id="priority" class="form-control shadow-none mt-1">
                                                <option selected value="normal">Normal</option>
                                                <option value="important">Important</option>
                                                <option value="urgent">Urgent</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer border-top-0">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" cancel-button>Cancel</button>
                                    <button type="submit" class="btn btn-primary" add-button>Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="task-list">

                </div>`

            for (let task of project[0].tasks) {
                const date = task.date.slice(5).split('-').join('/');
                const taskID = nanoid();
                let priorityIcon = '';
                switch (task.priority) {
                    case 'normal':
                        priorityIcon = "";
                        break;
                    case 'important':
                        priorityIcon = "flag";
                        break;
                    case 'urgent':
                        priorityIcon = "exclamation-triangle"
                        break;
                }
                selectElement('.task-list').innerHTML +=
                    `<div class="TASK">
                        <div class="task">

                            <div class="first-group"><input class="form-check-input shadow-none me-3" type="checkbox" id="done" /><span>${task.title}</span></div>
                            <div class="second-group">
                                <i class="fas fa-${priorityIcon}"></i>

                                <button type="button" class="details btn btn-secondary shadow-none" data-bs-toggle="collapse" data-bs-target="#y${taskID}">Details</button>

                                <span class="date">${date}</span>

                                <i class="fas fa-edit edit" data-bs-toggle="modal" data-bs-target="#x${taskID}"></i>

                                <i class="fas fa-trash-alt delete"></i>
                            </div>

                        </div>

                        <div class="collapse" id="y${taskID}">
                            <div class="card card-body rounded-0 border-top-0 border-bottom-0 pt-2 pb-0" style="background-color: oldlace;">
                                <p class="mb-0"><b>Project: </b>${project[0].title}</p>
                                <p class="mb-0"><b>Date: </b>${task.date}</p>
                                <p class="mb-0"><b>Priority: </b>${task.priority} <i class="fas fa-${priorityIcon}"></i></p>
                                <p class="mb-0">
                                    <b>Description: </b>${task.description}
                                </p>
                            </div>
                        </div>

                        <div class="modal fade" id="x${taskID}" tabindex="-1">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <form action="">
                                        <div class="modal-body">
                                            <div class="mb-1">
                                                <label>Task title</label>
                                                <input type="text" class="form-control  shadow-none mt-1" value="${task.title}" xyz required>
                                                <div class="word-count text-end" title-limit style="color:rgba(0, 0, 0, 0.5)"><span title-count>0</span>/30</div>
                                            </div>

                                            <div class="mb-1">
                                                <label>Detailed Description</label>
                                                <textarea class="form-control shadow-none mt-1" style="height: 100px;resize:none;" xyz>${task.description}</textarea>
                                                <div class="word-count text-end" description-limit style="color:rgba(0, 0, 0, 0.5)"><span description-count>0</span>/200</div>
                                            </div>

                                            <div class="row">
                                                <div class="col">
                                                    <label>Date</label>
                                                    <input type="date" class="form-control shadow-none mt-1" value="${task.date}">
                                                </div>
                                                <div class="col">
                                                    <label>Priority</label>
                                                    <select class="form-control shadow-none mt-1" aaa>
                                                        <option value="normal" id="${taskID}normal">Normal</option>
                                                        <option value="important" id="${taskID}important">Important</option>
                                                        <option value="urgent" id="${taskID}urgent">Urgent</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer border-top-0">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" cancel-update-button>Cancel</button>
                                            <button type="submit" class="btn btn-primary" update-button>Update</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>`
                selectElement(`#${taskID}${task.priority}`).setAttribute('selected', '')
            }
        })
    }


}

displayAll();

// selectElement('[add-button]').addEventListener('click', (e) => {
//     e.preventDefault();
//     selectElement('[cancel-button]').click();

//     let [title, description, date, priority] = [selectElement('#title').value, selectElement('#description').value, selectElement('#date').value, selectElement('#priority').value];

//     // let [a, b, c] = [...date.split('-')];
//     // console.log(isToday(new Date(a, b - 1, c)));

//     switch (priority) {
//         case 'normal':
//             priority = "";
//             break;
//         case 'important':
//             priority = "flag";
//             break;
//         case 'urgent':
//             priority = "exclamation-triangle"
//             break;
//     }
//     if (!date) date = "**/**";
//     else date = date.slice(5).split('-').join('/');
//     selectElement('.task-list').innerHTML += `
//         <div class="task">
//             <div class="first-group"><input class="form-check-input shadow-none me-3 " type="checkbox" value=" " id="done?" /><span>${title}</span></div>
//             <div class="second-group">
//                 <i class="fas fa-${priority}"></i>
//                 <button type="button" class="details btn btn-secondary shadow-none ">Details</button>
//                 <span class="date">${date}</span>
//                 <i class="fas fa-edit edit" data-bs-toggle="modal" data-bs-target="#add-or-edit-task"></i>
//                 <i class="fas fa-trash-alt delete"></i>
//             </div>
//         </div>
//     `;
//     clearForm();
//     reset("description");
//     reset("title");
// });



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
//             this.project = project;
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
    deleteProjectEffect();
})

// function addProject(e) {
//     e.preventDefault();
//     selectElement('[cancel-project-button]').click();
//     let projectName = selectElement('#project-title').value;
//     selectElement('[project-list]').innerHTML += `<div class="task-view-as" data-project-name><i class="fas fa-tasks me-3"></i><span>${projectName}</span></div>`
//     selectElement('#project-title').value = "";
//     reset("project-title");
//     deleteProjectEffect();
// }