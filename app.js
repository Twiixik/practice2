"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

window.addEventListener("load", initApp); // When the page is loaded, run initApp function

// Function to initialize the Web App
async function initApp() {
  console.log("initApp: app.js is running 🎉"); // Log to the console that the app is running
  const posts = await fetchPost();
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  console.log(posts);
  displayPosts(posts);
  displayPostsGrid(posts);
}

async function fetchPost() {
  const response = await fetch("http://exampractice.timiweb.dk/wp-json/wp/v2/posts?acf_format=standard");
  const data = await response.json();
  return data;
}

function displayPosts(posts) {
  const postsList = document.querySelector("#posts-list");

  for(const post of posts) {
    postsList.insertAdjacentHTML(
      "beforeend", `
      <li>${post.title.rendered}</li>
      <li>${post.categories}</li>
      `
    );
  }
}

function displayPostsGrid(posts) {
  const postsGrid = document.querySelector("#posts-grid");

  for( const post of posts) {
    postsGrid.insertAdjacentHTML(
      "beforeend",
      `
      <article class="grid-item">
      <img src="${post.acf.image}" alt="${post.title.rendered}" />
      <h2>${post.title.rendered}</h2>
      <h2>${post.date}</h2>
      </article>
      `
    );
  }
}

