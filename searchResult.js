import createList from "./createList.js";
import { fetchData } from "./functions.js";
import { API_URL, DATA_PER_SEARCH } from "./config.js";

async function searchResults(searchPhrase, parentElement) {
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

  const postsParams = {
    url: 'post.html?post_id',
    category: 'posts',
    data: updatedPosts,
  }

  const usersParams = {
    url: 'user.html?user_id',
    data: updatedUsers,
    category: 'users',
    className: 'users-list-wrapper',
  }

  const postsList = createList(postsParams);
  const usersList = createList(usersParams);
  const albumsList = createList({
    category: 'albums',
    url: 'album.html?album_id',
    data: albums,
    className: 'albums-list-wrapper',
  });

  parentElement.innerHTML = '';
  parentElement.append(postsList, usersList, albumsList);
}

export default searchResults;