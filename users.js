import header from './navigation.js';
import { fetchData } from "./functions.js";

async function init() {
  const usersData = await fetchData('https://jsonplaceholder.typicode.com/users?_embed=posts');

  const contentElement = document.querySelector('#content');
  const usersListElement = createUsersList(usersData);
  const navigation = header();

  contentElement.before(navigation);
  contentElement.append(usersListElement);
}

function createUsersList(users) {
  const usersList = document.createElement('ul');
  usersList.classList.add('users-list');

  users.forEach(user => {
    const userId = user.id;

    const itemElement = document.createElement('li');
    itemElement.classList.add('user-item');

    const linkElement = document.createElement('a');
    linkElement.textContent = `${user.name} (${user.posts.length})`;
    linkElement.href = './user.html?user_id=' + userId;

    itemElement.append(linkElement);

    usersList.append(itemElement);
  })

  return usersList;
}

init();