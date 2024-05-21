//  TODO:
//  + showProject()
//    + update heading
//    + forEach task => <li>task.title<button class="task-detail"><li>
//  + delete task
//  + task detail modal. div.textContent = task.desc + close button
//  + add task to important (fix bug removing task)
//  + fix bug in delete task
//  + add date to task
//  + remove task from date projects if date input doesnt match either one of them
//  + check delete task, important from date pros, thoroughly
//  + make new user project current one
//  + delete all tasks in a project
//  + delete all projects
//  - delete project
//  + fix project display
//  - local storage
//    - gets "called" everytime:
//       - a task gets added/deleted
//       - a task changes "state" (date, important)
//       - a project gets added/deleted
//    - it stores array with all the projects
//    - it retrieves the data and sets it as a default on the projects when loading the page (I think?) 
//    - it places the lotion in the basket 💀

import './style.css'
import { ModalHandler, updateProject, showProject } from './DOMmod.js'

const pro_buttons = document.querySelectorAll('.project-button')
const def_pro_btns = document.querySelectorAll('.default-project-button')
const user_pro_btns = document.querySelectorAll('.user-project-button')
const user_section = document.querySelector('.user-projects') 
const user_pro_list = document.querySelector('.user-projects-list')
const new_project = document.querySelector('.add-project')   
const add_project = document.getElementById('add-project')  
const cancel_project = document.getElementById('cancel-project')
const project_modal = document.querySelector('.project-modal')
const project_name = document.querySelector('.project-name')
const pro_heading = document.querySelector('.project-heading')  // 2DOM
const new_task = document.querySelector('.new-task-btn')
const task_modal = document.querySelector('.task-modal')
const task_title = document.querySelector('.task-title')
const task_desc = document.querySelector('.task-desc')
const add_task = document.getElementById('add-task')
const cancel_task = document.getElementById('cancel-task')
const pro_display = document.querySelector('.project-display')
const tasks_list = document.querySelector('.tasks-list')
const task_detail = document.querySelector('.task-detail-modal')
const close_detail = document.querySelector('.close-detail')
const clear_projects = document.querySelector('.clear-projects')
const clear_tasks = document.querySelector('.clear-tasks')
const TEST = document.querySelector('.test-button')

class Task {
  constructor(title, desc) {
    this.title = title
    this.desc = desc
    this.important = false
    this.date
    this.pro  // ?
    this.index
  }
}

class Project {
  constructor(name) {
    this.name = name
    this.tasks = []
    this.index
  }
}

const default_pro = new Project('tasks')
const today = new Project('today')
const this_week = new Project('this week')
const important = new Project('important')

let user_pros = []
let current_pro = default_pro
let all_pros = [default_pro, today, this_week, important]
const date_pros = [today, this_week]
showProject(pro_heading, tasks_list, current_pro, date_pros)
let pro_count = 0
// console.log(date_pros)

TEST.addEventListener('click', () => {
  console.log('(TEST) current pro: ', current_pro)
  let title = task_title.value
  let desc = task_desc.value
  let task = new Task(title, desc)

  if (current_pro == important) task.important = true
  current_pro.tasks.push(task)
  task_modal.close()
  showProject(pro_heading, tasks_list, current_pro, important, date_pros)
})

//  clusterfuck procedure for adding event listeners to dynamically added buttons in the user projects
function handleButtonClick(e) {
  let btn_text = e.target.textContent

  all_pros.forEach(pro => {
      if (btn_text == pro.name) current_pro = pro
  })
  console.log("Current project:", current_pro);
  showProject(pro_heading, tasks_list, current_pro, important, date_pros)
}

function deleteProject(list, userPros, pro) {
  const li = list.children[pro.index]
  
  list.removeChild(li)
  userPros.splice(pro.index, 1)
  userPros.forEach((pro, index) => {
    pro.index = index
  })
  console.log(userPros)
  console.log(list)
  // console.log('this index: ', pro.index)
}

function addButtonClickListener(button) {
  button.addEventListener('click', handleButtonClick);
}

function deleteProListener(button, list, userPros, pro) {
  button.addEventListener('click', () => {
    deleteProject(list, userPros, pro)
  })
}

user_pro_btns.forEach(btn => {  
  addButtonClickListener(btn)
});

function addNewProject() {
  let name = project_name.value
  let project = new Project(name)

  project.index = pro_count
  pro_count++
  user_pros.push(project)
  all_pros.push(project)
  updateProject(user_pro_list, user_pros)
  project_modal.close()
  current_pro = project  // HERE
  showProject(pro_heading, tasks_list, current_pro, important, date_pros)

  // let newButton = document.querySelector('.user-project-button:last-child')
  const last_li = document.querySelector('.project-li:last-child')
  const parent_list = last_li.parentNode
  let buttons = last_li.querySelectorAll('button')
  let pro_name = buttons[0]
  let del_pro = buttons[1]

  if (pro_name) addButtonClickListener(pro_name)
  if (del_pro) deleteProListener(del_pro, parent_list, user_pros, project)


  // let newDelete = document.querySelector('')
  // console.log(all_pros)
  console.log(user_pros)
}

add_project.addEventListener('click', addNewProject)

//  Event listeners for the default projects
def_pro_btns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    let btn_text = e.target.textContent.toLowerCase()
    all_pros.forEach(pro => {
      if (btn_text == pro.name) current_pro = pro
    })
    console.log("Current project:", current_pro)
    showProject(pro_heading, tasks_list, current_pro, important, date_pros)
  })
})

ModalHandler(
  new_project,
  cancel_project,
  new_task,
  cancel_task,
  project_modal,
  task_modal,
  task_detail,
  close_detail
)

add_task.addEventListener('click', () => {
  let title = task_title.value
  let desc = task_desc.value
  let task = new Task(title, desc)

  if (current_pro == important) task.important = true
  current_pro.tasks.push(task)
  task_modal.close()
  showProject(pro_heading, tasks_list, current_pro, important, date_pros) 
  console.log('current project before: ', current_pro)
})

clear_projects.addEventListener('click', () => {
  user_pros = []
  user_pro_list.innerHTML = ''
  pro_count = 0
  console.log(user_pros)
})

clear_tasks.addEventListener('click', () => {
  current_pro.tasks = []
  tasks_list.innerHTML = ''
  console.log(current_pro.tasks)
})
