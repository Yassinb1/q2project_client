window.addEventListener('load', event => {
const baseURL = 'http://localhost:3005/api/todolist';
const createItemButton = document.querySelector('#createItemButton');
const removeItemButton = document.querySelector('#removeItem');
const completed = document.querySelector('#completed');
const itemListEl = document.createElement('ul');
const focusItemEl = document.getElementById('focus-item');

const allitemsEl = document.getElementById('all-items');



allitemsEl.appendChild(itemListEl);

const getAllItems = () => {
  axios.get( baseURL)
  .then ( response => {
    console.log(response.data);
    itemListEl.innerHTML = '';
    response.data.forEach( item => {
      let todoitemEl = document.createElement('li');
      todoitemEl.innerHTML = item.todoitem;
      todoitemEl.addEventListener('click', id => { getOneItem(item.id); });
      itemListEl.appendChild(todoitemEl);
    })
  })
  .catch( error => { console.error(error); });
}

const createPost = event => {
  const todoitem = document.getElementById('createItem').value;
  const priority = document.querySelector('#priority').value;
  axios.post(`${baseURL}`, { todoitem, priority, completed: false })
  .then ( response => {
    getAllItems();
    getOneItem(response.data.id);
  })
  .catch ( error => { console.error ( error ); });
  event.preventDefault();
}

const getOneItem = id => {
  axios.get(`${baseURL}${id}`)
  .then( response => {
    focusPostEl.innerHTML = '';
    const itemEl = document.createElement('h3');
    itemEl.innerHTML = response.data.todoitem;
    const itemContentEl = document.createElement('p');
    itemContentEl.innerHTML = response.data.priority;
    focusPostEl.appendChild(itemEl);
    focusPostEl.appendChild(itemContentEl);
    const editButtonEl = document.createElement('button');
    editButtonEl.innerHTML = 'Edit.'
    editButtonEl.id = 'edit-todoitem-button';
    focusPostEl.appendChild(editButtonEl);
    const deleteButtonEl = document.createElement('button');
    deleteButtonEl.innerHTML = 'Delete.'
    deleteButtonEl.id = 'delete-todoitem-button';
    focusPostEl.appendChild(deleteButtonEl);
    // editButtonEl.addEventListener('click', () => {editPost(response.data); });
    // deleteButtonEl.addEventListener('click', () => { deletePost(response.data.id); });
  })
  .catch( error => { console.error(error); });
}

createItemButton.addEventListener('click', createPost);

getAllItems();
  // End of onload
})
