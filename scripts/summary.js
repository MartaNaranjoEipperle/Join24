/**
 * Initializes the summary view by loading data from Firebase and setting up the user interface.
 * Executes various functions to configure the board, user profile, and day settings.
 * Scrolls to the 'summaryContainer' element and applies styling to the 'summarySide' section.
 *
 * @async
 * @function
 */
async function initSummary() {
    await loadFromFirebase();
    checkBoard();
    userProfil();
    userMorning();
    dayTime();
    addSectionColor('summarySide');
    board = false;
    scroll('summaryContainer');
}

/**
 * Scrolls the specified element by its ID to the top and makes the content element visible.
 * Removes the 'hidden' class and adds the 'visible' class to the element with ID 'content'.
 *
 * @function
 * @param {string} id - The ID of the element to scroll.
 */
function scroll(id){
    document.getElementById(id).scrollTop = -1000;
    let contentElement = document.getElementById('content');
    contentElement.classList.remove('hidden');
    contentElement.classList.add('visible');
}

/**
 * morning greet with the name of the current user
 */
function userMorning() {
    let name = localStorage.getItem('userName');
    const loggedInUser = users.find(user => user.isLoggedIn && user.prename === name);
    let userHTML = document.getElementById('user').innerHTML;
    userHTML = '';
    if (loggedInUser) {
        userHTML = ` ${name}!`;
    } else {
        userHTML = 'good to see you!';
    }
    document.getElementById('user').innerHTML = userHTML;
}

/**
 * Fetches the currently logged-in user's data from the server.
 * 
 * @async
 * @function
 * @throws {Error} - Throws an error if the fetch request fails.
 */
async function getLoggedUser() {
    try {
      loggedUser = await fetchData('/logins');
    } catch (error) {
      console.error('Error fetching logged-in user data:', error);
    }
}

/**
 * morning greet depending on the time of day
 */
function dayTime() {
    let objDate = new Date();
    let hours = objDate.getHours();
    if (hours >= 4 && hours < 12)
        document.getElementById('morning').innerHTML = 'Good morning,';
    if (hours >= 12 && hours <= 18)
        document.getElementById('morning').innerHTML = 'Good afternoon,';
    if (hours > 18 || hours < 4)
        document.getElementById('morning').innerHTML = 'Good evening,';
}

/**
 * update of the amount of tasks
 */
function checkBoard() {
    showToDoNotesCounter()
    showProgressNotesCounter();
    showFeedbackNotesCounter();
    showDoneNotesCounter();
    let all = allTasks.length;
    document.getElementById('taskBoardG').innerHTML = `${all}`;
    let urgent = allTasks.filter(t => t['img'] == '<img class="prio" src="../accessories/img/capa_red.png">');
    urgentNumber = urgent.length;
    document.getElementById('urgentG').innerHTML = `${urgentNumber}`;
    document.getElementById('date').innerHTML = '';
    for (i = 0; i < urgent.length; i++) {
        let newUrgentDate = urgent[i];
        document.getElementById('date').innerHTML += `${newUrgentDate['date']} <br>`;
    }
}

/**
 * amount of the to-do notes in board
 */
function showToDoNotesCounter() {
    let todo = allTasks.filter(t => t['processing_state'] == 'todoTable');
    let toDoNumber = todo.length;
    document.getElementById('todoG').innerHTML = `${toDoNumber}`;
}

/**
 * amount of the progress notes in board 
 */
function showProgressNotesCounter() {
    let progress = allTasks.filter(t => t['processing_state'] == 'progressTable');
    progressNumber = progress.length;
    document.getElementById('taskProgressG').innerHTML = `${progressNumber}`;
}

/**
 * amount of the feedback notes in board
 */
function showFeedbackNotesCounter() {
    let feedback = allTasks.filter(t => t['processing_state'] == 'feedbackTable');
    feedbackNumber = feedback.length;
    document.getElementById('awaitingFeedbackG').innerHTML = `${feedbackNumber}`;
}

/**
 * amount of the done notes in board
 */
function showDoneNotesCounter() {
    let done = allTasks.filter(t => t['processing_state'] == 'doneTable');
    doneNumber = done.length;
    document.getElementById('doneG').innerHTML = `${doneNumber}`;
}
