/**
 * Sets the ID of the currently dragged element.
 * @param {string} id - The ID of the element being dragged.
 */
function startDragging(id) {
    currentDraggedElement = id;
}

/**
 * Allows an element to be dropped by preventing default behavior.
 * @param {Event} ev - The drag event.
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Moves the dragged element to a new processing state and updates Firebase.
 * @param {string} processingState - The new state to assign to the dragged task.
 */
function MoveTo(processingState) {
    allTasks[currentDraggedElement].processing_state = processingState;
    updateHTML();
    //saveToFirebase('tasks', processingState);
    updateTaskState(currentDraggedElement, processingState);
    //updateTasksInFirebase();
}

/**
 * Updates a task's state based on its index for mobile drag-and-drop.
 * @param {number} i - The index of the task to update.
 * @param {string} state - The new state to set for the task.
 */
function updateTaskState(i, state) {
    allTasks[i]['processing_state'] = state;
    let newNote = { ...allTasks[i] };
    allTasks.push(newNote);
    allTasks.splice(i, 1);
    updateCollectionInFirebase(allTasks, '/tasks');
    closeShow();
    updateHTML();
}
