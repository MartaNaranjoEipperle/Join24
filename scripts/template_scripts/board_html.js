/**
 * Generate the main HTML structure of the board.
 * @returns {string} - The complete HTML string for the board.
 */
function boardHTML() {
  return `
    <div id="secondcontent">
      ${mainHeadSection()}
      ${boardColumns()}
    </div>
    ${popupSection('')}
    ${noteSection()}
  `;
}

/**
* Generate the HTML for the columns of the board.
* @returns {string} - The HTML string for the board columns.
*/
function boardColumns() {
  return `
    <div class="boardV1 main-board" id="scroll">
      ${columnHTML('frame144', 'toDo', 'To do', 'todoTable')}
      ${columnHTML('frame145', 'inProgress', 'In progress', 'progressTable')}
      ${columnHTML('frame146', 'awaiting', 'Awaiting Feedback', 'feedbackTable')}
      ${columnHTML('frame133', 'doneText', 'Done', 'doneTable')}
    </div>
  `;
}

/**
* Generate the HTML for a single column in the board.
* @param {string} id - The ID of the column.
* @param {string} title - The class for the column title.
* @param {string} columnTitle - The display title of the column.
* @param {string} id2 - The ID for the column content.
* @returns {string} - The HTML string for the column.
*/
function columnHTML(id, title, columnTitle, id2) {
  return `
    <div class="column" id="${id}">
      <div class="column-head">
        <div class="${title} column-title">${columnTitle}</div>
        <img class="buttonPlus" src="../accessories/img/plus.png" onclick="openPopup('${id2}')">
      </div>
      <div id="${id2}" class="column-content" ondrop="MoveTo('${id2}')" ondragover="allowDrop(event)">
      </div>
    </div>
  `;
}

/**
 * Generates the HTML for the popup form section, including buttons for canceling and creating a task.
 * @param {string} name - The name or identifier used to customize the behavior of the cancel button.
 * @returns {string} - The HTML string for the popup form section.
 */
function popupSection(name) {
  return `  <div id="message-box" class="d-none">
      <span id="message">Task added to board!</span>
      <img src="../accessories/img/board_logo.svg" alt="">
  </div>
    <div class="popup-container" id="board-popup">
    <h1>Add Task</h1>
    <form id="add-task-form" onsubmit="createTaskonBoardTable('todoTable', 'add-task-form'); return false;">
      ${taskT()}
      ${buttonHTML('clear-btn', 'Cancel', 'fa-solid fa-xmark', `closeAddTaskPopup${name}()`)}
      ${buttonHTML('create-btn', 'Create Task', 'fa-solid fa-check', '', 'submit')}
      </div>
    </form>
  </div>
  `;
}

/**
* Generate the HTML for the note section.
* @returns {string} - The HTML string for the note section.
*/
function noteSection() {
  return `<div class="board-popup-note" id="openNote"></div>`;
}
