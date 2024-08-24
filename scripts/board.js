let smallViewport = false;

/**
 * Initializes the application by loading data from Firebase, fetching tasks, updating the HTML, and adding board color.
 */
async function initboard() {
    await loadFromFirebase();
    await fetchTasksData();
    updateHTML();
    addSectionColor('boardSide');
    board = true;
    scroll('content');

}

/**
 * Updates the HTML by clearing the existing content, iterating over all tasks, and appending task notes to the appropriate columns based on their processing state.
 */
function updateHTML() {
    clearTaskTables();
    for (let i = 0; i < allTasks.length; i++) {
        let element = allTasks[i]['processing_state'];
        let task = allTasks[i];
        if (["todoTable", "progressTable", "feedbackTable", "doneTable"].includes(element)) {
            document.getElementById(element).innerHTML += createNoteHTML(task, i);
        }
        updateColor(task['category'], i);
    }
}

/**
 * Opens a note in a popup by adding a class to the popup element, setting its inner HTML to the note content, and updating the color and split view.
 * @param {number} i - The index of the task to display.
 */
async function openNote(i) {
    document.getElementById('openNote').classList.add('open-popup-note');
    let task = allTasks[i];
    document.getElementById('openNote').innerHTML = '';
    document.getElementById('openNote').innerHTML += noteHTML(task, i);
    updateColor(task['category'], i);
    checkSplit(i);
    toggleClass('secondcontent', 'second-plan', true);
}

/**
 * Closes the currently opened note popup by removing the class from the popup element and adjusting the split view.
 */
function closeShow() {
    document.getElementById('openNote').classList.remove('open-popup-note');
    toggleClass('secondcontent', 'second-plan', false);
    checkSplit();
}

/**
 * Marks a task as done by removing it from the DOM and the `allTasks` array, then updates the task list in Firebase and the HTML view.
 * @param {number} i - The index of the task to mark as done.
 */
async function markAsDone(i) {
    let currentTask = document.getElementById(i);
    currentTask.remove();
    allTasks.splice(i, 1);
    await updateCollectionInFirebase(allTasks, '/tasks');
    updateHTML();
}

/**
 * Displays a newly added task on the board in the appropriate processing state column, then closes the add task popup.
 * @param {string} processingState - The processing state of the task (e.g., "todoTable").
 */
function showBoard(processingState) {
    let tasksBoard = document.getElementById(`${processingState}`);
    let i = allTasks.length - 1;
    let task = allTasks[i];
    tasksBoard.innerHTML += createNoteHTML(task, i);
    updateColor(task['category'], i);
    closeAddTaskPopup();
}

/**
 * Removes the 'workplace-add' class from all processing state columns.
 */
function removeWorkplaceAddClass() {
    let states = ["todoTable", "progressTable", "feedbackTable", "doneTable"];
    states.forEach(state => {
        let element = document.getElementById(state);
        if (element) {
            element.classList.remove('workplace-add');
        }
    });
}

/**
 * Checks and updates the split view based on the given task index. Adds the 'workplace-add' class to the processing state column of the specified task.
 * @param {number} i - The index of the task to check.
 */
function checkSplit(i) {
    if (i === undefined || !allTasks[i] || typeof allTasks[i] !== 'object' || !allTasks[i].processing_state) {
        removeWorkplaceAddClass();
        return;
    }
    removeWorkplaceAddClass();
    const element = document.getElementById(allTasks[i].processing_state);
    if (element) {
        element.classList.add('workplace-add');
    }
}








