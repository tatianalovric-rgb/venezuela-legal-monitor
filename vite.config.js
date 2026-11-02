import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fetchVenezuelanLegalNews } from './src/server/legalNewsService.js'

// Plugin para endpoint local de noticias jurídicas en tiempo real
function venezuelaNewsApiPlugin() {
  let cachedNews = null;
  let lastFetchTime = 0;
  const CACHE_DURATION = 60 * 1000; // 1 minuto de caché para evitar rate limits

  return {
    name: 'venezuela-news-api',
    configureServer(server) {
      server.middlewares.use('/api/live-news', async (req, res, next) => {
        if (req.method !== 'GET') {
          return next();
        }

        try {
          const now = Date.now();
          const forceRefresh = req.url && req.url.includes('refresh=true');

          if (!cachedNews || forceRefresh || (now - lastFetchTime > CACHE_DURATION)) {
            console.log('🔄 Sincronizando noticias jurídicas de Venezuela en vivo...');
            const items = await fetchVenezuelanLegalNews();
            cachedNews = items;
            lastFetchTime = now;
          }

          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify({
            success: true,
            updatedAt: new Date(lastFetchTime).toISOString(),
            count: cachedNews ? cachedNews.length : 0,
            items: cachedNews || []
          }));
        } catch (error) {
          console.error('Error en /api/live-news:', error);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: error.message }));
        }
      });
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    venezuelaNewsApiPlugin()
  ],
})
