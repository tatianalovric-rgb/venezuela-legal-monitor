import { fetchVenezuelanLegalNews } from '../src/server/legalNewsService.js';
import fs from 'fs';
import path from 'path';

async function updateLiveNewsJson() {
  console.log('🔄 Extrayendo y analizando noticias de Venezuela...');
  const items = await fetchVenezuelanLegalNews();
  console.log(`✅ Total de noticias procesadas: ${items.length}`);

  const output = {
    success: true,
    updatedAt: new Date().toISOString(),
    count: items.length,
    items: items
  };

  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outputPath = path.join(publicDir, 'live-news.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`✅ Archivo guardado exitosamente en: ${outputPath}`);
}

updateLiveNewsJson().catch(err => {
  console.error('Error generando live-news.json:', err);
  process.exit(1);
});
