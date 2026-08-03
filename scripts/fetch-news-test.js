import Parser from 'rss-parser';
import * as cheerio from 'cheerio';
import fs from 'fs';

const parser = new Parser();

async function fetchNews() {
  console.log('Fetching Google News RSS...');
  try {
    const feed = await parser.parseURL('https://news.google.com/rss/search?q=%EA%B5%90%EB%AA%A8%EC%84%B8%ED%8F%AC%EC%A2%85+OR+%EB%87%8C%EC%A2%85%EC%96%91&hl=ko&gl=KR&ceid=KR:ko');
    
    console.log(`Found ${feed.items.length} items. Processing top 5...`);
    const newsList = [];

    for (let i = 0; i < Math.min(5, feed.items.length); i++) {
      const item = feed.items[i];
      let imageUrl = null;
      let description = item.contentSnippet || item.description || '';
      
      console.log(`\n[${i+1}] Title: ${item.title}`);
      console.log(`URL: ${item.link}`);
      
      try {
        const res = await fetch(item.link, { redirect: 'follow' });
        const html = await res.text();
        const $ = cheerio.load(html);
        
        imageUrl = $('meta[property="og:image"]').attr('content') || null;
        const ogDesc = $('meta[property="og:description"]').attr('content');
        if (ogDesc) {
          description = ogDesc;
        }
        
        console.log(`Extracted Image: ${imageUrl}`);
        console.log(`Extracted Desc: ${description.substring(0, 50)}...`);
      } catch (err) {
        console.error(`Failed to fetch article details: ${err.message}`);
      }

      let cleanTitle = item.title;
      let source = '';
      if (cleanTitle.includes(' - ')) {
        const parts = cleanTitle.split(' - ');
        source = parts.pop();
        cleanTitle = parts.join(' - ');
      }

      newsList.push({
        id: item.guid || item.link,
        title: cleanTitle,
        source: source,
        link: item.link,
        pubDate: item.pubDate,
        imageUrl: imageUrl,
        description: description,
      });
    }
    
    fs.writeFileSync('./src/data/news-test.json', JSON.stringify(newsList, null, 2));
    console.log('\n--- Saved to ./src/data/news-test.json ---');

  } catch (error) {
    console.error('Error fetching news:', error);
  }
}

fetchNews();
