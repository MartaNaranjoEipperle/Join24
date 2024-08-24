/**
 * Serch for tasks Check if search-value is empty - if not, execute searchAll with search-value
 */
function search() {
    let searchValue = document.getElementById('search').value;
    if (searchValue === "") {
        updateHTML();
    } else {
        searchAll(searchValue.toLowerCase());
    }
}

/**
 * Search Function
 * @param {string} search - search-value from input-field
 */
function searchAll(search) {
    for (let i = 0; i < allTasks.length; i++) {
        let task = allTasks[i];
        let tr = task['description'];
        let ts = task['category'];
        let ta = task['title'];
        let list = document.getElementById(`${i}`);
        if (!tr.toLowerCase().includes(search) && !ts.toLowerCase().includes(search) && !ta.toLowerCase().includes(search)) {
            list.style.display = "none";
        } else {
            list.style.display = "";
        }
    }
}


