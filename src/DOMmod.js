const task_detail = document.querySelector('.task-detail-modal')
const detail_text = document.querySelector('.detail-text')
const overlay = document.querySelector('.overlay')
const content = document.querySelector('.content')
const project_name = document.querySelector('.project-name')
const pro_field_required = document.querySelector('.pro-field-required')
const task_title = document.querySelector('.task-title')
const field_required = document.querySelector('.field-required')
const detail_btn = document.querySelector('.detail-button')
const body = document.body

import eye_src from './eye.png'
import edit_src from './pencil.png'
import star_src from './star.png'
import star_fill from './star-fill.png'

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

export function showProject(heading, list, currentPro, importantPro, datePros, allPros) {
    console.log('current_pro from showProject: ', currentPro)
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
            del_task.setAttribute('title', 'Delete Task')

            no_date.addEventListener('click', (e) => {
                e.stopPropagation()
                date_input.style.visibility = 'visible'
            })

            date_input.addEventListener('change', () => {
                task.date = date_input.value
                no_date.textContent = task.date
                date_input.style.visibility = 'hidden'

                sortDate(task, datePros, currentPro, list, li, allPros)
                // localStorage.setItem('allPros', JSON.stringify(allPros))
                console.log(currentPro)
            })

            date_input.addEventListener('click', (e) => {
                e.stopPropagation()
            })

            // resets the "add date" text 
            // change body for li if there are issues
            body.addEventListener('click', () => {         
                if (date_input.style.visibility == 'visible') {
                    date_input.style.visibility = 'hidden'
                }
            })

            detail.addEventListener('click', () => {
                detail_text.textContent = task.desc ? task.desc : task.title
                task_detail.show()
                overlay.style.display = 'block'
            })

            edit_task.addEventListener('click', () => {
                const dialog = document.createElement('dialog')
                const modal_heading = document.createElement('h2')
                const form = document.createElement('form')
                const task_label = document.createElement('label')
                const title_area = document.createElement('div')
                const edit_input = document.createElement('input')
                const field_required = document.createElement('span')
                const desc_label = document.createElement('label')
                const task_desc = document.createElement('textarea')
                const modal_btns = document.createElement('div')
                const accept_edit = document.createElement('button')
                const cancel_edit = document.createElement('button')

                dialog.classList.add('edit-task-modal')
                modal_heading.classList.add('modal-heading')

                task_label.classList.add('label')
                task_label.textContent = 'Task'

                title_area.classList.add('task-title-area')
                edit_input.classList.add('task-title')
                edit_input.setAttribute('id', 'edit-title')
                edit_input.setAttribute('required', '')
                field_required.classList.add('field-required')
                field_required.textContent = 'Required'

                desc_label.classList.add('label')
                desc_label.textContent = 'Description'
                task_desc.classList.add('task-desc')
                task_desc.setAttribute('id', 'edit-desc')
                
                modal_btns.classList.add('modal-buttons')
                accept_edit.classList.add('modal-button')
                accept_edit.setAttribute('id', 'edit-task-accept')
                accept_edit.setAttribute('type', 'submit')
                accept_edit.textContent = 'Accept'

                cancel_edit.classList.add('modal-button')
                cancel_edit.setAttribute('id', 'cancel-edit-task')
                cancel_edit.textContent = 'Cancel'

                edit_input.value = task.title
                task_desc.value = task.desc

                accept_edit.addEventListener('click', () => {
                    task.title = edit_input.value
                    if (!edit_input.value) {
                        field_required.style.display = 'block'
                        edit_input.style.outline = 'solid 2px #ff6200'
                        return
                    }

                    task_title.textContent = task.title
                    task.desc = task_desc.value

                    dialog.close()
                    overlay.style.display = 'none'
                    dialog.remove()

                    localStorage.setItem('allPros', JSON.stringify(allPros))
                })

                cancel_edit.addEventListener('click', () => {
                    dialog.close()
                    overlay.style.display = 'none'
                    dialog.remove()
                })

                title_area.append(edit_input, field_required)
                form.append(task_label, title_area, desc_label, task_desc)
                modal_btns.append(accept_edit, cancel_edit)
                dialog.append(modal_heading, form, modal_btns)
                content.appendChild(dialog)

                dialog.show()
                overlay.style.display = 'block'
            })

            imp_btn.addEventListener('click', () => {
                task.important = task.important ? false : true

                let task_index
                if (task.important) {
                    imp_btn.src = star_fill
                    task.stored = true

                    if (!importantPro.tasks.includes(task)) {
                        importantPro.tasks.push(task)
                        localStorage.setItem('allPros', JSON.stringify(allPros))
                    } else {
                        localStorage.setItem('allPros', JSON.stringify(allPros))
                    }
                } else if (!task.important) {
                    imp_btn.src = star_src

                    if (importantPro.tasks.includes(task) || task.stored) {
                        task_index = importantPro.tasks.indexOf(task)
                        importantPro.tasks.splice(task_index, 1)
                        importantPro == currentPro && list.removeChild(li)
    
                        // update indexes after deleting a task
                        importantPro.tasks.forEach((task, index) => {
                            task.index = index
                        })

                        localStorage.setItem('allPros', JSON.stringify(allPros))
                    } else {
                        localStorage.setItem('allPros', JSON.stringify(allPros))
                    }
                }
            })

            del_task.addEventListener('click', () => {
                tasks.splice(task.index, 1)
                list.removeChild(li)
                if (currentPro==importantPro && task.important) task.important = false

                tasks.forEach((task, index) => {
                    task.index = index
                })

                localStorage.setItem('allPros', JSON.stringify(allPros))
            })

            task_btns.append(no_date, date_input, detail, edit_task, imp_btn, del_task)
            li.append(task_title, task_btns)
            list.appendChild(li)
        })
    } 
}

function sortDate(task, datePros, currentPro, list, li, allPros) {
    const today_pro = datePros[0]
    const week_pro = datePros[1]
    const date_comps = task.date.split('-')
    const year = date_comps[0]
    const month = date_comps[1] - 1
    const day = date_comps[2]
    let today_index = today_pro.tasks.indexOf(task)
    let week_index = week_pro.tasks.indexOf(task)

    const date = new Date(year, month, day)
    const today = new Date()
    const week_start = new Date(today.getFullYear(), today.getMonth(), today.getDate()-today.getDay())
    const week_end = new Date(today.getFullYear(), today.getMonth(), today.getDate()+(6-today.getDay()))


    if (date>=week_start && date<=week_end && !week_pro.tasks.includes(task)) 
        week_pro.tasks.push(task)

    if (date<week_start || date>week_end && week_pro.tasks.includes(task)) {
        week_pro.tasks.splice(week_index, 1)
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
        today_pro.tasks.splice(today_index, 1)
        today_pro == currentPro && list.removeChild(li)

        today_pro.tasks.forEach((task, index) => {
            task.index = index
        })
    }
    
    localStorage.setItem('allPros', JSON.stringify(allPros))
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
        proModal.show()
        overlay.style.display = 'block'
    })

    cancelPro.addEventListener('click', () => {
        proModal.close()
        overlay.style.display = 'none'
        project_name.style.outline = 'none'
        pro_field_required.style.display = 'none' 
    })

    newTask.addEventListener('click', () => {
        taskModal.show()
        overlay.style.display = 'block'
    })

    cancelTask.addEventListener('click', () => {
        taskModal.close()
        overlay.style.display = 'none'
        task_title.style.outline = 'none'
        field_required.style.display = 'none'
    })

    closeDetail.addEventListener('click', () => {
        detailModal.close()
        overlay.style.display = 'none'
    })
}