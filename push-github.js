import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
import fs from 'fs';

const dir = 'C:\\Users\\admin\\.gemini\\antigravity\\scratch\\venezuela-legal-monitor';

export async function pushToGitHub(repoUrl, token, username = 'git') {
  console.log(`Setting remote origin: ${repoUrl}`);
  
  // Set remote origin
  try {
    await git.deleteRemote({ fs, dir, remote: 'origin' });
  } catch (_) {}
  
  await git.addRemote({
    fs,
    dir,
    remote: 'origin',
    url: repoUrl
  });

  console.log('Pushing to GitHub (main branch)...');
  const pushResult = await git.push({
    fs,
    http,
    dir,
    remote: 'origin',
    ref: 'main',
    onAuth: () => ({
      username: username || token,
      password: token
    })
  });

  console.log('✅ Push completed successfully!', pushResult);
  return pushResult;
}

// If executed directly from CLI with arguments: node push-github.js <repoUrl> <token>
if (process.argv[2] && process.argv[3]) {
  const repoUrl = process.argv[2];
  const token = process.argv[3];
  pushToGitHub(repoUrl, token).catch(err => {
    console.error('Error pushing to GitHub:', err);
    process.exit(1);
  });
}
