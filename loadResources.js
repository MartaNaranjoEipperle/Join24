/**
 * Dynamically loads CSS stylesheets into the document.
 * Adds <link> elements for each stylesheet to the <head> section of the document.
 */
function loadStylesheetsResources() {
    const stylesheets = [
        './styles/fons.css',
        './styles/sign_up.css',
        './styles/responsive.css',
        './style.css'
    ];

    stylesheets.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    });
}

/**
 * Dynamically loads JavaScript files into the document.
 * Adds <script> elements for each script to the <body> section of the document.
 * The 'defer' attribute ensures that scripts execute after the HTML document is fully parsed.
 */
function loadScriptsResources() {
    const scripts = [
        './scripts/tamplate_scripts/login_html.js',
        './scripts/sign_up.js',
        './scripts/userAction.js',
        './scripts/save.js',
        './scripts/firebase.js',
        './scripts/helper.js',
        './scripts/template_scripts/login_html.js',
        './scripts/script.js',
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
loadStylesheetsResources();
loadScriptsResources();
