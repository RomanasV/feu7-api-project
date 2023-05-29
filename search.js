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
  // console.log(users);
  // console.log(albums);

  const postsList = createPostsList(postsData);

  contentElement.append(postsList);
}

function createPostsList(posts) {
  const postsListWrapper = document.createElement('div');
  postsListWrapper.classList.add('posts-list', 'search-list');

  console.log(posts.length === 0);

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

init();