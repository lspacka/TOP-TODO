const task_detail = document.querySelector('.task-detail-modal')
const detail_text = document.querySelector('.detail-text')
const overlay = document.querySelector('.overlay')
const detail_btn = document.querySelector('.detail-button')
const body = document.body
const edit_task_modal = document.querySelector('.edit-task-modal')
const edit_title = document.querySelector('#edit-title')
const edit_desc = document.querySelector('#edit-desc')
const edit_task_accept = document.getElementById('edit-task-accept')
const cancel_edit_task = document.getElementById('cancel-edit-task')

const eye_src = '../resources/icons/eye.png'
const edit_src = '../resources/icons/pencil.png'
const star_src = '../resources/icons/star.png'
const star_fill = '../resources/icons/star-fill.png'

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
            const detail = document.createElement('img')
            const edit_task = document.createElement('img')
            const imp_btn = document.createElement('img')
            const del_task = document.createElement('button')

            task.index = index
            task_title.textContent = task.title
            task_btns.classList.add('task-buttons')

            no_date.classList.add('no-date')
            no_date.textContent = task.date ? task.date : 'Add Date'
            no_date.setAttribute('title', 'Add due date')

            date_input.classList.add('date-input')
            date_input.setAttribute('type', 'date')

            detail.classList.add('detail-button')
            detail.setAttribute('src', eye_src)
            detail.setAttribute('title', 'See Detail')

            edit_task.classList.add('edit-task')
            edit_task.setAttribute('src', edit_src)
            edit_task.setAttribute('id', null)
            edit_task.setAttribute('title', 'Edit Task')

            imp_btn.classList.add('addto-important-btn')
            imp_btn.setAttribute('src', '')
            imp_btn.setAttribute('title', 'Add to Important')
            imp_btn.src = task.important ? star_fill : star_src

            del_task.classList.add('delete-task-button')
            del_task.textContent = 'X'

            no_date.addEventListener('click', (e) => {
                e.stopPropagation()
                date_input.style.visibility = 'visible'
                // no_date.style.visibility = 'hidden'
            })

            date_input.addEventListener('change', () => {
                task.date = date_input.value
                no_date.textContent = task.date
                date_input.style.visibility = 'hidden'

                sortDate(task, datePros, currentPro, list, li)
                console.log(currentPro)
            })

            date_input.addEventListener('click', (e) => {
                e.stopPropagation()
            })

             //  change body for li if there are issues
            body.addEventListener('click', () => {         
                if (date_input.style.visibility == 'visible' ) {
                    date_input.style.visibility = 'hidden'
                    // no_date.style.visibility = 'visible'
                }
            })

            detail.addEventListener('click', () => {
                detail_text.textContent = task.desc ? task.desc : task.title
                task_detail.show()
                overlay.style.display = 'block'
            })

            edit_task.addEventListener('click', () => {
                edit_task.id = index
                let current_task = tasks[edit_task.id]
                edit_task_modal.show()
                overlay.style.display = 'block'
                console.log(edit_task.id)
                console.log(current_task)

                edit_task_accept.addEventListener('click', (e) => {
                    e.stopPropagation()
    
                    current_task.title = edit_title.value
                    task_title.textContent = current_task.title
                    current_task.desc = edit_desc.value
                    edit_task_modal.close()
                    overlay.style.display = 'none'
                    console.log('task after edit: ', current_task)
                })
                
                cancel_edit_task.addEventListener('click', () => {
                    edit_task_modal.close()
                    overlay.style.display = 'none'
                })
            })

            // edit_task_accept.addEventListener('click', (e) => {
            //     e.stopPropagation()

            //     task.title = edit_title.value
            //     task_title.textContent = task.title
            //     task.desc = edit_desc.value
            //     edit_task_modal.close()
            //     overlay.style.display = 'none'
            // })
            // cancel_edit_task.addEventListener('click', () => {
            //     edit_task_modal.close()
            //     overlay.style.display = 'none'
            // })

            imp_btn.addEventListener('click', () => {
                task.important = task.important ? false : true

                if (task.important && !importantPro.tasks.includes(task)) {
                    imp_btn.src = star_fill
                    importantPro.tasks.push(task)
                    task.index = importantPro.tasks.indexOf(task)
                }
                
                if (!task.important && importantPro.tasks.includes(task)) {
                    imp_btn.src = star_src
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

            task_btns.append(no_date, date_input, detail, edit_task, imp_btn, del_task)
            li.append(task_title, task_btns)
            list.appendChild(li)
        })
        
        tasks.forEach((task, index) => {
            //
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
        overlay.style.display = 'none'
    })

    // detail_btn.addEventListener('click', () => {
    //     detail_text.textContent = task.desc
    //     detailModal.show()
    //     overlay.style.display = 'block'
    // })
}