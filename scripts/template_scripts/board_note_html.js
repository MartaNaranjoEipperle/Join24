/**
 * Generate the header part of the note.
 * @param {Object} task - The task object containing note details.
 * @param {number} i - The index of the note.
 * @param {string} colorStyle - The style to be applied to the header.
 * @returns {string} - The HTML string for the note header.
 */
function generateNoteHeader(task, i, colorStyle) {
    return `
      <div class="frame1132" style="${colorStyle}" id="color${i}">
        <div class="desing" id="desing${i}">${task['category']}</div>
      </div>
    `;
}

/**
 * Generate the content part of the note.
 * @param {Object} task - The task object containing note details.
 * @param {number} i - The index of the note.
 * @returns {string} - The HTML string for the note content.
 */
function generateNoteContent(task, i) {
    return `
      <div class="frame116">
        <div class="frame114">
          <div class="website" id="title${i}"><b>${task['title']}</b></div>
          <div class="modify" id="text${i}">${task['description']}</div>
        </div>
      </div>
      <div class="frame139">
        <div class="column">
          <div class="frame112" id="people${i}">
            ${Array.isArray(task['initial']) ? task['initial'].join(' ') : ''}
          </div>
          <div class="new-contact">
            ${Array.isArray(task['invite']) ? task['invite'].join(', ') : ''}
          </div>
        </div>
        <div class="frame111" id="frame111${i}">
          ${task['img']}
        </div>
      </div>
    `;
}

/**
 * Generate the trash button for the note.
 * @param {number} i - The index of the note.
 * @returns {string} - The HTML string for the trash button.
 */
function generateTrashButton(i) {
    return `
      <div class="trash-place">
        <img class="trash" src="../accessories/img/trash.png" onclick="markAsDone(${i})">
      </div>
    `;
}

/**
 * Generate the complete HTML content of a new note.
 * @param {Object} task - The task object containing note details.
 * @param {number} i - The index of the note.
 * @param {string} colorStyle - The style to be applied to the note.
 * @returns {string} - The complete HTML string for the note.
 */
function createNoteHTML(task, i, colorStyle) {
    return `
      <div class="frame71" draggable="true" id="${i}" ondragstart="startDragging(${i})">
        <div class="frame119" onclick="openNote(${i})">
          ${generateNoteHeader(task, i, colorStyle)}
          ${generateNoteContent(task, i)}
        </div>
        ${generateTrashButton(i)}
      </div>
    `;
}

/**
 * Generate the header of the note with a close button for the zoomed view.
 * @param {string} task - The task object containing note details.
 * @param {number} i - The index of the note.
 * @param {string} colorStyle - The style to be applied to the header.
 * @returns {string} - The HTML string for the note header in zoomed view.
 */
function generateNoteHeaderZoom(task, i, colorStyle) {
    return `
      <div class="side-by-side">
         ${generateNoteHeader(task, i, colorStyle)}
        <div onclick="closeShow()" class="close">x</div>
      </div>
    `;
}

/**
 * Generate the details of the note.
 * @param {Object} task - The task object containing note details.
 * @param {number} i - The index of the note.
 * @returns {string} - The HTML string for the note details.
 */
function generateNoteDetails(task, i) {
    return `
      <div class="note-title" id="title${i}"><b>${task['title']}</b></div>
      <div class="note-description" id="text${i}">${task['description']}</div>
      <div class="side-by-side">
        <div><b>Due date:</b></div> <div>${task['date']}</div>
      </div>
      <div class="side-by-side">
        <div>Priority:</div>
        <div class="frame111" id="frame111${i}">${task['img']}</div>
      </div>
      <div><b>Assigned To:</b></div>
      <div class="column">
        <div class="frame112" id="people${i}">
          ${task['initial'].join(' ')}
        </div>
        <div class="new-task"><b>Subtask:</b><br>${task['newSubtask']}</div>
      </div>
    `;
}

/**
 * Generate the action buttons for the note.
 * @param {number} i - The index of the note.
 * @returns {string} - The HTML string for the action buttons.
 */
function generateNoteActions(i) {
    return `
      <div class="together">
        <button id="toDoSplit${i}" onclick="updateTaskState(${i}, 'todoTable')" class="workplace">To Do</button>
        <button id="progressSplit${i}" onclick="updateTaskState(${i}, 'progressTable')" class="workplace">Progress</button>
        <button id="feedbackSplit${i}" onclick="updateTaskState(${i}, 'feedbackTable')" class="workplace">Feedback</button>
        <button id="doneSplit${i}" onclick="updateTaskState(${i}, 'doneTable')" class="workplace">Done</button> 
      </div>
    `;
}

/**
 * Generate the complete HTML content of the note for the zoomed view.
 * @param {Object} task - The task object containing note details.
 * @param {number} i - The index of the note.
 * @param {string} colorStyle - The style to be applied to the note.
 * @returns {string} - The complete HTML string for the note in zoomed view.
 */
function noteHTML(task, i, colorStyle) {
    return `
      <div class="show-note" id="${i}">
        ${generateNoteHeaderZoom(task, i, colorStyle)}
        ${generateNoteDetails(task, i)}
        ${generateNoteActions(i)}
      </div>
    `;
}
