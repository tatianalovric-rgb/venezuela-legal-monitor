import { fetchVenezuelanLegalNews } from './src/server/legalNewsService.js';

async function main() {
  console.log("Fetching live news...");
  const news = await fetchVenezuelanLegalNews();
  console.log(`Retrieved ${news.length} items`);
  console.log("\nSample processed item:");
  console.log(JSON.stringify(news[0], null, 2));
}

main().catch(console.error);
