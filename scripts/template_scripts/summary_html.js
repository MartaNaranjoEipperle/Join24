/**
 * Generates the HTML for the entire summary page.
 * @returns {string} - The HTML string for the summary page.
 */
function summaryHTML() {
    return `
    <div class="summary-container" id="summaryContainer">
      <div class="frame66">
        ${taskSection()}
        ${urgencySection()}
        ${statusButtons()}
      </div>
      ${greetingSection()}
      </div>
    `;
}

/**
 * Generates the HTML for the task statistics section.
 * @returns {string} - The HTML string for the task statistics section.
 */
function taskSection() {
    const taskData = [
      { id: 'taskBoardG', text: 'Task in Board' },
      { id: 'taskProgressG', text: 'Task in Progress' },
      { id: 'awaitingFeedbackG', text: 'Awaiting Feedback' }
    ];

    return `
      <div class="frame64">
        ${taskData.map(({ id, text }) => `
          <a onclick="boardContent()" class="buttonV1">
            <div class="frame61">
              <div class="number" id="${id}">0</div>
              <div class="tasks">${text}</div>
            </div>
          </a>
        `).join('')}
      </div>
    `;
}

/**
 * Generates the HTML for the urgency section.
 * @returns {string} - The HTML string for the urgency section.
 */
function urgencySection() {
    return `
      <a onclick="boardContent()" class="urgency">
        <div class="frame67">
          <img class="frame591" src="../accessories/img/Frame 59.png" alt="Urgency Icon">
          <div class="frame63">
            <div class="urgentNumber" id="urgentG">0</div>
            <div class="urgent">Urgent</div>
          </div>
        </div>
        <div class="vector51"></div>
        <div class="frame68">
          <div class="date" id="dateG">Datum</div>
          <div class="deadline" id="date">Upcoming Deadline</div>
        </div>
      </a>
    `;
}

/**
 * Generates the HTML for the status buttons section.
 * @returns {string} - The HTML string for the status buttons section.
 */
function statusButtons() {
    const statusData = [
      { id: 'todoG', imgSrc: '../accessories/img/pen.png', text: 'To-do', class: 'pencilButton' },
      { id: 'doneG', imgSrc: '../accessories/img/ok.png', text: 'Done', class: 'checkbutton' }
    ];

    return `
      <div class="frame65">
        ${statusData.map(({ id, imgSrc, text, class: className }) => `
          <a onclick="boardContent()" class="${className}">
            <img class="frame592" src="${imgSrc}" alt="${text} Icon">
            <div class="frame60">
              <div class="${className === 'pencilButton' ? 'todo' : 'donenumber'}" id="${id}">0</div>
              <div class="${className === 'pencilButton' ? 'backlog' : 'tasks'}">${text}</div>
            </div>
          </a>
        `).join('')}
      </div>
    `;
}

/**
 * Generates the HTML for the greeting section.
 * @returns {string} - The HTML string for the greeting section.
 */
function greetingSection() {
    return `
      <div class="frame69">
        <div class="morning" id="morning"> Good morning </div>
        <div class="morning" id="user"> </div>
      </div>
    `;
}