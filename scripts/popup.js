let isEventListenerAdded = false;

/**
 * Opens the task form popup, loads categories, and sets up the submit event listener for the task form.
 * 
 * @param {string} processingState - The state in which the task should be created.
 */
async function openPopup(processingState) {
    await loadCategories();
    togglePopupClasses();
    document.getElementById('add-task-form').scrollTop = -1000;
    document.getElementById('board-popup').scrollTop = -1000;
    if (!isEventListenerAdded) {
        setupSubmitListener(processingState);
    }
}

/**
* Toggles necessary classes for opening the popup.
*/
function togglePopupClasses() {
   toggleClass('secondcontent', 'd-none', window.innerWidth < 960);
   toggleClass('board-popup', 'open-popup', true);
   toggleClass('secondcontent', 'second-plan', true);
}

/**
 * Sets up the submit event listener for the task form.
 * 
 * @param {string} processingState - The state in which the task should be created.
 */
function setupSubmitListener(processingState) {
    const createTaskButton = document.getElementById('add-task-form');
    if (createTaskButton) {
        const handleSubmit = function(event) {
            event.preventDefault();
            createTaskfinish(processingState);
            createTaskButton.removeEventListener('submit', handleSubmit);
        };
        createTaskButton.addEventListener('submit', handleSubmit);
        isEventListenerAdded = true;
    } else {
        console.error("Form 'add-task-form' not found.");
    }
}

/**
 * Closes and clears the task form popup.
 */
function closeAddTaskPopup() {
    toggleClass('board-popup', 'open-popup', false);
    toggleClass('secondcontent', 'second-plan', false);
    clearInputFields(['form-title', 'form-descr', 'input-date', 'use-contact', 'invited-contact']);
    document.getElementById('add-task-form').reset();
    document.getElementById('subtask-list').innerHTML = '';
    toggleClass('secondcontent', 'd-none', false);
    isEventListenerAdded = false;
    boardContent();
}

/**
 * Opens the edit contact popup for a specific contact.
 * 
 * @param {number} i - The index of the contact to edit.
 */
function editPopUp(i, contactId) {
    scrollToTop('contact-container');
    let contact = allContacts[i];
    let editPopup = document.getElementById('edit-contact-popup');
    toggleClass('edit-contact-popup', 'd-none', false);
    editPopup.innerHTML = editContactPopUpHTML(contact, contactId);
}

/**
 * Opens the contact popup.
 */
function openContactPopup() {
    scrollToTop('contact-container');
    let contactPopup = document.getElementById('contact-popup');
    contactPopup.style.display = 'flex';
    toggleClass('contact-popup', 'd-none', false);
    toggleClass('contacts-List', 'noScroll', true);
}

/**
 * Closes the contact popup and clears the entries.
 */
function closeContactPopup() {
    clearInputFields(['newContactName', 'newContactEmail', 'newContactPhone']);
    let contactPopup = document.getElementById('contact-popup');
    contactPopup.style.display = 'none';
    toggleClass('contact-popup', 'd-none', true);
    toggleClass('contacts-List', 'noScroll', false);
}

/**
 * Toggles the visibility of an element by adding or removing a class.
 * 
 * @param {string} elementId - The ID of the element.
 * @param {string} className - The class to toggle.
 * @param {boolean} add - Whether to add or remove the class.
 */
function toggleClass(elementId, className, add) {
    let element = document.getElementById(elementId);
    if (element) {
        element.classList.toggle(className, add);
    } else {
        console.error(`Element with ID '${elementId}' not found.`);
    }
}

/**
 * Clears the input fields specified by their IDs.
 * 
 * @param {string[]} fieldIds - An array of input field IDs to clear.
 */
function clearInputFields(fieldIds) {
    fieldIds.forEach(id => {
        let field = document.getElementById(id);
        if (field) {
            field.value = '';
        } else {
            console.error(`Field with ID '${id}' not found.`);
        }
    });
}

/**
 * Scrolls the element with the given ID to the top.
 * 
 * @param {string} elementId - The ID of the element.
 */
function scrollToTop(elementId) {
    let element = document.getElementById(elementId);
    if (element) {
        element.scroll({ top: 0 });
    } else {
        console.error(`Element with ID '${elementId}' not found.`);
    }
}

/**
 * Hides the edit contact popup by adding the 'd-none' class to the element with ID 'edit-contact-popup'.
 *
 * @function
 */
function closeEditPopup() {
    document.getElementById('edit-contact-popup').classList.add('d-none');
}