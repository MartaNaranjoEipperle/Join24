/**
 * Main function to generate the help page HTML.
 * @returns {string} - The HTML string for the help page.
 */
function helpHTML() {
    return generateHelpHTML();
}

/**
 * Generates the HTML structure for the help page.
 * @returns {string} - The HTML string for the help page content.
 */
function generateHelpHTML() {
    return `
      <div class="first">
        ${generateContentHeading()}
        <div class="whole-content">
          ${contentSection('What is Join?', 'JOIN is a tool to manage your tasks in a quick and simple way. Sign up for free or register as guest.')}
          ${generateUsageInstructions()}
        </div>
      </div>
    `;
}

/**
 * Generates the heading section of the help page.
 * @returns {string} - The HTML string for the content heading.
 */
function generateContentHeading() {
    return `
      <div class="content-heading">
        <img src="../accessories/img/arrow_legal_notice.svg" class="arrow-icon" onclick="summaryBoard()" />
        <h1 class="heading">Help</h1>
      </div>
    `;
}

/**
 * Generates a content section with a title and content.
 * @param {string} title - The title of the section.
 * @param {string} content - The content of the section.
 * @returns {string} - The HTML string for the content section.
 */
function contentSection(title, content) {
    return `
      <section class="${title.replace(/\s+/g, '-').toLowerCase()}">
        <h3 class="subheading">${title}</h3>
        <p class="subheading-paragraph">${content}</p>
      </section>
    `;
}

/**
 * Generates a paragraph with a number and text.
 * @param {number} number - The number of the paragraph.
 * @param {string} text - The text of the paragraph.
 * @returns {string} - The HTML string for the paragraph.
 */
function usageParagraph(number, text) {
    return `
      <div class="paragraph">
        <span class="p-number">${number}.</span>
        <p class="p-text">${text}</p>
      </div>
    `;
}

/**
 * Generates the usage instructions section.
 * @returns {string} - The HTML string for the usage instructions.
 */
function generateUsageInstructions() {
    const usageInstructions = [
        'Summary: Shows a quick overview over tasks in the tool.',
        'Add Task: Create a task and assign it to one or more users. Select the category and the priority of the task.',
        'Board: Here you can see all tasks ordered by category. Tasks can be shifted to another status by Drag & Drop.',
        'Contacts: Contact list of the current personal contacts. You can create a new one or delete.'
    ];

    return `
      <section class="second-content">
        <h3 class="subheading">How to use it</h3>
        <div class="p-content">
          ${usageInstructions.map((text, i) => usageParagraph(i + 1, text)).join('')}
        </div>
      </section>
    `;
}
