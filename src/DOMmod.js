export function updateProject(div, pros) {
    let button = document.createElement('button')
    let project = pros[pros.length-1]

    button.textContent = project.name
    button.classList.add('user-project-button')
    div.appendChild(button)
}

export function showProject(div, pro) {
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

export function TaskDetail(task) {
    //
}