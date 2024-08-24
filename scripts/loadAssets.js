/**
 * Dynamically loads multiple CSS stylesheets into the document.
 * Creates and appends <link> elements for each stylesheet to the <head> section.
 */
function loadStylesheets() {
    const stylesheets = [
        '../styles/board.css',
        '../styles/fons.css',
        '../styles/sign_up.css',
        '../styles/responsive.css',
        '../style.css',
        '../styles/summary.css',
        '../styles/header_menu.css',
        '../styles/contacts.css',
        '../styles/add_task.css',
        '../styles/legal_notice.css'
    ];

    stylesheets.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    });
}

/**
 * Dynamically loads multiple JavaScript files into the document.
 * Creates and appends <script> elements for each script to the <body> section.
 * The 'defer' attribute ensures the scripts execute after the HTML document is fully parsed.
 */
function loadScripts() {
    const scripts = [
        '../scripts/template_scripts/board_html.js',
        '../scripts/template_scripts/board_note_html.js',
        '../scripts/template_scripts/contacts_html.js',
        '../scripts/template_scripts/contacts_popup_html.js',
        '../scripts/template_scripts/contacts_edit_new_html.js',
        '../scripts/template_scripts/header_html.js',
        '../scripts/template_scripts/help_html.js',
        '../scripts/template_scripts/legal_notice_html.js',
        '../scripts/template_scripts/summary_html.js',
        '../scripts/template_scripts/task_html.js',
        '../scripts/sign_up.js',
        '../scripts/save.js',
        '../scripts/search.js',
        '../scripts/firebase.js',
        '../scripts/task/tasks.js',
        '../scripts/task/taskCategories.js',
        '../scripts/task/taskContact.js',
        '../scripts/task/taskSubtaskData.js',
        '../scripts/task/taskUtils.js',
        '../scripts/popup.js',
        '../scripts/helper.js',
        '../scripts/userAction.js',
        '../scripts/summary.js',
        '../scripts/board.js',
        '../scripts/contactUtils.js',
        '../scripts/contactData.js',
        '../scripts/drag_and_drop.js',
        '../scripts/script.js',
        'https://kit.fontawesome.com/b7a5700e28.js'
    ];

    scripts.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        script.defer = true; // Ensures the script executes after HTML parsing
        document.body.appendChild(script);
    });
}

// Execute the functions to load all CSS and JavaScript assets
loadStylesheets();
loadScripts();
