/**
 * Toggles new category input and color bar visibility.
 */
function checkCategory() {
    if (checkIfNew()) {
        document.querySelector('.color-bar').classList.remove('d-none');
        document.querySelector('.input-category-line').classList.remove('d-none');
    } else {
        closeCategory();
    }
}

/**
 * Checks if "new category" is selected.
 * @returns {boolean}
 */
function checkIfNew() {
    return document.getElementById('new-cat').selected;
}

/**
 * Hides new category input and color bar.
 */
function closeCategory() {
    document.querySelector('.color-bar').classList.add('d-none');
    document.querySelector('.input-category-line').classList.add('d-none');
}

/**
 * Checks which color is selected.
 * @returns {number}
 */
function checkBar() {
    let toggles = document.querySelectorAll('.toggles');
    for (let i = 0; i < toggles.length; i++) {
        if (toggles[i].classList.contains('active')) {
            return i;
        }
    }
}

/**
 * Makes chosen color active by adding background-color and class.
 * @param {number} n - number 0 to 5, representing 6 colors from color-array
 */
function pickColor(n) {
    let toggles = document.querySelectorAll('.toggles');
    toggles.forEach(toggle => {
        toggle.style.backgroundColor = 'transparent';
        toggle.classList.remove('active');
    });
    toggles[n].style.backgroundColor = 'white';
    toggles[n].classList.add('active');
}

/**
 * Confirms the new category, saves it to Firebase, and adds it to the form.
 */
async function confirmCategory() {
    let checked = checkBar();
    let color = colors[checked];
    let input = document.getElementById('input-category');
    let categoryName = input.value;
    let categoryData = { name: categoryName, color: color };
    await saveToFirebase('categories', categoryData);
    document.getElementById('form-category').innerHTML += `<option class="${color}" value="${categoryName}" selected>${categoryName}</option>`;
    closeCategory();
    input.value = '';
}

/**
 * Fetches categories from the given URL.
 * @param {string} url - The URL to fetch categories from.
 * @returns {Promise<Object>} - A promise that resolves to the categories object.
 */
async function fetchCategories(url) {
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

/**
 * Populates the select element with categories.
 * @param {Object} categories - The categories object.
 * @param {HTMLElement} selectElement - The select element to populate.
 */
function populateSelectElement(categories, selectElement) {
    let existingOptions = new Set();
    Array.from(selectElement.options).forEach(option => existingOptions.add(option.value));
    
    if (categories) {
        for (let id in categories) {
            let category = categories[id];
            console.log("Processing category:", category);
            if (category && category.name && category.color) {
                if (!existingOptions.has(category.name)) {
                    selectElement.innerHTML += `<option class="${category.color}" value="${category.name}">${category.name}</option>`;
                }
            } else {
                console.warn(`Category with id ${id} is missing name or color.`);
            }
        }
    } else {
        console.warn("No categories found in Firebase.");
    }
}

/**
 * Loads categories and populates the select element.
 */
async function loadCategories() {
    try {
        let categories = await fetchCategories(BASE_URL + '/categories.json');
        let selectElement = document.getElementById('form-category');
        if (!selectElement) {
            return;
        }
        populateSelectElement(categories, selectElement);
    } catch (error) {
        console.error("Error loading categories from Firebase:", error);
    }
    addSectionColor('taskSide');
}

/**
 * Updates the color of a category.
 * @param {string} category - The category name.
 * @param {number} i - The index of the element to update.
 */
async function updateColor(category, i) {
    const predefinedColors = {
        'Media': '#FFC701',
        'Backoffice': '#1FD7C1',
        'Marketing': '#0038FF',
        'Design': '#FF7A00',
        'default': '#FC71FF'
    };
    const color = await fetchCategoryColors(category, predefinedColors);
    const finalColor = color || predefinedColors[category] || predefinedColors['default'];
    let div = document.getElementById('color' + i);
    if (div) {
        div.style.backgroundColor = finalColor;
    }
}

/**
 * Fetches category colors from the API.
 * @param {string} url - The URL to fetch category colors from.
 * @returns {Promise<Object>} - A promise that resolves to the category colors object.
 */
async function fetchCategoryColorsFromAPI(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

/**
 * Gets the color of a category.
 * @param {string} categoryName - The name of the category.
 * @param {Object} categoryColors - The category colors object.
 * @param {Object} predefinedColors - The predefined colors object.
 * @param {Object} allTasks - The tasks object.
 * @returns {string} - The color of the category.
 */
function getCategoryColor(categoryName, categoryColors, predefinedColors, allTasks) {
    let color;
    for (let id in allTasks) {
        let category = allTasks[id].category;
        if (category === categoryName) {
            for (let i in categoryColors) {
                if (categoryColors[i].name === categoryName) {
                    color = categoryColors[i].color;
                    break;
                }
            }
            if (!color) {
                color = predefinedColors[category] || predefinedColors['default'];
            }
            return color;
        }
    }
    return predefinedColors['default'];
}

/**
 * Fetches the color of a category.
 * @param {string} categoryName - The name of the category.
 * @param {Object} predefinedColors - The predefined colors object.
 * @returns {Promise<string>} - A promise that resolves to the color of the category.
 */
async function fetchCategoryColors(categoryName, predefinedColors) {
    try {
        const categoryColors = await fetchCategoryColorsFromAPI(BASE_URL + '/categories.json');
        return getCategoryColor(categoryName, categoryColors, predefinedColors, allTasks);
    } catch (error) {
        console.error("Error fetching category colors from Firebase:", error);
        return predefinedColors['default'];
    }
}
