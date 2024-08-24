const BASE_URL = 'https://join2-f5f12-default-rtdb.europe-west1.firebasedatabase.app';

/**
 * Fetches data from a specified path in Firebase.
 * 
 * @param {string} path - The path to the Firebase location.
 * @returns {Promise<Object>} - Returns a promise that resolves to the response data.
 */
async function fetchData(path) {
    let response = await fetch(BASE_URL + path + '.json');
    let data = await response.json();
    return data ? data : {};
}

/**
 * Sends data to a specified path in Firebase using a PUT request.
 * 
 * @param {string} path - The path to the Firebase location.
 * @param {Object} data - The data to send.
 * @returns {Promise<Object>} - Returns a promise that resolves to the response data.
 */
async function putData(path = "", data = {}) {
    let response = await fetch(BASE_URL + path + '/.json', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

/**
 * General function to delete data from a specified path in Firebase using a DELETE request.
 * 
 * @param {string} path - The path to the Firebase location.
 * @returns {Promise<Object>} - Returns a promise that resolves to the response data.
 */
async function deleteData(path) {
    let response = await fetch(BASE_URL + path + '.json', {
        method: "DELETE"
    });
    return await response.json();
}

/**
 * Posts a new user to Firebase.
 * 
 * @param {Object} user - The user data to post.
 * @throws {Error} - Throws an error if the post request fails.
 */
async function postUserToFirebase(user) {
    const response = await fetch('https://join-78ac2-default-rtdb.europe-west1.firebasedatabase.app/users.json', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (!response.ok) {
        throw new Error('Error posting new user');
    }
}