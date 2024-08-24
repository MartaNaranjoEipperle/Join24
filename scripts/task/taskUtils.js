/**
 * Toggles the display of the checkboxes.
 */
function showCheckboxes() {
    let checkboxes = document.getElementById("checkboxes");
    checkboxes.style.display = expanded ? "none" : "block";
    expanded = !expanded;
    fillAssigns();
}

function box() {
    showCheckboxes();
    document.querySelector('.input-contact-line').classList.add('d-none');
    closeInvitation();
}

/**
 * Handles priority button activation and visual changes.
 * @param {number} n 
 * @param {string} color 
 */
function activate(n, color) {
    for (let i = 1; i < 4; i++) {
        document.getElementById(`btn-${i}`).style.backgroundColor = 'transparent';
        document.getElementById(`btn-${i}`).style.color = '#000';
        document.querySelector(`#icon-prio-${i} i`).classList.remove('active-icon');
    }
    document.getElementById(`btn-${n}`).style.backgroundColor = `var(--${color})`;
    document.getElementById(`btn-${n}`).style.color = '#fff';
    document.querySelector(`#icon-prio-${n} i`).classList.add('active-icon');
    activePrio = color;
    arrayImage = [`<img class="prio" src="../accessories/img/capa${n === 1 ? '_red' : n === 2 ? '' : '_green'}.png">`];
}