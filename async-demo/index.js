console.log('Before');

getUser(1)
    .then(user => getRepositories(user.gitHubUsername))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log('Commits', commits))
    .catch(err => console.log('Error',err.message));

async function displayCommits(){
    try{
        const user = await getUser(1);
        const repo = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repo[0]);
        console.log(commits);    
    
    }
    catch{
        console.log('error', err.message)
    }
}

displayCommits();

console.log('After');

function getUser(id) {
  return new Promise((resolve, reject)=> {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        resolve({ id: id, gitHubUsername: 'mosh' });
      }, 2000);    
  });
  }

function getRepositories(username) {
    return new Promise((resolve, reject)=> {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['repo1', 'repo2', 'repo3']);
          }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject)=> {
    setTimeout(() => {
    console.log('Calling GitHub API...');
    resolve(['commit']);
  }, 2000);
});
}