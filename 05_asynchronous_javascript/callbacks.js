// Callbacks
console.log("Before");
getUser(1, (user) => {
   getRepositories(user.gitHubUsername, (repositories) => {
      console.log("Repositories:", repositories);
   });
});
console.log("After");

function getUser(id, callback) {
   setTimeout(() => {
      console.log("Reading a user from a database..");
      callback({ id: id, gitHubUsername: "Rudolph" });
   }, 2000);
}

function getRepositories(username, callback) {
   setTimeout(() => {
      console.log("Calling a GitHub API...");
      callback(["repo1", "repo2", "repo3"]);
   }, 2000);
}
