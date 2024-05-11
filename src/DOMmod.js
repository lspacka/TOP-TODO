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

export function ModalHandler() {
    //
}