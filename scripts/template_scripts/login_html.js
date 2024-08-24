/**
 * Generates the HTML for an input line with optional password visibility toggle.
 * @param {string} type - The type of input (e.g., 'text', 'email', 'password').
 * @param {string} id - The ID of the input element.
 * @param {string} placeholder - The placeholder text for the input.
 * @param {string} iconClass - The class for the icon displayed inside the input line.
 * @param {boolean} [eyeToggle=false] - Whether to include a password visibility toggle.
 * @returns {string} - The HTML string for the input line.
 */
function inputLine(type, id, placeholder, iconClass, eyeToggle = false) {
  return `
    <div class="input-line">
      <input type="${type}" name="${id}" id="${id}" placeholder="${placeholder}" required onfocus="hideElementOnFocus('message-box-sign')">
      <span class="icon">
        <i class="${iconClass}"></i>
      </span>
      ${eyeToggle ? `
        <span class="icon" id="pass-eye-sign" onclick="togglePassword('pass-eye-sign', 'input-password-sign')">
          <i class="fa-solid fa-eye-slash"></i>
        </span>` : ''}
    </div>
  `;
}

/**
* Generates the HTML for the sign-up page.
* @returns {string} - The HTML string for the sign-up page.
*/
function signUpHTML() {
  return `
    <div class="arrow-back">
      <a href="./index.html"><i class="fa-solid fa-arrow-left"></i></a>
    </div>
    <h1>Sign Up</h1>
    <hr>
    <form onsubmit="return checkSignUp(event, 'input-email-sign', 'input-password-sign', 'message-box-sign')">
      ${inputLine('text', 'input-name-sign', 'Name', 'fa-regular fa-user')}
      ${inputLine('email', 'input-email-sign', 'Email', 'fa-regular fa-envelope')}
      ${inputLine('password', 'input-password-sign', 'Password', 'fa-solid fa-eye-slash', true)}
      <div id="message-box-sign" class="message-box"></div>
      <div class="btn-line">
        <input id="sign-up" type="submit" value="Sign Up">
      </div>
    </form>
  `;
}

/**
* Generates the HTML for the successful sign-up confirmation page.
* @returns {string} - The HTML string for the successful sign-up page.
*/
function signUpSuccessHTML() {
  return `
    <div class="arrow-back">
      <a href="./index.html"><i class="fa-solid fa-arrow-left"></i></a>
    </div>
    <h1>Sign Up Successful!</h1>
    <hr>
    <div class="success">
      <p>To complete your registration, please confirm your email address by clicking the link in the email we've sent.</p>
    </div>
  `;
}
