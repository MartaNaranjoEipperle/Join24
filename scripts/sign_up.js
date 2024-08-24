/**
 * Loads the header menu.
 */
function headerMenu() {
    document.getElementById('headerToLoad').innerHTML = headerMenuHTML();
}

/**
 * Displays the summary board content.
 */
function summaryBoard() {
    document.getElementById('content').innerHTML = '';
    hiddenContent();
    document.getElementById('content').innerHTML = summaryHTML();
    initSummary();
}

/**
 * Displays the board content.
 */
function boardContent() {
    document.getElementById('content').innerHTML = '';
    hiddenContent();
    document.getElementById('content').innerHTML = boardHTML();
    board = false;
    initboard();
}

/**
 * Displays the add task content.
 */
async function addTaskContent() {
    document.getElementById('content').innerHTML = '';
    hiddenContent();
    document.getElementById('content').innerHTML = addTaskHTML();
    board = false;
    await loadCategories();
    scroll('content');

}

/**
 * Displays the contacts content.
 */
function contactsContent() {
    document.getElementById('content').innerHTML = '';
    hiddenContent();
    document.getElementById('content').innerHTML = contactsHTML();
    board = false;
    initContact();
    checkScreenWidthAndShowMainContent();
}

/**
 * Displays the legal notice content.
 */
function legalNoticeContent() {
    document.getElementById('content').innerHTML = '';
    document.getElementById('content').innerHTML = legalNoticeHTML();
    board = false;
    addSectionColor('legalSide');
}

/**
 * Displays the help content.
 */
function help() {
    document.getElementById('content').innerHTML = '';
    document.getElementById('content').innerHTML = helpHTML();
    board = false;
}

/**
 * Hides the content element by removing the 'visible' class and adding the 'hidden' class.
 *
 * @function
 */
function hiddenContent(){
    let contentElement = document.getElementById('content');
    contentElement.classList.remove('visible');
    contentElement.classList.add('hidden');
}