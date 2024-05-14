const task_detail = document.querySelector('.task-detail-modal')
const detail_text = document.querySelector('.detail-text')


export function updateProject(div, pros) {
    let button = document.createElement('button')
    let project = pros[pros.length-1]

    button.textContent = project.name
    button.setAttribute("class", "project-button user-project-button")
    // button.classList.add('user-project-button')
    div.appendChild(button)
}

export function showProject(heading, list, currentPro, importantPro) {
    list.innerHTML = ''

    let tasks = currentPro.tasks
    heading.textContent = currentPro.name

    if (tasks.length > 0) {
        tasks.forEach((task, index) => {
            let li = document.createElement('li')
            let date = document.createElement('input')
            let detail = document.createElement('button')
            let imp_btn = document.createElement('button')
            let del_task = document.createElement('button')
           
            date.classList.add('date-input')
            detail.classList.add('detail-button')
            detail.textContent = 'Detail'
            imp_btn.classList.add('addto-important-btn')
            imp_btn.textContent = 'IMP'
            del_task.classList.add('delete-task-button')
            del_task.textContent = 'X'
            del_task.setAttribute('key', index)
            li.setAttribute('key', index)
            li.textContent = task.title

            detail.addEventListener('click', () => {
                detail_text.textContent = task.desc
                task_detail.show()
            })

            imp_btn.addEventListener('click', () => {
                task.important = (task.important==true) ? false : true
                task.important && importantPro.tasks.push(task)
                console.log(importantPro)
            })

            del_task.addEventListener('click', () => {
                list.removeChild(li)
                tasks.splice(index, 1)
                // console.log(tasks)
                console.log(currentPro)
            })

            li.append(detail, imp_btn, del_task)
            list.appendChild(li)
        })  
    }
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