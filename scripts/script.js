let rememberMe = false;
let loggedUser = [];
let allUser = [];

/**
 * Initialisiert die Anwendung, indem Benutzerdaten von Firebase abgerufen werden.
 * Wenn ein Element mit der ID 'content' vorhanden ist, wird zu diesem gescrollt.
 * 
 * @async
 * @function
 * @throws {Error} - Wird ausgelöst, wenn das Abrufen der Benutzerdaten fehlschlägt.
 */
async function init() {
  try {
    await fetchUsersData();
  } catch (error) {
    console.error('Error initializing app:', error);
  }
  const contentElement = document.getElementById('content');
  if (contentElement) {
    scroll('content');
  }
}

/**
 * Fetches user data from Firebase and updates the `allUser` array.
 * 
 * @async
 * @function
 * @throws {Error} - Throws an error if the fetch request fails.
 */
async function fetchUsersData() {
  const response = await fetch(BASE_URL + '/.json');
  if (!response.ok) {
    throw new Error('Error fetching user data');
  }
  const data = await response.json();
  allUser = data ? Object.values(data) : [];
}

/**
 * Toggles the visibility of the password input field and changes the color of the eye icon.
 * 
 * @function
 * @param {string} id - The ID of the eye icon element.
 * @param {string} passwordID - The ID of the password input field.
 */
function togglePassword(id, passwordID) {
  let input = document.getElementById(passwordID);
  let eye = document.getElementById(id);
  if (input.type === 'password') {
    input.type = 'text';
    eye.style.color = '#29ABE2'; // Color when password is visible
  } else {
    input.type = 'password';
    eye.style.color = '#A8A8A8'; // Color when password is hidden
  }
}

/**
 * Checks the login credentials and logs in the user if valid.
 * 
 * @async
 * @function
 * @param {Event} event - The event object from the form submission.
 * @param {string} idOfEmail - The ID of the email input field.
 * @param {string} idOfPassword - The ID of the password input field.
 * @param {string} idOfMessage - The ID of the message element for displaying feedback.
 * @returns {boolean} - Returns false if login fails.
 */
async function checkLogIn(event, idOfEmail, idOfPassword, idOfMessage) {
  let { email, password } = getFormValues(event, idOfEmail, idOfPassword, idOfMessage);
  rememberMe = isCheckboxChecked('form-check-remember');
  if (areAllFieldsFilled({ email, password })) {
    let users = await fetchData('/users');
    let validUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    if (validUser) {
      let userName = validUser.prename;
      if (validUser.password === password) {
        localStorage.setItem('userName', userName);
        await logUserLogin(email);
        location.assign('./templates/summary.html');
      } else {
        displayErrorMessage('wrongPassword', 'message-box');
      }
    } else {
      displayErrorMessage('noUser', 'message-box');
    }
  }
  return false;
}

/**
 * Logs in as a guest and redirects to the summary page.
 * 
 * @function
 */
function checkGastLogin() {
  location.assign('./templates/summary.html');
}
