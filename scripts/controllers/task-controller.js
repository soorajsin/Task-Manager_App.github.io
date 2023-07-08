//DOM (I/O)
import {
          doAjax
} from '../data/services/ajax.js';
import {
          TASK_OPERATIONS
} from '../data/services/task-operations.js';
window.addEventListener('load', init); //second thing:-   first time load and after call bind

function init() {
          bindEvents();
          showCount();
          disableButtons();
}

function disableButtons() {
          document.querySelector('#remove').setAttribute('disabled', true);
          document.querySelector('#update').setAttribute('disabled', true)
}

function bindEvents() {
          //register an event
          document.getElementById('add').addEventListener('click', addTask);
          document.querySelector('#remove').addEventListener('click', deleteForever);
          document.querySelector('#save').addEventListener('click', save);
          document.querySelector('#load').addEventListener('click', load);
          document.querySelector('#update').addEventListener('click', update);
          document.querySelector('#load-from-server').addEventListener('click', loadFromServer);
          document.querySelector('#clear-all').addEventListener('click', clearAll);
}


function clearAll() {
          document.querySelector('#total').innerText = '';
          document.querySelector('#mark').innerText = '';
          document.querySelector('#unmark').innerText = '';
          document.querySelector('#tasks').innerText = '';
          for (let field of fields) { //use for access
                    document.querySelector(`#${field}`).value = '';
          }
}

async function loadFromServer() {
          try {
                    const result = await doAjax();
                    console.log('Result of Task Json is', result['tasks']);
                    TASK_OPERATIONS.tasks = result['tasks'];
                    printTaskTable(TASK_OPERATIONS.tasks);
                    showCount();
          } catch (err) {
                    alert("Some error");
                    console.log(err);
          }

}

function update() {
          for (let field of fields) {
                    taskObject[field] = document.querySelector(`#${field}`).value;
          }
          printTaskTable(TASK_OPERATIONS.getTasks());
          showCount();
}

function save() {
          if (window.localStorage) {
                    const tasks = TASK_OPERATIONS.getTasks();
                    localStorage.tasks = JSON.stringify(tasks);
                    //object to JSON string convert- Serialization
                    alert("Data Store...");
          } else {
                    alert("Outdated Browser No suppoert of localStorage...");
          }
}

function load() {
          if (window.localStorage) {
                    if (localStorage.tasks) {
                              const tasks = JSON.parse(localStorage.tasks); //Deserialization
                              printTaskTable(tasks);
                              showCount();
                    } else {
                              alert("No Data to Load...");
                    }
          } else {
                    alert("Outdated Browser No suppoert of localStorage...");
          }
}

function deleteForever() {
          const tasks = TASK_OPERATIONS.remove();
          printTaskTable(tasks);
          showCount();
}

function printTaskTable(tasks) {
          document.querySelector('#tasks').innerHTML = '';
          //tasks.forEach(taskObject => printTask(taskObject));
          tasks.forEach(printTask);
}

const fields = ['id', 'name', 'desc', 'date', 'color', 'url'];

function addTask() {
          //console.log('Add Task Call');
          // let id = document.querySelector('#id').value;
          // const fields = ['id', 'name', 'desc', 'date', 'color', 'url'];
          const taskObject = {}; //object literal
          for (let field of fields) { //use for access
                    let fieldValue = document.querySelector(`#${field}`).value;
                    taskObject[field] = fieldValue;
          }
          TASK_OPERATIONS.add(taskObject);
          console.log('Task Object', taskObject);
          printTask(taskObject);
          showCount();
          clearFields();
}

let taskObject;

function edit() {
          const icon = this;
          const taskId = icon.getAttribute('task-id');
          taskObject = TASK_OPERATIONS.search(taskId);
          if (taskObject) {
                    for (let key in taskObject) {
                              if (key === 'isMarked') {
                                        continue;
                              }
                              document.querySelector(`#${key}`).value = taskObject[key];
                    }
                    document.querySelector('#update').disabled = false;
          }
}

function toggleDelete() {
          //this hold current calling onject refer
          console.log('Toggle Delete', this);
          let icon = this;
          const tr = icon.parentNode.parentNode;
          const taskId = icon.getAttribute('task-id');
          TASK_OPERATIONS.toggleMark(taskId);
          //tr.className = 'alert-danger';
          tr.classList.toggle('alert-danger');
          showCount();
          const enabledOrDisabled = TASK_OPERATIONS.getMarkCOunt() > 0 ? false : true;
          document.querySelector('#remove').disabled = enabledOrDisabled;
}

function createImage(url) {
          const imageTag = document.createElement('img');
          imageTag.src = url;
          imageTag.className = 'size';
          return imageTag;
}

function showColor(color) {
          const divTag = document.createElement('div');
          divTag.style = "width:100px; hieght:100px; background-color:" + color;
          return divTag;
}

function createIcon(className, fn, taskId) {
          // <i class="fa-solid fa-pencil"></i>
          // <i class="fa-solid fa-trash"></i>
          const iconTag = document.createElement('i'); //<i></i>
          iconTag.className = `fa-solid ${className} me-3 hand`;
          iconTag.addEventListener('click', fn);
          iconTag.setAttribute('task-id', taskId);
          return iconTag;
}

function clearFields() {
          for (let field of fields) {
                    document.querySelector(`#${field}`).value = '';
          }
          document.querySelector('#id').focus();
}

//this function is used to print a single task
function printTask(taskObject) {
          const tbody = document.querySelector('#tasks');
          const tr = tbody.insertRow();
          for (let key in taskObject) {
                    if (key === 'isMarked') {
                              continue; //skip the current iteration
                    }
                    let td = tr.insertCell();
                    if (key == 'url') {
                              td.appendChild(createImage(taskObject[key]));
                              continue;
                    } else if (key == 'color') {
                              td.appendChild(showColor(taskObject[key]));
                              continue;
                    }

                    td.innerText = taskObject[key];
          }
          let td = tr.insertCell();
          td.appendChild(createIcon('fa-pencil', edit, taskObject.id));
          td.appendChild(createIcon('fa-trash', toggleDelete, taskObject.id));
}

function showCount() {
          document.querySelector('#total').innerText = TASK_OPERATIONS.getSize();
          document.querySelector('#mark').innerText = TASK_OPERATIONS.getMarkCOunt();
          document.querySelector('#unmark').innerText = TASK_OPERATIONS.getUnMarkCount();
}