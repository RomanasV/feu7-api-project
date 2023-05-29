import { firstLetterUpperCase } from "./functions.js";

function createList(params) {
  // const data = params.data;
  // const url = params.url;
  // const className = params.className;
  // const category = params.category;

  const { data, url, className, category } = params;

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

export default createList;