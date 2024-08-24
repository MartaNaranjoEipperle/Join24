/**
 * Generates the HTML for the contact edit popup.
 * @param {Object} contact - The contact object containing contact details.
 * @param {number} i - The index of the contact.
 * @returns {string} - The HTML string for the contact edit popup.
 */
function editContactPopUpHTML(contact, i) {
  return `
    <div id="edit-popup" class="edit-contact-popup" style="display: flex;">
      ${popupHeader('Edit contact', `closeEditPopup(${i})`, '../accessories/img/addContact-Logo.svg')}
      <div class="right-side">
        <div class="profile-img-save" style="background:#${contact.color}">
          <span class="profile-img-initial" id="initials">${contact.initials}</span>
        </div>
        <form>
          ${inputLine('user', contact.name, 'text', 'name')}
          ${inputLine('envelope', contact.email, 'email', 'email')}
          ${inputLine('phone', contact.phone, 'tel', 'phone')}
          <div class="buttons">
            <div class="save-button popup-button" onclick="saveContact(${i})">
              <div id="Save-btn" class="save-button-text">Save</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;
}

/**
* Generates the HTML for the new contact popup.
* @returns {string} - The HTML string for the new contact popup.
*/
function popUpNewHTML() {
  return `
    <div id="contact-popup" class="contact-popup d-none">
      ${popupHeader('Add contact', 'closeContactPopup()', '../accessories/img/addContact-Logo.svg')}
      <div class="right-side">
        <img class="contact-img" src="../accessories/img/profile-logo-addcontact.svg" />
        <form onsubmit="createContact(); return false">
          ${inputLine('user', 'Name', 'text', 'newContactName')}
          ${inputLine('envelope', 'Email', 'email', 'newContactEmail')}
          ${inputLine('phone', 'Phone', 'tel', 'newContactPhone')}
          <div class="buttons">
            <div class="cancel-button popup-button" onclick="closeContactPopup()">
              <div id="cancel-btn" class="cancel-button-text">Cancel</div>
              <i class="icon4 fa-solid fa-xmark"></i>
            </div>
            <button class="create-button popup-button" type="submit">
              <div class="create-button-text">Create contact</div>
              <i class="icon5 fa-solid fa-check"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

/**
* Helper function to generate input lines for forms.
* @param {string} iconClass - The class for the icon.
* @param {string} placeholder - The placeholder text for the input field.
* @param {string} [type='text'] - The type of the input field.
* @param {string} id - The ID of the input field.
* @returns {string} - The HTML string for the input line.
*/
function inputLine(iconClass, placeholder, type = 'text', id) {
  return `
    <div class="input-line">
      <span class="icon ${iconClass}"><i class="fa-solid fa-${iconClass}"></i></span>
      <input class="input-name" id="${id}" type="${type}" placeholder="${placeholder}" required />
    </div>
  `;
}

/**
* Helper function to generate the headers for popups.
* @param {string} title - The title of the popup.
* @param {string} closeAction - The JavaScript action to close the popup.
* @param {string} iconSrc - The source of the icon image.
* @returns {string} - The HTML string for the popup header.
*/
function popupHeader(title, closeAction, iconSrc) {
  return `
    <div class="left-side">
      <img id="popup-logo" src="${iconSrc}" />
      <span class="add-heading">${title}</span>
      <img src="../accessories/img/little-line.svg" />
    </div>
    <img onclick="${closeAction}" id="cancel-x" class="cancel-x" src="../accessories/img/cancel-logo.svg" />
  `;
}
