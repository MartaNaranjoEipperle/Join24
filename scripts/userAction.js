let newName = true;
let newEmail = true;
let board = false;

/**
 * Displays the signup container.
 */
function signUpContainer() {
    replaceContainerContent('container', signUpHTML);
    document.getElementById('signupLine').style.display = 'none';
}

/**
 * Checks the signup information, verifies user uniqueness, and signs up the user if the information is valid.
 * @param {Event} event - The event object from the form submission.
 * @param {string} idOfEmail - The ID of the email input field.
 * @param {string} idOfPassword - The ID of the password input field.
 * @param {string} idOfMessage - The ID of the message element for displaying feedback.
 * @returns {Promise<boolean>} - Returns true if the signup is successful, otherwise false.
 */
async function checkSignUp(event, idOfEmail, idOfPassword, idOfMessage) {
    let { email, password } = getFormValues(event, idOfEmail, idOfPassword, idOfMessage);
    let name = document.getElementById('input-name-sign').value;
    if (areAllFieldsFilled({ name, email, password })) {
        let isUniqueUser = allUser.length === 0 || await alreadyRegistered(name, email);
        if (isUniqueUser) {
            let i = allUser.length;
            await signUp(i, name, email, password);
            success();
            return true;
        }
    }
    return false;
}

/**
 * Checks if the user is already registered by checking the name and email.
 * @param {string} name - The name input value.
 * @param {string} email - The email input value.
 * @returns {Promise<boolean>} - Returns true if the user is not registered, otherwise false.
 */
async function alreadyRegistered(name, email) {
    newName = await checkValue(name, 'prename');
    newEmail = await checkValue(email, 'email');
    return (newName && newEmail);
}

/**
 * Checks if a given value is unique within a specified field.
 * @param {string} value - The value to check.
 * @param {string} field - The field to check the value against.
 * @returns {Promise<boolean>} - Returns true if the value is unique, otherwise false.
 */
async function checkValue(value, field) {
    if (typeof value !== 'string' || value.trim() === '') {
        throw new Error('Invalid input');
    }
    let userList = allUser[0];
    let nameIsUnique = true;
    for (let i = 0; i < userList.length; i++) {
        if (userList[i][field] && userList[i][field].toLowerCase() === value.toLowerCase()) {
            if (field === 'prename') {
                displayErrorMessage('knownName', 'message-box-sign');
            }
            if (field === 'email') {
                displayErrorMessage('knownEmail', 'message-box-sign');
            }
            nameIsUnique = false;
            break;
        }
    }
    return nameIsUnique;
}

/**
 * Displays the signup success message.
 */
function success() {
    replaceContainerContent('container', signUpSuccessHTML);
}

/**
 * Sets profile picture and updates menu to show "Log Out" if the user is logged in.
 */
function userProfil() {
    let name = localStorage.getItem('userName');
    const loggedInUser = users.find(user => user.isLoggedIn && user.prename === name);
    if (loggedInUser) {
        let profilname = loggedInUser['profile'];
        document.getElementById('toggle').src = `${profilname}`;
        document.getElementById('nav-log').innerHTML = 'Log Out';
    }
}

/**
 * Toggles the visibility of the header menu.
 */
function toggleMenu() {
    document.getElementById('toggle-menu').classList.toggle('d-none');
}

/**
 * Logs out the user and redirects to the login page.
 */
async function logout() {
    let name = localStorage.getItem('userName');
    if (!name) {
        location.assign('../index.html');
        return;
    }
    let loggedInUser = users.find(user => user.isLoggedIn && user.prename === name);
    if (!loggedInUser) {
        location.assign('../index.html');
        return;
    }
    let userId = loggedInUser.id;
    users[userId].isLoggedIn = false;
    try {
        await putData(`/users/${userId}`, users[userId]);
    } catch (error) {
        console.error('Fehler beim Aktualisieren der Benutzerdaten:', error);
    }
    localStorage.removeItem('userName');
    location.assign('../index.html');
}

// Add event listener for beforeunload to logout user
window.addEventListener('beforeunload', async (event) => {
    await logout();
});

// Function to reset the inactivity timer
let inactivityTimeout;
function resetInactivityTimer() {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(async () => {
        await logout();
    }, 10 * 60 * 1000); // 10 minutes in milliseconds
}

// Add event listeners for user activity
['mousemove', 'keydown', 'scroll', 'click'].forEach(event => {
    window.addEventListener(event, resetInactivityTimer);
});

// Initialize the inactivity timer when the page loads
resetInactivityTimer();
