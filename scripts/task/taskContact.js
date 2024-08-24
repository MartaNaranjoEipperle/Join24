/**
 * Fills the checkbox for the contacts.
 */
function fillAssigns() {
    let box = document.getElementById('checkboxes');
    box.innerHTML = `<div class="assign-contact" id="invite-contact" onclick="invite()">
        <span>Invite Contact</span>
        <i class="fa-solid fa-address-book"></i>
    </div>`;
}

/**
 * Opens invitation input.
 */
function invite(query = '') {
    let box = document.getElementById('checkboxes');
    if (!box) return; // Check if the element exists

    box.innerHTML = ''; // Ensure the element is empty before adding new content

    // Check if there is a search query
    if (query.trim() === '') {
        // No search query, show all contacts not used
        for (let i = 0; i < allContacts.length; i++) {
            if (!contactUse.includes(allContacts[i].name)) {
                box.innerHTML += fillAssignsHTML(i);
            }
        }
    } else {
        // There is a search query, filter based on the query (case-insensitive)
        for (let i = 0; i < allContacts.length; i++) {
            if (!contactUse.includes(allContacts[i].name) && allContacts[i].name.toLowerCase().includes(query.toLowerCase())) {
                box.innerHTML += fillAssignsHTML(i);
            }
        }
    }

    // Show the container only if there are results
    const inputContactLine = document.querySelector('.input-contact-line');
    if (box.innerHTML === '') {
        inputContactLine.classList.add('d-none');
    } else {
        inputContactLine.classList.remove('d-none');
    }

    const inputField = document.getElementById('input-contact');
    if (inputField) {
        inputField.addEventListener('input', function () {
            invite(this.value);
        });
    }
}

/**
 * Closes and clears invitation input.
 */
function closeInvitation(i) {
    // Clear the content of 'shosToAdd'
    document.getElementById('shosToAdd').innerHTML = '';

    // Hide the 'input-contact-line'
    document.querySelector('.input-contact-line').classList.add('d-none');

    // Clear the 'input-contact' field
    document.querySelector('#input-contact').value = '';

    // Disable all checkboxes
    let allCheckBoxes = document.querySelectorAll('[id^="contact-check-"]');
    allCheckBoxes.forEach(box => {
        box.checked = false;
        // Ensure related content is visible again
        let index = box.id.split('-').pop(); // Extract index from ID
        document.getElementById(`task-contact-content${index}`).classList.remove('dis-none');
    });
}

/**
 * Updates the list of invited contacts.
 */
function addInvitations() {
    let contact = document.getElementById('invited-contact');
    contact.innerHTML = '';
    invited.forEach(inv => {
        contact.innerHTML += `${inv} <br>`;
    });
}

/**
 * Main function to handle contact selection for tasks.
 * @param {number} i - The index of the contact.
 */
function contactToUse(i) {
    let checkBox = document.getElementById(`contact-check-${i}`);
    let taskContact = document.getElementById(`task-contact${i}`).innerHTML;

    if (checkBox.checked) {
        selectContact(i, taskContact);
    } else {
        clearSelectedContact(i);
    }
}

/**
 * Handles the contact selection process.
 * @param {number} i - The index of the contact.
 * @param {string} taskContact - The contact information to be shown.
 */
function selectContact(i, taskContact) {
    deactivateOtherCheckBoxes(i);
    updateContactTextarea(i, taskContact);
}

/**
 * Deactivates all other checkboxes and makes their content visible.
 * @param {number} selectedIndex - The index of the currently selected checkbox.
 */
function deactivateOtherCheckBoxes(selectedIndex) {
    let allCheckBoxes = document.querySelectorAll('[id^="contact-check-"]');
    allCheckBoxes.forEach((box) => {
        if (box.id !== `contact-check-${selectedIndex}`) {
            box.checked = false;
            let index = box.id.split('-').pop(); // Extract the index from ID
            document.getElementById(`task-contact-content${index}`).classList.remove('dis-none');
        }
    });
    document.querySelector('.input-contact-line').classList.remove('d-none');
}

/**
 * Updates the textarea field and action elements based on the selected contact.
 * @param {number} i - The index of the contact.
 * @param {string} taskContact - The contact information to be shown.
 */
function updateContactTextarea(i, taskContact) {
    let contactShose = document.getElementById('input-contact');
    contactShose.value = taskContact; // Set the contact information
    document.getElementById('shosToAdd').innerHTML = `
        <span id="close-invitation" onclick="closeInvitation(${i})">
            <i class="fa-solid fa-xmark cont-x"></i>
        </span>
        <span id="confirm-invitation" onclick="confirmInvitation(${i},'${taskContact}')">
            <i class="fa-solid fa-check cont"></i>
        </span>`;
}

/**
 * Clears the selected contact and resets the UI elements.
 * @param {number} i - The index of the contact.
 */
function clearSelectedContact(i) {
    let contactShose = document.getElementById('input-contact');
    contactShose.value = '';
    document.getElementById('shosToAdd').innerHTML = '';
    document.getElementById(`task-contact-content${i}`).classList.remove('dis-none');
    initialToUse = [];
    document.querySelector('.input-contact-line').classList.add('d-none');
}

/**
 * Confirms the invitation and updates the contact list and UI.
 * @param {number} i - The index of the contact.
 * @param {string} taskContact - The contact information to be confirmed.
 */
function confirmInvitation(i, taskContact) {
    let useContact = findContactByName(taskContact);
    let contact = document.getElementById('use-contact');
    
    if (useContact) {
        addContactToList(useContact);
        hideTaskContactContent(i);
    } else {
        contact.innerHTML = '';
    }
    
    clearInvitationInputs();
    showCheckboxes();
    document.querySelector('.input-contact-line').classList.add('d-none');
    closeInvitation(i);
}

/**
 * Finds a contact by name from the allContacts array.
 * @param {string} contactName - The name of the contact to find.
 * @returns {object|null} - The contact object or null if not found.
 */
function findContactByName(contactName) {
    return allContacts.find(contact => contact.name === contactName) || null;
}

/**
 * Adds a contact to the contact list and updates the UI.
 * @param {object} contact - The contact object to add.
 */
function addContactToList(contact) {
    let initialColor = contact.color;
    let initial = contact.initials;
    let userInitial = `<div class="profile-pic" style="background:#${initialColor}">${initial}</div>`;
    
    initialToUse.push(userInitial);
    contactUse.push(contact.name);
    
    let contactElement = document.getElementById('use-contact');
    contactElement.innerHTML += `${contact.name} <br>`;
}

/**
 * Hides the content of the task contact section.
 * @param {number} i - The index of the contact.
 */
function hideTaskContactContent(i) {
    document.getElementById(`task-contact-content${i}`).classList.add('dis-none');
}

/**
 * Clears the input fields and action elements related to invitations.
 */
function clearInvitationInputs() {
    document.getElementById('input-contact').value = '';
    document.getElementById('shosToAdd').innerHTML = '';
}
