export function updateProject(div, pros) {
    let button = document.createElement('button')
    let project = pros[pros.length-1]

    button.textContent = project.name
    button.setAttribute("class", "project-button user-project-button")
    // button.classList.add('user-project-button')
    div.appendChild(button)
}

export function showProject(heading, list, pro) {
    list.innerHTML = ''
    let tasks = pro.tasks
    heading.textContent = pro.name

    if (tasks.length > 0) {
        tasks.forEach((task, index) => {
            let li = document.createElement('li')
            let button = document.createElement('button')

            button.classList.add('.detail-button')
            button.textContent = 'Detail'
            li.setAttribute('key', index)
            li.textContent = task.title
            li.appendChild(button)
            list.appendChild(li)
        })  
    }
}

export function deleteTask() {
    //
}

export function TaskDetail(task) {
    //
}

export function ModalHandler(newPro, cancelPro, newTask, cancelTask, proModal, taskModal) {
    newPro.addEventListener('click', () => {
        proModal.show()
    })

    cancelPro.addEventListener('click', () => {
        proModal.close()
    })

    newTask.addEventListener('click', () => {
        taskModal.show()
    })

    cancelTask.addEventListener('click', () => {
        taskModal.close()
        console.log('this guy fucks')
    })
}