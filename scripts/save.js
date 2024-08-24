/**
 * Loads data from Firebase, including tasks, users, and contacts.
 * Converts the tasks object to an array.
 */
async function loadFromFirebase() {
  allTasks = await fetchData('/tasks');
  users = await fetchData('/users');
  allContacts = await fetchData('/contacts');
  allTasks = Object.values(allTasks); // Convert tasks object to array
}

/**
* Fetches task data from the specified BASE_URL and maps it to the allTasks array.
* Ensures default values for title, description, category, date, img, newSubtask, initial, and invite fields.
*/
async function fetchTasksData() {
  try {
      const response = await fetch(`${BASE_URL}/tasks.json`);
      if (!response.ok) {
          throw new Error('Error fetching tasks data');
      }
      const data = await response.json();
      allTasks = data ? Object.keys(data).map(key => ({
          ...data[key],
          title: data[key].title || '',
          description: data[key].description || '',
          category: data[key].category || '',
          date: data[key].date || '',
          img: data[key].img || '',
          newSubtask: data[key].newSubtask || '',
          initial: data[key].initial || [], // Default to empty array if undefined
          invite: data[key].invite || []    // Default to empty array if undefined
      })) : [];
  } catch (error) {
      console.error('Error loading tasks data:', error);
  }
}

/**
* Updates a collection in Firebase based on the provided data and endpoint.
* @param {Array} items - The array of items to update.
* @param {string} endpoint - The Firebase endpoint to update.
*/
async function updateCollectionInFirebase(items, endpoint) {
  let updatedItems = {};
  for (let i = 0; i < items.length; i++) {
      updatedItems[i] = items[i];
  }
  await putData(endpoint, updatedItems);
}

/**
* Creates a new user account and saves it to Firebase.
* 
* @param {number} i - The index to assign to the new user.
*/
async function signUp(i) {
  let name = document.getElementById('input-name-sign').value;
  let email = document.getElementById('input-email-sign').value;
  let password = document.getElementById('input-password-sign').value;

  let userData = {
      'id': i,
      'prename': name,
      'email': email,
      'password': password,
      'profile': '../accessories/img/profile_guest.png',
  };
  await saveToFirebase('users', userData);

}

/**
* Logs a user login event.
* 
* @param {string} email - The email of the user to log in.
* @throws {Error} - Throws an error if the user is not found or if the login fails.
*/
async function logUserLogin(email) {
  try {
      let users = await fetchData('/users');
      let userId = Object.keys(users).find(id => users[id].email === email);
      if (userId) {
          users[userId].isLoggedIn = true;
          await putData(`/users/${userId}`, users[userId]);
      } else {
          throw new Error('Benutzer nicht gefunden');
      }
  } catch (error) {
      console.error('Fehler beim Einloggen des Benutzers:', error);
      throw error;
  }
}

/**
 * Saves data to Firebase and updates the relevant collection.
 * 
 * @param {string} collection - The name of the collection in Firebase (e.g., 'categories', 'contacts', 'users', 'tasks').
 * @param {Object} data - The data to save.
 * @throws {Error} - Throws an error if the data could not be saved.
 */
async function saveToFirebase(collection, data) {
    try {
        let items = await fetchData(`/${collection}`);
        if (!items || typeof items !== 'object') {
            items = {};
        }
        let itemIds = Object.keys(items).map(id => parseInt(id)).sort((a, b) => a - b);
        let newItemId = itemIds.length > 0 ? Math.max(...itemIds) + 1 : 0;
        data.id = newItemId;
        items[newItemId] = data;
        await putData(`/${collection}`, items);
        console.log(`${collection.slice(0, -1).charAt(0).toUpperCase() + collection.slice(1, -1)} successfully saved to Firebase.`);
    } catch (error) {
        console.error(`Error saving ${collection.slice(0, -1)} to Firebase:`, error);
    }
  }