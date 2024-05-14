const task_detail = document.querySelector('.task-detail-modal')


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
            let detail = document.createElement('button')
            let del_task = document.createElement('button')

            detail.classList.add('detail-button')
            detail.textContent = 'Detail'
            del_task.classList.add('delete-task-button')
            del_task.textContent = 'X'
            del_task.setAttribute('key', index)
            li.setAttribute('key', index)
            li.textContent = task.title

            detail.addEventListener('click', () => {
                task_detail.show()
            })

            del_task.addEventListener('click', () => {
                list.removeChild(li)
                tasks.splice(li, li)
                console.log(tasks)
                console.log(pro)
            })

            li.append(detail, del_task)
            list.appendChild(li)
        })  
    }
}

export function deleteTask(task) {
    //
}

export function TaskDetail(task) {
    //
}

export function ModalHandler(
    newPro, 
    cancelPro, 
    newTask, 
    cancelTask, 
    proModal, 
    taskModal,
    detailModal,
    closeDetail
) {
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

    closeDetail.addEventListener('click', () => {
        detailModal.close()
    })
}