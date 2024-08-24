 /**
 * Generates a menu entry for the left menu.
 * @param {string} onClickFunction - The function to be called on click.
 * @param {string} id - The ID of the menu entry.
 * @param {string} imgSrc - The source of the image icon.
 * @param {string} text - The text to be displayed.
 * @returns {string} - The HTML string for the menu entry.
 */
function menuEntry(onClickFunction, id, imgSrc, text) {
    return `
      <div class="menu-entry">
        <a onclick="${onClickFunction}()" class="menu_name" id="${id}">
          <img src="../accessories/img/${imgSrc}" alt="" />
          <span>${text}</span>
        </a>
      </div>
    `;
}

/**
 * Generates the header content.
 * @returns {string} - The HTML string for the header content.
 */
function headerContent() {
    return `
      <div class="header">
        <img id="header_logo" src="../accessories/img/Join_Logo2.svg" alt="" />
        <h2 class="kanban-heading">Kanban Project Management Tool</h2>
        <div class="help_profile">
          <a onclick="help()"><img class="help_icon" src="../accessories/img/help_logo.svg" /></a>
          <a><img class="profile" id="toggle" onclick="toggleMenu()" src="../accessories/img/profile_guest.png" /></a>
        </div>
        <nav id="toggle-menu" class="d-none">
          <a id="nav-help" onclick="help()">Help</a>
          <a id="nav-legal" onclick="legalNoticeContent()">Legal Notice</a>
          <a id="nav-log" onclick="logout()">Log In</a>
        </nav>
      </div>
    `;
}

/**
 * Generates the content for the left menu.
 * @returns {string} - The HTML string for the left menu content.
 */
function leftMenuContent() {
    return `
      <div class="left-menu">
        <div>
          <a onclick="summaryBoard()">
            <img id="menu_logo" src="../accessories/img/Join_Logo.svg" alt="" />
          </a>
        </div>
        <div id="menu-list">
          ${menuEntry('summaryBoard', 'summarySide', 'summary_logo.svg', 'Summary')}
          ${menuEntry('boardContent', 'boardSide', 'board_logo.svg', 'Board')}
          ${menuEntry('addTaskContent', 'taskSide', 'add_task_logo.svg', 'Add Task')}
          ${menuEntry('contactsContent', 'contactSide', 'contacts_logo.svg', 'Contacts')}
        </div>
        <a onclick="legalNoticeContent()" class="info-container" id="legalSide">
          <img class="info-icon" src="../accessories/img/impressum_icon.svg" alt="" />
          <span class="info-name">Legal Notice</span>
        </a>
      </div>
    `;
}

/**
 * Generates the HTML for the header menu.
 * @returns {string} - The HTML string for the header menu.
 */
function headerMenuHTML() {
    return headerContent() + leftMenuContent();
}

/**
 * Generates the main header section.
 * @returns {string} - The HTML string for the main header section.
 */
function mainHeadSection() {
    return `
      <div class="main-head">
        <h1>Board</h1>
        <div class="outer-box">
          <div class="search-box">
            <i class="fa-solid fa-magnifying-glass glass"></i>
            <input type="text" class="findTask" aria-placeholder="Find Task" id="search" oninput="search()">
          </div>
          <div class="secondary" onclick="openPopup('todoTable')">
            <div class="addTask">Add task</div>
            <img class="capa1" src="../accessories/img/plus_only.png">
          </div>
        </div>
      </div>
    `;
}
