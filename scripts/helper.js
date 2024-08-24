/**
 * Checks if a checkbox with the given ID is checked.
 * 
 * @param {string} checkboxId - The ID of the checkbox.
 * @returns {boolean} - Returns true if the checkbox is checked, otherwise false.
 */
function isCheckboxChecked(checkboxId) {
    return document.getElementById(checkboxId).checked;
}

/**
 * Hides the error message box when an input field gains focus.
 * 
 * @param {string} elementId - The ID of the element to hide.
 */
function hideElementOnFocus(elementId) {
    let element = document.getElementById(elementId);
    element.classList.add('dis-none');
}

/**
 * Empties a container and inserts new HTML content.
 * 
 * @param {string} containerId - The ID of the container element.
 * @param {Function} generateHtmlFunction - A function that returns the new HTML content.
 */
function replaceContainerContent(containerId, generateHtmlFunction) {
    let container = document.getElementById(containerId);
    container.innerHTML = '';
    container.innerHTML = generateHtmlFunction();
}

/**
 * Checks if all specified fields are filled.
 * 
 * @param {Object} fields - An object where keys are field names and values are field values.
 * @returns {boolean} - Returns true if all fields are filled, otherwise false.
 */
function areAllFieldsFilled(fields) {
    let allFilled = true;

    for (const [key, value] of Object.entries(fields)) {
        if (value === '') {
            displayErrorMessage(key);
            allFilled = false;
        }
    }
    return allFilled;
}

/**
 * Displays an error message based on the input type.
 * 
 * @param {string} input - The type of the problem.
 * @param {string} elementId - The ID of the element to display the message in.
 */
function displayErrorMessage(input, elementId) {
    let element = document.getElementById(elementId);
    element.classList.remove('dis-none');

    const messages = {
        name: 'Please enter a valid name.',
        email: 'Please enter a valid email.',
        password: 'Please enter a valid password.',
        knownName: 'Name already known. Please change.',
        knownEmail: 'Email already known. Please change.',
        noUser: 'User doesn\'t exist.',
        wrongPassword: 'Wrong password.',
    };

    element.innerHTML += `<p>${messages[input] || 'Unknown error.'}</p>`;
}

/**
 * Retrieves values from a form.
 * 
 * @param {Event} event - The form submission event.
 * @param {string} emailId - The ID of the email input field.
 * @param {string} passwordId - The ID of the password input field.
 * @param {string} messageId - The ID of the message box element.
 * @returns {Object} - Returns an object with email and password properties.
 */
function getFormValues(event, emailId, passwordId, messageId) {
    event.preventDefault();
    const email = document.getElementById(emailId).value;
    const password = document.getElementById(passwordId).value;
    const messageBox = document.getElementById(messageId);
    messageBox.innerHTML = '';
    
    return { email, password };
}

/**
 * Checks the viewport size and adjusts visibility of elements accordingly.
 */
function checkViewport() {
    let navHelp = document.getElementById('nav-help');
    let navLegal = document.getElementById('nav-legal');
    if(navLegal && navHelp){
    if (window.innerWidth <= 480) {
        navHelp.classList.add('d-none');
        navLegal.classList.add('d-none');
    } else {
        navHelp.classList.remove('d-none');
        navLegal.classList.remove('d-none');
    }
}
}

visualViewport.addEventListener('resize', checkViewport);

/**
 * Adds a blue color option to a section and clears other color options.
 * 
 * @param {string} sectionId - The ID of the section to color.
 */
function addSectionColor(sectionId) {
    clearColorOptions();
    document.getElementById(sectionId).classList.add('bluoption');
}

/**
 * Clears the blue color option from all sections.
 */
function clearColorOptions() {
    const sectionIds = ['legalSide', 'summarySide', 'boardSide', 'taskSide', 'contactSide'];
    sectionIds.forEach(id => document.getElementById(id).classList.remove('bluoption'));
}

/**
 * Adds or removes a class to/from an element.
 * 
 * @param {string} elementId - The ID of the element.
 * @param {string} className - The class name to add or remove.
 * @param {boolean} add - Whether to add (true) or remove (false) the class.
 */
function toggleClass(elementId, className, add) {
    const element = document.getElementById(elementId);
    if (add) {
        element.classList.add(className);
    } else {
        element.classList.remove(className);
    }
}

/**
 * Clears the contents of all task tables.
 */
function clearTaskTables() {
    const tableIds = ['todoTable', 'progressTable', 'feedbackTable', 'doneTable'];
    tableIds.forEach(id => document.getElementById(id).innerHTML = '');
}

/**
 * Clears all input fields in a form.
 * 
 * @param {Array<string>} fieldIds - An array of IDs of the input fields to clear.
 */
function clearInputFields(fieldIds) {
    fieldIds.forEach(id => document.getElementById(id).value = '');
}


