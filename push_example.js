const simpleGit = require('simple-git');
const path = require('path');
const package = require('./package.json');
const outputGitUrl = package['output-git-url'];

if (!outputGitUrl) {
  throw new Error('no value for "output-git-url" found in package.json');
}

simpleGit().clean(simpleGit.CleanOptions.FORCE);
// const git = simpleGit(path.resolve(__dirname, 'dist'));
const git = simpleGit({ baseDir: path.resolve(__dirname, 'dist') });

(async () => {
  try {
    await git.init().addRemote('origin', outputGitUrl);
  } catch (e) {
    console.log(e);
  }
  // const status = await git.status();
  // console.log('status', status);

  // await git.add('./*').commit('initial');
  await git.push(['-u', 'origin', 'master'], () => console.log('done'));
})();
