import header from "./navigation.js";
import { fetchData, firstLetterUpperCase, getUrlParams } from "./functions.js";
import { API_URL, DATA_PER_SEARCH } from "./config.js";

async function init() {
  const contentElement = document.querySelector('#content');
  const headerElement = header();
  contentElement.before(headerElement);

  const searchPhrase = getUrlParams('search');
  console.log(searchPhrase);

  const postsData = await fetchData(`${API_URL}/posts?q=${searchPhrase}&_limit=${DATA_PER_SEARCH}`);
  const users = await fetchData(`${API_URL}/users?q=${searchPhrase}&_limit=${DATA_PER_SEARCH}`);
  const albums = await fetchData(`${API_URL}/albums?q=${searchPhrase}&_limit=${DATA_PER_SEARCH}`);
  
  const updatedPosts = postsData.map(post => {
    const postData = {
      title: post.title,
      id: post.id,
    }

    return postData;
  })

  const updatedUsers = users.map(user => {
    const userData = {
      title: user.name,
      id: user.id,
    }

    return userData;
  })

  const postsList = createSearchList(updatedPosts, 'post.html?post_id', '', 'posts');
  const usersList = createSearchList(updatedUsers, 'user.html?user_id', 'users-list-wrapper', 'users');
  const albumsList = createSearchList(albums, 'album.html?album_id', 'albums-list-wrapper', 'albums');

  contentElement.append(postsList, usersList, albumsList);
}

function createSearchList(data, url, className, category) {
  if (!data || !url) {
    console.error('Data and url must be included in the function');
    return '';
  }

  const searchListWrapper = document.createElement('div');
  searchListWrapper.classList.add('search-list-wrapper');
  
  if (className) {
    searchListWrapper.classList.add(className);
  }

  let categoryText = category ? category : 'data';

  const searchListTitle = document.createElement('h2');
  searchListTitle.textContent = `No ${categoryText} :(`;

  searchListWrapper.append(searchListTitle);

  if (data.length > 0) {
    searchListTitle.textContent = firstLetterUpperCase(`${categoryText}:`);

    const searchList = document.createElement('ul');
    
    data.forEach(item => {
      const itemElement = document.createElement('li');

      if (url) {
        const itemLink = document.createElement('a');
        
        itemLink.textContent = firstLetterUpperCase(item.title);
        itemLink.href = `./${url}=${item.id}`;
        
        itemElement.append(itemLink);
      } else {
        itemElement.textContent = firstLetterUpperCase(item.title);
      }

      searchList.append(itemElement);
    })

    searchListWrapper.append(searchList);
  }
  
  return searchListWrapper;
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