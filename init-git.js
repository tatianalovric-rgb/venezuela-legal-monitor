import git from 'isomorphic-git';
import fs from 'fs';
import path from 'path';

const dir = 'C:\\Users\\admin\\.gemini\\antigravity\\scratch\\venezuela-legal-monitor';

async function initRepo() {
  console.log('Initializing git repository in', dir);
  await git.init({ fs, dir, defaultBranch: 'main' });
  console.log('Git repo initialized!');

  // Helper to get all non-ignored files
  function getAllFiles(currentDir, relativePath = '') {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    let files = [];
    for (const entry of entries) {
      if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === 'dist' || entry.name.endsWith('.log')) {
        continue;
      }
      const fullPath = path.join(currentDir, entry.name);
      const rel = relativePath ? `${relativePath}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        files = files.concat(getAllFiles(fullPath, rel));
      } else {
        files.push(rel);
      }
    }
    return files;
  }

  const filesToAdd = getAllFiles(dir);
  console.log(`Adding ${filesToAdd.length} files to git staging...`);

  for (const filepath of filesToAdd) {
    await git.add({ fs, dir, filepath });
  }

  console.log('Creating initial commit...');
  const sha = await git.commit({
    fs,
    dir,
    message: 'Initial commit: LexVen Monitor - Monitor de Cambios Legislativos y Gacetas de Venezuela',
    author: {
      name: 'LexVen Developer',
      email: 'dev@lexven-monitor.local'
    }
  });

  console.log(`✅ Commit created successfully! SHA: ${sha}`);
  const log = await git.log({ fs, dir, depth: 1 });
  console.log('Commit info:', log[0].commit.message);
}

initRepo().catch(console.error);
