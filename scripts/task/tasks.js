let expanded = false;
let activePrio = 'medium';
let subtasks = [];
let allTasks = [];
let allContacts = [];
let arrayImage = [];
let subtasksToUse = [];
let form = document.getElementById('task-form');
let initialID = [];
let initialToUse = [];
let invited = [];
let contactUse = [];
let colors = ['#86a9cb', 'red', 'lime', 'orange', 'magenta', 'blue'];

/**
 * Creates and saves a task to the server (Firebase).
 */
async function createAndSaveTask(processingState, idName) {
    let title = document.getElementById('form-title').value;
    let text = document.getElementById('form-descr').value;
    let collection = document.getElementById('form-category');
    let o = collection.selectedIndex;
    let category = collection.options[o].text;
    let img = checkImg();
    let date = checkDate(document.getElementById('input-date').value);
    let newSubtask = subtasksToUse[0];
    let initial = initialToUse;
    let invite = invited;

    let task = {
        'title': title,
        'description': text,
        'category': category,
        'processing_state': processingState,
        'date': date,
        'img': img,
        'newSubtask': newSubtask,
        'initial': initial,
        'invite': invite,
    }

    try {
        await saveToFirebase('tasks', task);
        allTasks.push(task);
        clearInput(idName);
        initialID = [];
    } catch (error) {
        console.error("Error saving task to Firebase:", error);
    }
}

/**
 * Clears all input fields.
 */
function clearInput(idName) {
    document.getElementById(idName).reset();
    document.getElementById('subtask-list').innerHTML = '';
    document.getElementById('use-contact').innerHTML = '';
    document.getElementById('invited-contact').innerHTML = '';
    initialID = [];
    initialToUse = [];
    invited = [];
    contactUse = [];
}

/**
 * Creates a task and redirects to the board.
 */
async function createTaskonBoardTable(processingState, idName) {
    if (checkIfNew()){
        await confirmCategory();
    }
    await createAndSaveTask(processingState, idName);
    if (!board) {
        document.getElementById('message-box').classList.remove('d-none');
        setTimeout(() => {
            boardContent();
        }, 1500);
    }
    initialID = [];
    initialToUse = [];
    invited = [];
    contactUse = [];
    board = true;
}

/**
 * Creates a task and shows the board.
 */
async function createTaskfinish(processingState) {
    await createAndSaveTask(processingState);
    showBoard(processingState);
    isEventListenerAdded = false;
    addSectionColor('boardSide');
    initboard();
}



