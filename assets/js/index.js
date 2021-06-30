const tableEl = document.querySelector("#table");
const backButtonEl = document.querySelector("#back-button");
const titleEl = document.querySelector("#title");
const introEl = document.querySelector("#intro");

const populateUserPosts = (userId, username) => {
  const postsUrl = "https://jsonplaceholder.typicode.com/posts";

  tableEl.innerHTML = "";
  backButtonEl.textContent = "<back";
  backButtonEl.onclick = () => { populateUserTable(); };
  titleEl.textContent = username;
  introEl.textContent = "Here is a list of posts from " + username + ":";

  fetch(postsUrl)
    .then(response => {
      if (response.ok) {
        response.json().then(posts => {
          posts.map(post => {

            if (userId === post.userId) {
              const postEl = document.createElement("div");
              postEl.classList = "posts";

              const postTitleEl = document.createElement("h3");
              postTitleEl.textContent = post.title;

              const postBodyEl = document.createElement("p");
              postBodyEl.textContent = post.body;

              postEl.appendChild(postTitleEl);
              postEl.appendChild(postBodyEl);
              tableEl.appendChild(postEl);
            }
          })
        })
      }
    })

};

const populateUserTable = () => {
  const usersUrl = "https://jsonplaceholder.typicode.com/users";

  tableEl.innerHTML = "";
  backButtonEl.textContent = "";
  titleEl.textContent = "User-posts";
  introEl.textContent = "Here is a list of users. Click on a user to view their posts:";

  fetch(usersUrl)
    .then(response => {
      if (response.ok) {
        response.json().then(users => {
          users.map(user => {
            const userEl = document.createElement("div");
            userEl.classList = "users";
            userEl.textContent = user.username;
            userEl.onclick = () => { populateUserPosts(user.id, user.username) }
            tableEl.appendChild(userEl);
          });
        });
      } else {
        alert("Error Status: " + response.statusText);
      }
    })
};

populateUserTable();