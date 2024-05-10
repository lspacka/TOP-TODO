import './style.css'

const project_btns = document.querySelectorAll('.project-button')
const new_project = document.querySelector('.add-project')
const add_project = document.getElementById('add-project')
const cancel_project = document.getElementById('cancel-project')
const project_modal = document.querySelector('.project-modal')
const project_name = document.querySelector('.project-name')
const modal_heading = document.querySelector('.modal-heading')
const new_task = document.querySelector('.new-task-btn')
const task_info = document.querySelector('.task-modal')
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
  name: 'this_week',
  tasks: []
}

let important = {
  name: 'important',
  tasks: []
}

let user_pros = []
let current_pro = default_pro
let default_pros = [default_pro, today, this_week, important]

// console.log(typeof tasks)

project_btns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    let btn_text = e.target.textContent.toLowerCase().split(' ').join('_') 
    default_pros.forEach(pro => {
      if (btn_text == pro.name) current_pro = pro
    })
  })
})

new_project.addEventListener('click', () => {
  project_modal.show()
})

add_project.addEventListener('click', () => {
  let name = project_name.value
  let project = new Project(name)
  // create project button
  // add 'project-button' class
  user_pros.push(project)
  console.log(user_pros)
})

cancel_project.addEventListener('click', () => {
  project_modal.close()
})

new_task.addEventListener('click', () => {
  task_info.show()
})

add_task.addEventListener('click', () => {
  let title = task_title.value
  let desc = task_desc.value

  let task = new Task(title, desc)
  current_pro.tasks.push(task)
  console.log(current_pro)
})

cancel_task.addEventListener('click', () => {
  task_info.close()
  console.log('this guy fucks')
})
