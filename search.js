import header from "./navigation.js";
import searchResults from "./searchResult.js";
import { firstLetterUpperCase, getUrlParams } from "./functions.js";

async function init() {
  const headerElement = header();
  document.body.prepend(headerElement);

  const contentElement = document.querySelector('#content');
  
  const searchPhrase = getUrlParams('search');
  
  searchResults(searchPhrase, contentElement);
  
  const searchForm = document.querySelector('#search-form');
  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;
    const searchInputValue = form.search.value

    searchResults(searchInputValue, contentElement);

    form.reset();
  })
}

function createPostsList(posts) {
  const postsListWrapper = document.createElement('div');
  postsListWrapper.classList.add('posts-list-wrapper', 'search-list-wrapper');

  const postsListTitle = document.createElement('h2');
  postsListTitle.textContent = 'No posts :(';

  postsListWrapper.append(postsListTitle);

  if (posts.length > 0) {
    postsListTitle.textContent = 'Posts:';

    const postsList = document.createElement('ul');
    
    posts.forEach(post => {
      const postItem = document.createElement('li');
      const postLink = document.createElement('a');
      
      postLink.textContent = firstLetterUpperCase(post.title);
      postLink.href = `./post.html?post_id=${post.id}`;
      
      postItem.append(postLink);
      postsList.append(postItem);
    })

    postsListWrapper.append(postsList);
  }
  
  return postsListWrapper;
}

function createUsersList(users) {
  const usersListWrapper = document.createElement('div');
  usersListWrapper.classList.add('users-list-wrapper', 'search-list-wrapper');
  
  const usersListTitle = document.createElement('h2');
  usersListTitle.textContent = 'No users :(';

  usersListWrapper.append(usersListTitle);

  if (users.length > 0) {
    usersListTitle.textContent = 'Users:';

    const usersList = document.createElement('ul');
    
    users.forEach(user => {
      const userItem = document.createElement('li');
      const userLink = document.createElement('a');
      
      userLink.textContent = firstLetterUpperCase(user.name);
      userLink.href = `./user.html?user_id=${user.id}`;
      
      userItem.append(userLink);
      usersList.append(userItem);
    })

    usersListWrapper.append(usersList);
  }

  return usersListWrapper;
}

init();