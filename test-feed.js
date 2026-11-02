async function test() {
  const url = 'https://news.google.com/rss/search?q=gaceta+oficial+venezuela+OR+seniat+OR+sudeban+OR+bcv+OR+asamblea+nacional&hl=es-419&gl=VE&ceid=VE:es-419';
  const res = await fetch(url);
  const text = await res.text();
  const items = [];
  const regex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const raw = match[1];
    const titleMatch = raw.match(/<title>([\s\S]*?)<\/title>/);
    const linkMatch = raw.match(/<link>([\s\S]*?)<\/link>/);
    const dateMatch = raw.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
    const sourceMatch = raw.match(/<source[^>]*>([\s\S]*?)<\/source>/);
    items.push({
      title: titleMatch ? titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1') : '',
      link: linkMatch ? linkMatch[1] : '',
      pubDate: dateMatch ? dateMatch[1] : '',
      source: sourceMatch ? sourceMatch[1] : 'Medio Informativo'
    });
  }
  console.log(`Total noticias legales/económicas encontradas: ${items.length}`);
  items.slice(0, 5).forEach((item, idx) => {
    console.log(`\n[${idx + 1}] ${item.title}`);
    console.log(`   Fuente: ${item.source} | Fecha: ${item.pubDate}`);
    console.log(`   Link: ${item.link}`);
  });
}
test().catch(console.error);
