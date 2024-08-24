/**
 * Generates the HTML for a label element.
 * @param {string} text - The text to display in the label.
 * @returns {string} - The HTML string for the label.
 */
function labelHTML(text) {
  return `<p class="labels">${text}</p>`;
}

/**
* Generates the HTML for an input field.
* @param {string} type - The type of the input field (e.g., text, email).
* @param {string} name - The name attribute of the input field.
* @param {string} id - The id attribute of the input field.
* @param {string} placeholder - The placeholder text for the input field.
* @param {boolean} [required=false] - Whether the input field is required.
* @returns {string} - The HTML string for the input field.
*/
function inputFieldHTML(type, name, id, placeholder, required = false) {
  return `<input type="${type}" name="${name}" id="${id}" placeholder="${placeholder}" ${required ? 'required' : ''}>`;
}

/**
* Generates the HTML for a textarea.
* @param {string} name - The name attribute of the textarea.
* @param {string} id - The id attribute of the textarea.
* @param {string} placeholder - The placeholder text for the textarea.
* @param {boolean} [required=false] - Whether the textarea is required.
* @returns {string} - The HTML string for the textarea.
*/
function textareaHTML(name, id, placeholder, required = false) {
  return `<textarea name="${name}" id="${id}" cols="30" rows="10" placeholder="${placeholder}" ${required ? 'required' : ''}></textarea>`;
}

/**
* Generates the HTML for select options.
* @param {Array} options - An array of option objects with properties `class`, `value`, `selected`, and `text`.
* @returns {string} - The HTML string for the select options.
*/
function selectOptionsHTML(options) {
  return options.map(option => 
      `<option class="${option.class}" value="${option.value}" ${option.selected ? 'selected' : ''}>${option.text}</option>`
  ).join('');
}

/**
* Generates the HTML for a button.
* @param {string} id - The id attribute of the button.
* @param {string} text - The text to display on the button.
* @param {string} iconClass - The class of the icon to display on the button.
* @param {string} onClick - The JavaScript function to call when the button is clicked.
* @param {string} [buttonType='button'] - The type of the button (e.g., 'button', 'submit').
* @returns {string} - The HTML string for the button.
*/
function buttonHTML(id, text, iconClass, onClick, buttonType = 'button') {
  return `<button type="${buttonType}" id="${id}" onclick="${onClick}">
      <span class="icon_label">${text}</span>
      <span class="iconT"><i class="${iconClass}"></i></span>
  </button>`;
}

/**
* Generates the HTML for a category select dropdown with input for new category.
* @returns {string} - The HTML string for the category select dropdown.
*/
function categorySelectHTML() {
  return `
  <div class="category-line">
      <select name="category" id="form-category" required onchange="checkCategory()">
          <option class="grey" value="new-cat" id="new-cat">New category</option>
          <option class="orange" value="design" selected>Design</option>
          <option class="blue" value="backoffice">Backoffice</option>
          <option class="lime" value="sales">Sales</option>
      </select>
      <div class="input-category-line d-none">
          <input type="text" name="input-category" id="input-category" placeholder="New Category">
          <span id="close-category" onclick="closeCategory()"><i class="fa-solid fa-xmark cont-x"></i></span>
          <span id="confirm-category" onclick="confirmCategory()"><i class="fa-solid fa-check cont"></i></span>
      </div>
  </div>
  <div class="color-bar d-none">
      <span class="color color-azure" onclick="pickColor(0)"><span class="toggles active"></span></span>
      <span class="color color-red" onclick="pickColor(1)"><span class="toggles"></span></span>
      <span class="color color-lime" onclick="pickColor(2)"><span class="toggles"></span></span>
      <span class="color color-orange" onclick="pickColor(3)"><span class="toggles"></span></span>
      <span class="color color-magenta" onclick="pickColor(4)"><span class="toggles"></span></span>
      <span class="color color-blue" onclick="pickColor(5)"><span class="toggles"></span></span>
  </div>
  `;
}

/**
* Generates the HTML for the left box content of the task form.
* @returns {string} - The HTML string for the left box content.
*/
function leftBoxHTML() {
  return `
  <div class="form-box" id="box-left">
      ${labelHTML('Title')}
      ${inputFieldHTML('text', 'title', 'form-title', 'Enter a title', true)}
      ${labelHTML('Description')}
      ${textareaHTML('descr', 'form-descr', 'Enter a Description', true)}
      ${labelHTML('Category')}
      ${categorySelectHTML()}
      <p class="labels assigned" onclick="box()">Assigned to</p>
      <div id="select-box">
          <select id="form-assign" required>
              <option>Select contacts</option>
          </select>
          <div class="input-contact-line d-none" id="input-contact-line">
              ${inputFieldHTML('text', 'input-contact', 'input-contact', 'Invite Contact')}
              <div id="shosToAdd"></div>
          </div>
          <div class="overSelect" onclick="showCheckboxes()"></div>
          <div id="checkboxes"></div>
      </div>
      <div>Selected:</div>
      <div id="use-contact"></div>
      <div id="invited-contact"></div>
  </div>
  `;
}

/**
* Generates the HTML for the right box content of the task form.
* @returns {string} - The HTML string for the right box content.
*/
function rightBoxHTML() {
  return `
  <div class="form-box" id="box-right">
      ${labelHTML('Due date')}
      ${inputFieldHTML('date', 'date', 'input-date', '')}
      ${labelHTML('Prio')}
      <div class="prio-line">
          <button type="button" id="btn-1" class="prios" onclick="activate(1, 'urgent')">Urgent <span id="icon-prio-1"><i class="fa-solid fa-chevron-up"></i></span></button>
          <button type="button" id="btn-2" class="prios" onclick="activate(2, 'medium')">Medium <span id="icon-prio-2"><i class="fa-solid fa-equals"></i></span></button>
          <button type="button" id="btn-3" class="prios" onclick="activate(3, 'low')">Low <span id="icon-prio-3"><i class="fa-solid fa-chevron-down"></i></span></button>
      </div>
      ${labelHTML('Subtasks')}
      <div class="subtask-line">
          <button type="button" id="add-subtask" onclick="addSubtask()"><i class="fa-solid fa-plus"></i></button>
          ${inputFieldHTML('text', 'subtask', 'form-subtask', 'Add new subtask')}
      </div>
      <ul id="subtask-list"></ul>
  </div>
  `;
}

/**
* Generates the HTML for adding a task, including buttons for clearing and creating a task.
* @returns {string} - The HTML string for adding a task.
*/
function addTaskHTML() {
  return `
  <div id="message-box" class="d-none">
      <span id="message">Task added to board!</span>
      <img src="../accessories/img/board_logo.svg" alt="">
  </div>
  <div class="task-style">
  <h1>Add Task</h1>
  <form id="task-form" onsubmit="createTaskonBoardTable('todoTable', 'task-form'); return false;">
      ${taskT()}
      ${buttonHTML('clear-btn', 'Clear', 'fa-solid fa-xmark', 'clearInput("task-form")')}
      ${buttonHTML('create-btn', 'Create Task', 'fa-solid fa-check', '', 'submit')}
  </div>
  </form>
  </div>
  `;
}

/**
* Generates the HTML for the task form, including both left and right boxes.
* @returns {string} - The HTML string for the task form.
*/
function taskT() {
  return `
      <div class="form-content">
          ${leftBoxHTML()}
          ${rightBoxHTML()}
          <span id="hrz-line"></span>
      </div>
      <div class="btn-line">
  `;
}

/**
* Generates the HTML for assigning contacts, with checkboxes for selection.
* @param {number} i - The index of the contact to display.
* @returns {string} - The HTML string for the contact assignment.
*/
function fillAssignsHTML(i) {
  return `<div class="assign-contact" id="task-contact-content${i}">
      <span id="task-contact${i}">${allContacts[i]['name']}</span>
      <input type="checkbox" id="contact-check-${i}" onclick="contactToUse(${i})">
  </div>`;
}

/**
 * Returns the HTML for a subtask item.
 * @param {number} i 
 * @returns {string}
 */
function subtaskHTML(i) {
  return ` <li>
           <input type="checkbox" name="check-subtask" id="form-check-subtask-${i}" onclick="subtaskToUse(${i})">
           <span id="subtask${i}">${subtasks[i]}</span>
         </li>`;
}
