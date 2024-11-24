// I might refactor this someday...in a far distant future...

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
const pro_heading = document.querySelector('.project-header')

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
const overlay = document.querySelector('.overlay')
const field_required = document.querySelector('.field-required')
const pro_field_required = document.querySelector('.pro-field-required')
const TEST = document.querySelector('.test-button')
const nuke_ls = document.querySelector('.clear-ls')

class Task {
  constructor(title, desc) {
    this.title = title
    this.desc = desc
    this.important = false
    // this.stored = false
    this.date
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

const default_pro = new Project('Tasks')
const today = new Project('Today')
const this_week = new Project('This Week')
let important = new Project('Important')

const date_pros = [today, this_week]
// let user_pros = null
let user_pros = []
let current_pro = default_pro
const all_pros = [default_pro, today, this_week, important]
let pro_count = 0

///////////////////// LOCAL STORAGE ////////////////////////
let userPros = null
let stored_pros = null

window.onload = () => {
  stored_pros = localStorage.getItem('allPros')
  // userPros = localStorage.getItem('userPros')
  if (stored_pros) {
    stored_pros = JSON.parse(localStorage.getItem('allPros'))
    userPros = JSON.parse(localStorage.getItem('userPros'))
    
    let i = 0
    while(i < 4) {
      all_pros[i] = stored_pros[i]
      i++
    }
    user_pros = userPros

    current_pro = JSON.parse(localStorage.getItem('currentPro'))
    date_pros[0] = all_pros[1]
    date_pros[1] = all_pros[2]
    important = all_pros[3]

    if (userPros)
      showUserPros(user_pro_list, user_pros)

    showProject(pro_heading, tasks_list, current_pro, important, date_pros, all_pros)
  } else {
    localStorage.setItem('allPros', JSON.stringify(all_pros))
    localStorage.setItem('userPros', JSON.stringify(user_pros))
    localStorage.setItem('currentPro', JSON.stringify(all_pros[0]))
  }

  // console.log(`user pro count on load: ${pro_count}`)
  // console.log('user pros on load: ', user_pros)
  // console.log('all_pros on load: ', all_pros)
  // console.log('TYPE OF userPros: ', typeof(user_pros))
  // console.log('TYPE OF stored_pros: ', typeof(stored_pros))

  // console.log('all_pros on load from LS: ', JSON.parse(localStorage.getItem('allPros')))
  // console.log('user_pros on load from LS: ', JSON.parse(localStorage.getItem('userPros')))
  console.log('Tasks on load from LS: ', current_pro)
}

//////////////////////////////////////////////////////////

let visible = false
document.addEventListener('keydown', ({ altKey, key }) => {
  if (altKey && key === 'n') {
      visible = !visible
      // event.preventDefault()
      nuke_ls.style.visibility = visible ? 'visible' : 'hidden'
  }
})

nuke_ls.addEventListener('click', () => {
  localStorage.clear()
  location.reload()
})

showProject(pro_heading, tasks_list, current_pro, important, date_pros, all_pros)

// updates the DOM with the user projects from localStorage
function showUserPros(list, pros) {   
  pros.forEach((pro, index)=> {
      let li = document.createElement('li')
      let pro_name = document.createElement('button')
      let del_pro = document.createElement('button')

      pro.index = index
      pro_count = pros.length

      li.classList.add('project-li')
      pro_name.textContent = pro.name
      pro_name.setAttribute("class", "project-button user-project-button")
      pro_name.addEventListener('click', (e) => {
        let btn_text = e.target.textContent
        if (btn_text == pro.name) current_pro = pro

        localStorage.setItem('currentPro', JSON.stringify(current_pro))
        showProject(pro_heading, tasks_list, current_pro, important, date_pros, all_pros)
        console.log('current pro: ', current_pro)
        console.log(`pro index: ${pro.index}`)
      })

      del_pro.textContent = 'X'
      del_pro.setAttribute('id', 'delete-project')
      deleteProListener(del_pro, list, user_pros, pro)

      li.append(pro_name, del_pro)
      list.appendChild(li)
  })
}

// brainfuck procedure for adding event listeners to dynamically added user projects
function handleButtonClick(e) {
  let btn_text = e.target.textContent

  all_pros.forEach(pro => {
      if (btn_text == pro.name) current_pro = pro
  })
  showProject(pro_heading, tasks_list, current_pro, important, date_pros, all_pros)
}

function deleteProject(list, userPros, pro) {
  const li = list.children[pro.index]

  list.removeChild(li)
  userPros.splice(pro.index, 1)

  if (userPros[pro.index]) {
    current_pro = userPros[pro.index]
  } else if (userPros[pro.index - 1]) {
    current_pro = userPros[pro.index - 1]
  } else {
    current_pro = default_pro
  }

  userPros.forEach((pro, index) => {
    pro.index = index
  })
  pro_count = user_pros.length

  // all_pros[4] = user_pros
  // console.log('user pros after delete: ', user_pros)
  localStorage.setItem('currentPro', JSON.stringify(current_pro))
  localStorage.setItem('userPros', JSON.stringify(userPros))
  // localStorage.setItem('allPros', JSON.stringify(all_pros))
  console.log('user pros after delete: ', user_pros)
  console.log('all_pros from LS after delete pro: ', JSON.parse(localStorage.getItem('allPros')))
  console.log('user_pros from LS after delete pro: ', JSON.parse(localStorage.getItem('userPros')))
  showProject(pro_heading, tasks_list, current_pro, important, date_pros, all_pros)
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

////////////////////////////////////////////////////////////////////////

function addNewProject() {
  let name = project_name.value
  let project = new Project(name)

  if (!name) {
    pro_field_required.style.display = 'block'
    project_name.style.outline = 'solid 2px #ff6200'
    return
  }

  project.index = pro_count
  pro_count++
  user_pros.push(project)
  all_pros.push(project)
  updateProject(user_pro_list, user_pros)
  project_modal.close()
  overlay.style.display = 'none'
  current_pro = project  

  localStorage.setItem('currentPro', JSON.stringify(current_pro))
  localStorage.setItem('allPros', JSON.stringify(all_pros))
  localStorage.setItem('userPros', JSON.stringify(user_pros))  
  showProject(pro_heading, tasks_list, current_pro, important, date_pros, all_pros)

  const last_li = document.querySelector('.project-li:last-child')
  const parent_list = last_li.parentNode
  let buttons = last_li.querySelectorAll('button')
  let pro_name = buttons[0]
  let del_pro = buttons[1]

  if (pro_name) addButtonClickListener(pro_name)
  if (del_pro) deleteProListener(del_pro, parent_list, user_pros, project)

  // console.log('user pros: ', user_pros)
  console.log('all_pros from LS after adding pro: ', JSON.parse(localStorage.getItem('allPros')))
  console.log('user_pros from LS after adding pro: ', JSON.parse(localStorage.getItem('userPros')))
}

add_project.addEventListener('click', addNewProject) 

// event listeners for the default projects
def_pro_btns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    let btn_text = e.target.textContent
    all_pros.forEach(pro => {
      if (btn_text == pro.name) current_pro = pro
    })

    localStorage.setItem('currentPro', JSON.stringify(current_pro))
    console.log("Current project:", current_pro)
    showProject(pro_heading, tasks_list, current_pro, important, date_pros, all_pros)
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
  close_detail,
  overlay
)

task_title.addEventListener('change', () => {
  if (task_title.value) {
    field_required.style.display = 'none'
    task_title.style.outline = 'none'
  }
})

project_name.addEventListener('change', () => {
  if (project_name.value) {
    pro_field_required.style.display = 'none'
    project_name.style.outline = 'none'
  }
})

add_task.addEventListener('click', () => {
  let title = task_title.value
  let desc = task_desc.value
  let task = new Task(title, desc)

  if (!title) {
    field_required.style.display = 'block'
    task_title.style.outline = 'solid 2px #ff6200'
    return
  }

  if (current_pro == important) task.important = true
  current_pro.tasks.push(task)
  task_modal.close()
  overlay.style.display = 'none'

  localStorage.setItem('allPros', JSON.stringify(all_pros))
  showProject(pro_heading, tasks_list, current_pro, important, date_pros, all_pros) 
})

clear_projects.addEventListener('click', () => {
  // console.log('current pro: ', current_pro)
  // console.log('default pro: ', default_pro)
  // console.clear()
  if (user_pros.length == 0) return
  
  user_pros = []
  user_pro_list.innerHTML = ''
  
  // current_pro = default_pro
  pro_count = 0

  localStorage.setItem('userPros', JSON.stringify(user_pros))
  // current_pro = default_pro
  // console.log('current pro: ', current_pro)
  // console.log('default pro: ', default_pro)
  // localStorage.setItem('allPros', JSON.stringify(all_pros))  // uncomment if something breaks lol

  current_pro = all_pros[0]
  localStorage.setItem('currentPro', JSON.stringify(current_pro))
  showProject(pro_heading, tasks_list, current_pro, important, date_pros, all_pros)
  // console.log('user pros after clear all: ', user_pros)
  // console.log('all pros after clear all: ', all_pros)
})

clear_tasks.addEventListener('click', () => {
  current_pro.tasks = []
  tasks_list.innerHTML = ''
  localStorage.setItem('allPros', JSON.stringify(all_pros))
})