const task_detail = document.querySelector('.task-detail-modal')
const detail_text = document.querySelector('.detail-text')
const eye_src = '../resources/icons/eye.png'
const star_src = '../resources/icons/star.png'

export function updateProject(list, pros) {
    let li = document.createElement('li')
    let pro_name = document.createElement('button')
    let del_pro = document.createElement('button')
    let project = pros[pros.length-1]

    li.classList.add('project-li')
    pro_name.textContent = project.name
    pro_name.setAttribute("class", "project-button user-project-button")
    del_pro.textContent = 'X'
    // del_pro.classList.add('delete-project')
    del_pro.setAttribute('id', 'delete-project')
    li.append(pro_name, del_pro)
    list.appendChild(li)
}

export function showProject(heading, list, currentPro, importantPro, datePros) {
    list.innerHTML = ''

    let tasks = currentPro.tasks
    heading.textContent = currentPro.name

    if (tasks.length > 0) {
        tasks.forEach((task, index) => {
            const li = document.createElement('li')
            const task_title = document.createElement('span')
            const task_btns = document.createElement('span')
            const no_date = document.createElement('p')
            const date_input = document.createElement('input')
            // const detail = document.createElement('button')
            // const imp_btn = document.createElement('button')
            const detail = document.createElement('img')
            const imp_btn = document.createElement('img')
            const del_task = document.createElement('button')

            task.index = index
            task_title.textContent = task.title
            task_btns.classList.add('task-buttons')

            no_date.classList.add('no-date')
            no_date.textContent = task.date ? task.date : 'Add Date'

            date_input.classList.add('date-input')
            date_input.setAttribute('type', 'date')

            detail.classList.add('detail-button')
            // detail.textContent = 'Detail'
            detail.setAttribute('src', eye_src)

            imp_btn.classList.add('addto-important-btn')
            // imp_btn.textContent = 'IMP'
            imp_btn.setAttribute('src', star_src)

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
                sortDate(task, datePros, currentPro, list, li)
                console.log(currentPro)
            })

            detail.addEventListener('click', () => {
                detail_text.textContent = task.desc
                task_detail.show()
            })

            imp_btn.addEventListener('click', () => {
                task.important = task.important ? false : true

                if (task.important && !importantPro.tasks.includes(task)) {
                    importantPro.tasks.push(task)
                    task.index = importantPro.tasks.indexOf(task)
                }
                
                if (!task.important && importantPro.tasks.includes(task)) {
                    importantPro.tasks.splice(task.index, 1)
                    importantPro == currentPro && list.removeChild(li)

                    //  update indexes after deleting a task
                    importantPro.tasks.forEach((task, index) => {
                        task.index = index
                    })
                    console.log(importantPro, currentPro)
                    console.log(task.title, task.important, 'index: ', task.index) 
                }
            })

            del_task.addEventListener('click', () => {
                tasks.splice(task.index, 1)
                list.removeChild(li)

                tasks.forEach((task, index) => {
                    task.index = index
                })
                console.log(currentPro)
            })

            task_btns.append(no_date, date_input, detail,  imp_btn, del_task)
            li.append(task_title, task_btns)
            list.appendChild(li)
        })  
    }
}

function sortDate(task, datePros, currentPro, list, li) {
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


    if (date>=week_start && date<=week_end && !week_pro.tasks.includes(task)) week_pro.tasks.push(task)

    if (date<week_start || date>week_end && week_pro.tasks.includes(task)) {
        week_pro.tasks.splice(task.index, 1)
        week_pro == currentPro && list.removeChild(li) 

        week_pro.tasks.forEach((task, index) => {
            task.index = index
        })
    }

    if (
        date.getFullYear() == today.getFullYear() &&
        date.getMonth() == today.getMonth() &&
        date.getDate() == today.getDate() &&
        !today_pro.tasks.includes(task)
    ) today_pro.tasks.push(task)

    if (
        date.getFullYear() != today.getFullYear() ||
        date.getMonth() != today.getMonth() ||
        date.getDate() != today.getDate() &&
        today_pro.tasks.includes(task)
    ) {
        today_pro.tasks.splice(task.index, 1)
        today_pro == currentPro && list.removeChild(li)

        today_pro.tasks.forEach((task, index) => {
            task.index = index
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
    closeDetail,
    overlay
) {
    newPro.addEventListener('click', () => {
        overlay.style.display = 'block'
        proModal.show()
        // proModal.style.display = 'block'
    })

    cancelPro.addEventListener('click', () => {
        proModal.close()
        overlay.style.display = 'none'
    })

    newTask.addEventListener('click', () => {
        taskModal.show()
        overlay.style.display = 'block'
    })

    cancelTask.addEventListener('click', () => {
        taskModal.close()
        overlay.style.display = 'none'
        console.log('this guy fucks')
    })

    closeDetail.addEventListener('click', () => {
        detailModal.close()
    })
}