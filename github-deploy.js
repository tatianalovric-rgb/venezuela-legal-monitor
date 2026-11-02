import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
import fs from 'fs';

const token = process.env.GITHUB_TOKEN || process.argv[2];
const dir = 'C:\\Users\\admin\\.gemini\\antigravity\\scratch\\venezuela-legal-monitor';

async function main() {
  if (!token) {
    console.error('No token provided');
    process.exit(1);
  }

  console.log('1. Verificando usuario con el token de GitHub...');
  const userRes = await fetch('https://api.github.com/user', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'User-Agent': 'LexVen-Deployer',
      'Accept': 'application/vnd.github.v3+json'
    }
  });

  if (!userRes.ok) {
    const errText = await userRes.text();
    console.error('Error al autenticar en GitHub:', userRes.status, errText);
    process.exit(1);
  }

  const userData = await userRes.json();
  const username = userData.login;
  console.log(`✅ Autenticado exitosamente como: ${username} (${userData.name || username})`);

  // 2. Comprobar si el repositorio ya existe
  const repoName = 'venezuela-legal-monitor';
  console.log(`2. Comprobando repositorio ${username}/${repoName}...`);
  
  const repoCheck = await fetch(`https://api.github.com/repos/${username}/${repoName}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'User-Agent': 'LexVen-Deployer',
      'Accept': 'application/vnd.github.v3+json'
    }
  });

  let repoUrl = '';
  if (repoCheck.status === 404) {
    console.log(`3. El repositorio no existe. Creando repositorio público "${repoName}" en GitHub...`);
    const createRes = await fetch('https://api.github.com/user/repos', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'LexVen-Deployer',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: repoName,
        description: 'LexVen Monitor • Monitor de Reformas Legislativas, Gacetas Oficiales y Análisis Regulatorio de Venezuela',
        private: false,
        has_issues: true,
        has_projects: true,
        has_wiki: true
      })
    });

    if (!createRes.ok) {
      const errCreate = await createRes.text();
      console.error('Error creando el repositorio:', createRes.status, errCreate);
      process.exit(1);
    }
    const createData = await createRes.json();
    repoUrl = createData.clone_url;
    console.log(`✅ Repositorio creado con éxito: ${createData.html_url}`);
  } else if (repoCheck.ok) {
    const existingData = await repoCheck.json();
    repoUrl = existingData.clone_url;
    console.log(`ℹ️ El repositorio ya existe: ${existingData.html_url}`);
  } else {
    const errText = await repoCheck.text();
    console.error('Error consultando el repositorio:', repoCheck.status, errText);
    process.exit(1);
  }

  // 4. Configurar remote y hacer push
  console.log(`4. Configurando remote origin (${repoUrl}) y subiendo archivos...`);
  try {
    await git.deleteRemote({ fs, dir, remote: 'origin' });
  } catch (_) {}

  await git.addRemote({
    fs,
    dir,
    remote: 'origin',
    url: repoUrl
  });

  console.log('5. Subiendo rama main a GitHub...');
  const pushRes = await git.push({
    fs,
    http,
    dir,
    remote: 'origin',
    ref: 'main',
    force: true,
    onAuth: () => ({
      username: username,
      password: token
    })
  });

  console.log('✅ ¡Repositorio subido exitosamente a GitHub!');
  console.log(`URL pública: https://github.com/${username}/${repoName}`);
}

main().catch(err => {
  console.error('Error fatal durante el despliegue:', err);
  process.exit(1);
});
