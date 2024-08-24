/**
 * Generates the HTML for the contact data popup.
 * @param {number} i - The index or ID of the contact.
 * @param {object} contact - The contact object containing contact data.
 * @returns {string} - The HTML string for the contact data popup.
 */
function openContactDataHTML(i, contact, contactId) {
    return `
      <div class="Info-Container-PopUp" id="${i}">
        ${generateContactInfoHeader(i, contact, contactId)}
        <div class="second-container">
          <span class="info-heading">Contact Information</span>
          ${generateContactActions(i, contactId)}
        </div>
        ${generateContactDetails(contact, contactId)}
      </div>
    `;
}

/**
 * Generates the header section of the contact data popup.
 * @param {number} i - The index or ID of the contact.
 * @param {object} contact - The contact object containing contact data.
 * @returns {string} - The HTML string for the contact data popup header.
 */
function generateContactInfoHeader(i, contact) {
    return `
      <div class="first-container">
        <div class="contact-info-image" style="background:#${contact.color}">
          <span class="profile-letter-random">${contact.initials}</span>
        </div>
        <div class="info-add-task">
          <span class="contact-info-name">${contact.name}</span>
          <div>
            <div class="add-task-container" onclick="openAddTask()">
              <img src="../accessories/img/add-task-plus-by-contact.svg" />
              <span class="add-task-button">Add Task</span>
            </div>
            <div id="arrow-back" onclick="closeContactData()"><i class="fa-solid fa-arrow-left con"></i></div>
          </div>
        </div>
      </div>
    `;
}
  
/**
 * Generates the actions section of the contact data popup.
 * @param {number} i - The index or ID of the contact.
 * @returns {string} - The HTML string for the contact actions section.
 */
function generateContactActions(i, contactId) {
    return `
      <div class="flex-edit-delete" id="flex-edit-delete">
        <div class="edit-info-container" onclick="editPopUp(${i}, ${contactId})">
          <i class="fa-solid fa-pencil"></i>
          <span class="edit-info-button">Edit Contact</span>
        </div>
        <div class="delete-info-container" onclick="deleteContact('delete${i}', ${contactId})">
          <i class="fa-solid fa-trash-can"></i>
          <span class="delete-info-button">Delete Contact</span>
        </div>
      </div>
    `;
}
  
/**
 * Generates the contact details section of the contact data popup.
 * @param {object} contact - The contact object containing contact data.
 * @returns {string} - The HTML string for the contact details section.
 */
function generateContactDetails(contact, contactId) {
    return `
      <div class="third-container">
        <div class="email-info">
          <span class="email-info1">Email</span>
          <span class="email-info2"><a href="mailto:${contact.email}">${contact.email}</a></span>
        </div>
        <div class="phone-info">
          <span class="phone-info1">Phone</span>
          <span class="phone-info2">${contact.phone}</span>
        </div>
      </div>
    `;
}
