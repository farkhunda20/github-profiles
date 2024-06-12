const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// getUser();

async function getUser(username) {
  const resp = await fetch(APIURL + username);
  const respData = await resp.json();
  console.log(respData);
  createUserCrad(respData);

  getRepos(username);
}

async function getRepos(username) {
  const resp = await fetch(APIURL + username + "/repos");
  const respData = await resp.json();

  addReposToCard(respData);
}

function createUserCrad(user) {
  const containerHTML = `


  <form id="form" action="">
        <input type="text" id="search" placeholder="search a github user" />
      </form>
  
     <div class ="container">
     <img src="${user.avatar_url}" alt="
     
     ${user.name}" />

      <div class="user-info">

        <h2>${user.name}</h2>
        <p>${user.bio}</p>

       <ul>
       <li>${user.followers} followers</li>
       <li>${user.following} following</li>
       <li>${user.public_repos} public-repos</li>
       </ul>

        <div id="repos"> 
          <h4>Pepos: </h4>
        </div>
        
        </div>
      </div>

      

`;

  main.innerHTML = containerHTML;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");

  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 9)
    .forEach((repo) => {
      const repoEl = document.createElement("a");
      repoEl.classList.add("repo");
      repoEl.href = repo.html_url;
      repoEl.target = "blank";
      repoEl.innerHTML = repo.name;

      reposEl.appendChild(repoEl);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;

  if (user) {
    getUser(user);

    search.value = "";
  }
});
