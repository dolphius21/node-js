// Methods to use for asynchronous JS

// Callbacks => see callbacks.js

console.log("Before");

// Promise
// getUser(1)
//    .then((user) => getRepos(user.gitHubUsername))
//    .then((repos) => getCommits(repos[0]))
//    .then((commits) => console.log("Commits", commits))
//    .catch((err) => console.log("Error", err.message));

// Async and Await
async function displayCommits() {
   try {
      const user = await getUser(1);
      const repos = await getRepos(user.gitHubUsername);
      const commits = await getCommits(repos[0]);
      console.log(commits);
   } catch (err) {
      console.log("Error", err.message);
   }
}

displayCommits();

console.log("After");

function getUser(id) {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         console.log("Reading a user from a database..");
         resolve({ id: id, gitHubUsername: "Rudolph" });
      }, 2000);
   });
}

function getRepos(username) {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         console.log("Calling a GitHub API...");
         reject(new Error("Could not get the repos"));
      }, 2000);
   });
}

function getCommits(repo) {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         console.log("Calling a GitHub API...");
         resolve(["commit"]);
      }, 2000);
   });
}
