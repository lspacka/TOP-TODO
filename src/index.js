//  TODO:
//   - revise var names
//   - ModalHandler

import './style.css'
import { ModalHandler, updateProject } from './DOMmod.js'

const project_btns = document.querySelectorAll('.project-button')
const user_pro_btns = document.querySelectorAll('.user-project-button')
const user_section = document.querySelector('.user-projects')
const new_project = document.querySelector('.add-project')
const add_project = document.getElementById('add-project')
const cancel_project = document.getElementById('cancel-project')
const project_modal = document.querySelector('.project-modal')
const project_name = document.querySelector('.project-name')
// const modal_heading = document.querySelector('.modal-heading')
const new_task = document.querySelector('.new-task-btn')
const task_modal = document.querySelector('.task-modal')
const task_title = document.querySelector('.task-title')
const task_desc = document.querySelector('.task-desc')
const add_task = document.getElementById('add-task')
const cancel_task = document.getElementById('cancel-task')

class Task {
  constructor(title, desc, date, pro) {
    this.title = title
    this.desc = desc
    this.date = date
    this.pro = pro
    this.important = false
  }
}

class Project {
  constructor(name) {
    this.name = name
    this.tasks = []
  }
}


//  default projects
let default_pro = {
  name: 'tasks',
  tasks: []
}

let today = {
  name: 'today',
  tasks: []
}

let this_week = {
  name: 'this week',
  tasks: []
}

let important = {
  name: 'important',
  tasks: []
}

let user_pros = []
let current_pro = default_pro
let all_pros = [default_pro, today, this_week, important]

//  clusterfuck procedure for adding event listeners to dynamically added buttons (user projects)
//  the event listener basically updates the current_pro variable
function handleButtonClick(e) {
  let btn_text = e.target.textContent

  all_pros.forEach(pro => {
      if (btn_text == pro.name) current_pro = pro;
  });
  console.log("Current project:", current_pro);
}

function addButtonClickListener(button) {
  button.addEventListener('click', handleButtonClick);
}

user_pro_btns.forEach(btn => {  
  addButtonClickListener(btn);
});

function addNewProject() {
  let name = project_name.value;
  let project = new Project(name);

  user_pros.push(project);
  all_pros.push(project);
  updateProject(user_section, user_pros);
  project_modal.close()

  let newButton = document.querySelector('.user-project-button:last-child')
  if (newButton) {
      addButtonClickListener(newButton);
  }
  console.log(all_pros)
}

add_project.addEventListener('click', addNewProject);

//  Event listeners for the default projects
project_btns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    // let btn_text = e.target.textContent.toLowerCase().split(' ').join('_') 
    let btn_text = e.target.textContent.toLowerCase()
    all_pros.forEach(pro => {
      if (btn_text == pro.name) current_pro = pro
    })
    console.log("Current project:", current_pro)
  })
})

// add_project.addEventListener('click', () => {
//   let name = project_name.value
//   let project = new Project(name)

//   user_pros.push(project)
//   all_pros.push(project)
//   showProject(user_section, user_pros, project_btns)
//   // console.log(all_pros)
// })

ModalHandler(
  new_project,
  cancel_project,
  new_task,
  cancel_task,
  project_modal,
  task_modal
)

// new_project.addEventListener('click', () => {
//   project_modal.show()
// })

// cancel_project.addEventListener('click', () => {
//   project_modal.close()
// })

// new_task.addEventListener('click', () => {
//   task_info.show()
// })

// cancel_task.addEventListener('click', () => {
//   task_info.close()
//   console.log('this guy fucks')
// })

add_task.addEventListener('click', () => {
  let title = task_title.value
  let desc = task_desc.value
  let task = new Task(title, desc)

  current_pro.tasks.push(task)
  task_modal.close()
  console.log(current_pro)
})