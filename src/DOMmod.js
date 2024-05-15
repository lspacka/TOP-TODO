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

export function showProject(heading, list, currentPro, importantPro, datePros) {
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
            no_date.textContent = task.date ? task.date : 'Add Date'

            date_input.classList.add('date-input')
            date_input.setAttribute('type', 'date')

            detail.classList.add('detail-button')
            detail.textContent = 'Detail'

            imp_btn.classList.add('addto-important-btn')
            imp_btn.textContent = 'IMP'

            del_task.classList.add('delete-task-button')
            del_task.textContent = 'X'
            // del_task.setAttribute('key', index)

            // li.setAttribute('key', index)
            // li.textContent = task.title

            no_date.addEventListener('click', () => {
                date_input.style.visibility = 'visible'
            })

            date_input.addEventListener('change', () => {
                task.date = date_input.value
                no_date.textContent = task.date
                date_input.style.visibility = 'hidden'
                sortDate(task, datePros)
                console.log(currentPro)
            })

            detail.addEventListener('click', () => {
                detail_text.textContent = task.desc
                task_detail.show()
            })

            imp_btn.addEventListener('click', () => {
                task.important = task.important ? false : true
                // task.important && importantPro.tasks.push(task)
                if (task.important) importantPro.tasks.push(task)
                else importantPro.tasks.splice(index, 1) // cant be index cos its not consistent across projects
                console.log(importantPro)
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

export function sortDate(task, datePros) {
    //  set today
    //  set this week
    //  go thru project.tasks
    //  if task.date doesnt match either today or week, pluck it out 
    //  if (task.date == today || this week) project.push(task)

    const today_pro = datePros[0]
    const week_pro = datePros[1]
    const date_comps = task.date.split('-')
    const year = date_comps[0]
    const month = date_comps[1] - 1
    const day = date_comps[2]

    const date = new Date(year, month, day)
    const today = new Date()
    const week_start = new Date(today.getFullYear(), today.getMonth(), today.getDate()-today.getDay())
    const week_end = new Date(today.getFullYear(), today.getMonth(), today.getDate()+(6-today.getDay()))

    // const today_year = today.getFullYear()
    // const today_month = today.getMonth()
    // const today_day = today.getDate()

    if (date>=week_start && date<=week_end) week_pro.tasks.push(task)
    // if (year==today_year && month==today_month && day==today_day) today_pro.tasks.push(task)
    if (
        date.getFullYear() == today.getFullYear() &&
        date.getMonth() == today.getMonth() &&
        date.getDate() == today.getDate()
    ) today_pro.tasks.push(task)
}

export function cleanDate() {
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
