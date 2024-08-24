/**
 * Generates the HTML for the contacts container.
 * @returns {string} - The complete HTML string for the contacts container.
 */
function contactsHTML() {
  return `
    ${contactListHTML()}
    ${mainContentContactHTML()}
    ${popUpEditHTML()}
    ${popUpNewHTML()}
    ${popupSection('Contact')}
  `;
}

/**
 * Generates the HTML for the contact list container.
 * @returns {string} - The HTML string for the contact list container.
 */
function contactListHTML() {
  return `
    <div id="contact-container">
      <div id="contacts-List" class="contacts-list">
        <div class="contact-menu"></div>
        <nav class="scroll-bar"></nav>
      </div>
    </div>
    <div id="contacts-popup" class="add-button" onclick="openContactPopup()">
        <div class="add-btn-text">New contact</div>
        <img class="add-btn-icon" src="../accessories/img/add-icon.svg" />
    </div>
  `;
}

/**
 * Generates the HTML for the main content area.
 * @returns {string} - The HTML string for the main content area.
 */
function mainContentContactHTML() {
  return `
    <div id="main-content" class="main-content">
      <div class="heading">
        <h1>Contacts</h1>
        <img src="../accessories/img/border-straight.svg" />
        <span>Better with a team</span>
      </div>
      <div id="main-contact-content"></div>
    </div>
  `;
}

/**
 * Generates the HTML for the edit contact popup container.
 * @returns {string} - The HTML string for the edit contact popup container.
 */
function popUpEditHTML() {
  return `
    <div id="edit-contact-popup" class="d-none"></div>
  `;
}

/**
 * Generates the HTML for a single contact card.
 * @param {Object} contact - The contact object containing contact details.
 * @param {number} i - The index of the contact.
 * @returns {string} - The HTML string for the contact card.
 */
function createContactInfo(contact, i, contactId) {
  return `
    <div onclick="openContactData(${i}, ${contactId})" class="contact" id="delete${i}">
      <div class="profile-img" style="background:#${contact.color}">
        <span id="initials">${contact.initials}</span>
      </div>
      <div class="contact-info">
        <span class="contact-name">${contact.name}</span>
        <span class="contact-email">${contact.email}</span>
      </div>
    </div>
  `;
}
