let letters = [];
let randomColor = [];
let contactOpen = false;


/**
 * Initializes the contact section by loading data from Firebase, rendering contacts, and adding colors.
 */
async function initContact() {
  await loadFromFirebase();
  if (allContacts && allContacts.length > 0) {
    render();
  }
  addSectionColor('contactSide');
  scroll('content');
}

/**
 * Opens the "Add Task" popup and adjusts the view for adding a contact.
 */
function openAddTask() {
  document.getElementById('board-popup').classList.remove('d-none');
  document.getElementById('contact-container').scroll({ top: 0 });
  document.getElementById('contact-container').classList.add('overflow');
  document.getElementById('board-popup').classList.add('open-popup');
  document.getElementById('contacts-List').classList.add('second-plan');
  document.getElementById('main-content').classList.add('second-plan');
  document.getElementById('contacts-popup').classList.add('second-plan');
  fillAssigns();
}

/**
 * Closes the "Add Task" popup and restores the view to its default state.
 */
function closeAddTaskPopupContact() {
  document.getElementById('board-popup').classList.add('d-none');
  document.getElementById('board-popup').classList.remove('open-popup');
  document.getElementById('contacts-List').classList.remove('second-plan');
  document.getElementById('main-content').classList.remove('second-plan');
  document.getElementById('contacts-popup').classList.remove('second-plan');
  document.getElementById('contact-container').scroll({ top: 0 });
  document.getElementById('contact-container').classList.remove('overflow');
  closeContactData();
}

/**
 * Displays the list of contacts. Shows a message if no contacts are available.
 */
function showContact() {
  let contactList = document.getElementById('contacts-List');
  let id = allContacts.length - 1;
  let contact = allContacts[id];
  let contactId = allContacts[id].id;
  if (allContacts.length === 0) {
    contactList.innerHTML += `
    <div class="empty-contacts">
      <p>No Contacts here.</p>
    </div>`;
  } else {
    for (let i = 0; i < allContacts.length; i++) {
      contactList.innerHTML += createContactInfo(contact, i, contactId);
    }
  }
}

/**
 * Opens detailed contact data in a popup and adjusts the view.
 * @param {number} i - The index of the contact to display.
 */
function openContactData(i, contactId) {
  document.getElementById('board-popup').classList.add('d-none');
  let rightInfoPopup = document.getElementById('main-contact-content');
  if (window.innerWidth < 901 && window.innerWidth > 0) {
      document.getElementById('contacts-List').classList.add('dis-none');
      //document.getElementById('main-content').classList.add('d-block');
      document.getElementById('main-content').style.display = 'block';
      rightInfoPopup.classList.add('show-contact');
  }
  else if (window.innerHeight < 776) {
    document.getElementById('contact-container').classList.add('overflow');
  }
  document.getElementById('contacts-popup').classList.add('d-none');
  document.getElementById('contacts-List').classList.add('second-plan');
  rightInfoPopup.innerHTML = '';
  let contact = allContacts[i];
  rightInfoPopup.innerHTML += openContactDataHTML(i, contact, contactId);
  contactOpen = true;
}

/**
 * Closes the contact data popup and restores the view to its default state.
 */
function closeContactData() {
  document.getElementById('main-contact-content').innerHTML = ``;
  document.getElementById('contacts-popup').classList.remove('d-none');
  document.getElementById('contacts-List').classList.remove('second-plan');
  document.getElementById('contact-container').scroll({ top: 0 });
  document.getElementById('contact-container').classList.remove('overflow');
  document.getElementById('board-popup').classList.remove('d-none');
  document.getElementById('contacts-List').classList.remove('dis-none');
  if (window.innerWidth < 901 && window.innerWidth > 0 && contactOpen == true) {
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('main-contact-content').classList.remove('show-contact');
   
  }
  contactOpen = false;
  closeContactPopup();
}

/**
 * Creates a new contact and saves it to Firebase.
 */
async function createContact() {
  await createContactforServer();
  showContact();
  closeAddTaskPopupContact();
  initContact();
}

/**
 * Handles the server-side creation of a new contact.
 */
async function createContactforServer() {
  
  let name = document.getElementById('newContactName');
  let email = document.getElementById('newContactEmail');
  let phone = document.getElementById('newContactPhone');
  randomInitials(name.value);
  let initials = letters[0];
  makeRandomColor();
  let color = randomColor[0];

  let contact = {
    'name': name.value,
    'email': email.value,
    'phone': phone.value,
    'initials': initials,
    'color': color,
  };
  await saveToFirebase('contacts', contact);
  
}

/**
 * Renders the list of contacts in alphabetical order.
 */
function render() {
  renderName();
  for (let i = 0; i < allContacts.length; i++) {
    renderLetters(i);
    let contact = allContacts[i];
    let contactId = allContacts[i].id;
    document.getElementById('contacts-List').innerHTML += createContactInfo(contact, i, contactId);
  }
}

/**
 * Renders contacts sorted by name.
 */
function renderName() {
  let contactList = document.getElementById('contacts-List');
  contactList.innerHTML = '';
  allContacts.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
}

/**
 * Renders the initial letter section for contacts.
 * @param {number} i - The index of the contact.
 */
function renderLetters(i) {
  let contactList = document.getElementById('contacts-List');
  if (!document.getElementById(`${allContacts[i]['initials']}`)) {
    contactList.innerHTML += `
        <div class="letters" id="${allContacts[i]['initials']}">
        <span class="headletter">${allContacts[i]['initials']}</span>
        </div>`;
  }
}

/**
 * Generates a random color for contact containers.
 */
function makeRandomColor() {
  randomColor = [];
  let color = Math.floor(Math.random() * 16777215).toString(16);
  randomColor.push(color);
}

/**
 * Generates initials from the given name.
 * @param {string} name - The name from which to generate initials.
 * @returns {string} - The initials derived from the name.
 */
function randomInitials(name) {
  letters = [];
  const fullName = name.split(' ');
  const initials = fullName.shift().charAt(0);
  letters.push(initials);
  return initials.toUpperCase();
}

/**
 * Closes the message box for saved notes.
 */
function closeMessage() {
  document.getElementById('message-box').classList.add('d-none');
}

