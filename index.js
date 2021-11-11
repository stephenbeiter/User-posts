const tableEl = document.querySelector("#table");
const backEl = document.querySelector("#back");
const titleEl = document.querySelector("#title");
const introEl = document.querySelector("#intro");

const populateUserPosts = (userId, username) => {
  // Data source URL
  const postsUrl = "https://jsonplaceholder.typicode.com/posts";

  // Clear table element
  tableEl.innerHTML = "";
  // Create back button
  const backButtonEl = document.createElement("div");
  backButtonEl.classList = "btn btn-dark";
  backButtonEl.textContent = "Return to Users";
  backButtonEl.onclick = () => { populateUserTable(); };
  backEl.appendChild(backButtonEl);
  // Populate title and intro content from data source
  titleEl.textContent = username;
  titleEl.onclick = () => { populateUserTable(); };
  titleEl.style = "cursor: pointer;"
  introEl.textContent = "Here is a list of posts from " + username + ":";

  // Fetch data and map over array to create elements with user posts content
  fetch(postsUrl)
    .then(response => {
      if (response.ok) {
        response.json().then(posts => {
          posts.map(post => {

            if (userId === post.userId) {
              const postEl = document.createElement("div");
              postEl.classList = "card bg-light mb-3";

              const postBodyEl = document.createElement("div");
              postBodyEl.classList = "card-body";

              const postTitleEl = document.createElement("h5");
              postTitleEl.classlist = "card-title";
              postTitleEl.textContent = post.title;

              const postTextEl = document.createElement("p");
              postTitleEl.classlist = "card-text";
              postTextEl.textContent = post.body;

              postEl.appendChild(postBodyEl)
              postBodyEl.appendChild(postTitleEl);
              postBodyEl.appendChild(postTextEl);
              tableEl.appendChild(postEl);
            }
          })
        })
      } else {
        // Alert user to error status
        alert("Error Status: " + response.statusText);
      }
    })
};

const populateUserTable = () => {
  // Data source URL
  const usersUrl = "https://jsonplaceholder.typicode.com/users";

  // Clear elements
  tableEl.innerHTML = "";
  backEl.textContent = "";
  // Add element text
  titleEl.textContent = "User-posts";
  introEl.textContent = "Click on a user below to view their posts:";

  // Fetch data and map over array to create elements with usernames
  fetch(usersUrl)
    .then(response => {
      if (response.ok) {
        response.json().then(users => {
          users.map(user => {
            const userEl = document.createElement("div");
            userEl.classList = "card card-body mb-2";
            userEl.style = "cursor: pointer;"
            userEl.textContent = user.username;
            userEl.onclick = () => { populateUserPosts(user.id, user.username) }
            tableEl.appendChild(userEl);
          });
        });
      } else {
        // Alert user to error status
        alert("Error Status: " + response.statusText);
      }
    })
};

populateUserTable();