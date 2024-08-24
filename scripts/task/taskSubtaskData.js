/**
 * Adds a new subtask.
 */
function addSubtask() {
    let text = document.getElementById('form-subtask');
    if (text.value != '') {
        subtasks.push(text.value);
    }
    text.value = '';
    renderSubtasks();
}

/**
 * Renders the list of subtasks.
 */
function renderSubtasks() {
    let list = document.getElementById('subtask-list');
    list.innerHTML = subtasks.map((subtask, i) => subtaskHTML(i)).join('');
}

/**
 * Adds or removes a subtask from the use list.
 * @param {number} i 
 */
function subtaskToUse(i) {
    let checkBox = document.getElementById(`form-check-subtask-${i}`);
    if (checkBox.checked) {
        let subtaskNew = document.getElementById(`subtask${i}`).innerHTML;
        if (!subtasksToUse.includes(subtaskNew)) {
            subtasksToUse.push(subtaskNew);
        }
    } else {
        subtasksToUse = subtasksToUse.filter(subtask => subtask !== document.getElementById(`subtask${i}`).innerHTML);
    }
}

/**
 * Returns today's date in the correct format.
 * @returns {string}
 */
function today() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    return `${year}-${month}-${day}`;
}

/**
 * Checks if a date is entered, otherwise returns today's date.
 * @param {string} val 
 * @returns {string}
 */
function checkDate(val) {
    return val === '' ? today() : val;
}

/**
 * Checks if an image is set, otherwise returns a default image.
 * @returns {string}
 */
function checkImg() {
    return arrayImage.length ? arrayImage[0] : `<img class="prio" src="../accessories/img/capa.png">`;
}