/**
 * Updates a contact in Firebase based on the input fields and contact ID.
 * @param {string} contactId - The ID of the contact to update.
 */
async function saveContact(contactId) {
    const nameElement = document.getElementById('name');
    const emailElement = document.getElementById('email');
    const phoneElement = document.getElementById('phone');
  
    try {
      const existingContact = await getContactFromFirebase(contactId);
      if (!existingContact) return;
  
      const updatedContact = updateContactFields(existingContact, nameElement, emailElement, phoneElement);
      const contacts = await fetchData('/contacts');
      await updateContactsArray(contacts, contactId, updatedContact);
  
      await putData("/contacts", contacts);
    } catch {
      // Handle errors silently
    }
    document.getElementById('edit-contact-popup').classList.add('d-none');
    closeContactData();
    initContact();
  }
  
  /**
   * Updates contact fields based on input elements.
   * @param {Object} contact - The existing contact to update.
   * @param {HTMLElement} nameElement - The name input element.
   * @param {HTMLElement} emailElement - The email input element.
   * @param {HTMLElement} phoneElement - The phone input element.
   * @returns {Object} - The updated contact.
   */
  function updateContactFields(contact, nameElement, emailElement, phoneElement) {
    let updatedContact = { ...contact };
    if (nameElement.value) {
      updatedContact.name = nameElement.value;
      randomInitials(nameElement.value);
      updatedContact.initials = letters[0];
    }
    if (emailElement.value) updatedContact.email = emailElement.value;
    if (phoneElement.value) updatedContact.phone = phoneElement.value;
    return updatedContact;
  }
  
  /**
   * Updates the contacts array or object with the updated contact.
   * @param {Array|Object} contacts - The current contacts data.
   * @param {string} contactId - The ID of the contact to update.
   * @param {Object} updatedContact - The updated contact data.
   * @returns {Promise<void>}
   */
  async function updateContactsArray(contacts, contactId, updatedContact) {
    if (Array.isArray(contacts)) {
      const index = contacts.findIndex(contact => contact.id === contactId);
      if (index !== -1) contacts[index] = updatedContact;
      else return;
    } else if (typeof contacts === 'object' && contacts !== null) {
      contacts[contactId] = updatedContact;
    } else {
      return;
    }
  }
  
  /**
   * Retrieves a contact from Firebase using its ID.
   * @param {string} contactId - The ID of the contact to retrieve.
   * @returns {Promise<Object|null>} - The contact object or null if not found.
   */
  async function getContactFromFirebase(contactId) {
    try {
      let contacts = await fetchData('/contacts');
      if (Array.isArray(contacts)) {
        return contacts.find(contact => contact.id === contactId);
      }
      if (typeof contacts === 'object' && contacts !== null) {
        return contacts[contactId] || null;
      }
      console.error("Unexpected data format:", contacts);
      return null;
    } catch (error) {
      console.error("Error fetching contact from Firebase:", error);
      return null;
    }
  }
  
  /**
   * Deletes a contact from the list and Firebase.
   * @param {string} id - The ID of the contact to delete.
   * @param {number} i - The index of the contact in the list.
   */
  async function deleteContact(id, i) {
    let currentContact = document.getElementById(id);
    currentContact.remove();
    let contactToSplice = allContacts.findIndex(contact => contact.id === i);
    allContacts.splice(contactToSplice, 1);
    await updateCollectionInFirebase(allContacts, '/contacts');
    document.getElementById('contacts-List').classList.remove('second-plan');
    closeContactData();
    render();
  }
  
  /**
 * Toggles the visibility of the main content based on the screen width.
 * If the screen width is greater than 900 pixels and the contact section is not open, 
 * the main content will be displayed; otherwise, it will be hidden.
 * 
 * This function is called initially and also whenever the window is resized.
 * 
 * @function
 */
  function checkScreenWidthAndShowMainContent() {
    const mainContent = document.getElementById('main-content');
    if (mainContent && contactOpen == false) { // Überprüfen, ob das Element existiert
      if (window.innerWidth > 900) {
          mainContent.style.display = 'block';
      } else {
          mainContent.style.display = 'none';
      }
  }
  }
  
  
  checkScreenWidthAndShowMainContent();
  
 
  window.addEventListener('resize', checkScreenWidthAndShowMainContent);



