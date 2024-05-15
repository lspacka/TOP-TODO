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
            const li = document.createElement('li')
            const task_title = document.createElement('p')
            const task_btns = document.createElement('span')
            const no_date = document.createElement('p')
            const date_input = document.createElement('input')
            const detail = document.createElement('button')
            const imp_btn = document.createElement('button')
            const del_task = document.createElement('button')
           
            task_title.textContent = task.title
            task_btns.classList.add('task-buttons')

            no_date.classList.add('no-date')
            // no_date.textContent = 'Add Date' 
            no_date.textContent = task.date ? task.date : 'Add Date'

            date_input.classList.add('date-input')
            date_input.setAttribute('type', 'date')

            detail.classList.add('detail-button')
            detail.textContent = 'Detail'

            imp_btn.classList.add('addto-important-btn')
            imp_btn.textContent = 'IMP'

            del_task.classList.add('delete-task-button')
            del_task.textContent = 'X'
            del_task.setAttribute('key', index)

            li.setAttribute('key', index)
            // li.textContent = task.title

            no_date.addEventListener('click', () => {
                date_input.style.visibility = 'visible'
            })

            date_input.addEventListener('change', () => {
                task.date = date_input.value
                no_date.textContent = task.date
                date_input.style.visibility = 'hidden'
                console.log(currentPro)
            })

            detail.addEventListener('click', () => {
                detail_text.textContent = task.desc
                task_detail.show()
            })

            imp_btn.addEventListener('click', () => {
                task.important = (task.important==true) ? false : true
                task.important && importantPro.tasks.push(task)
                // console.log(importantPro)
            })

            del_task.addEventListener('click', () => {
                list.removeChild(li)
                tasks.splice(index, 1)
                console.log(currentPro)
            })

            task_btns.append(no_date, date_input, detail,  imp_btn, del_task)
            li.append(task_title, task_btns)
            list.appendChild(li)
        })  
    }
}

export function sortDate() {
    //  set today
    //  set this week
    //  if (this week) week.push(task)
    //  else if (today) today.push(task) 
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