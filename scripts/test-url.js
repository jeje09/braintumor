import Parser from 'rss-parser';
import * as cheerio from 'cheerio';
import https from 'https';

const parser = new Parser();

async function getRealUrl(googleUrl) {
  try {
    const res = await fetch(googleUrl, { redirect: 'manual' });
    if (res.status >= 300 && res.status < 400) {
      return res.headers.get('location');
    }
    const html = await res.text();
    const $ = cheerio.load(html);
    const a = $('a').attr('href');
    if (a) return a;
    return googleUrl;
  } catch (e) {
    return googleUrl;
  }
}

async function fetchNews() {
  const feed = await parser.parseURL('https://news.google.com/rss/search?q=%EA%B5%90%EB%AA%A8%EC%84%B8%ED%8F%AC%EC%A2%85+OR+%EB%87%8C%EC%A2%85%EC%96%91&hl=ko&gl=KR&ceid=KR:ko');
  const item = feed.items[0];
  console.log("Original URL:", item.link);
  
  const realUrl = await getRealUrl(item.link);
  console.log("Real URL:", realUrl);
  
  if (realUrl.startsWith('http')) {
    const res = await fetch(realUrl, { headers: { 'User-Agent': 'Mozilla/5.0' }});
    const html = await res.text();
    const $ = cheerio.load(html);
    console.log("OG Image:", $('meta[property="og:image"]').attr('content'));
    console.log("OG Desc:", $('meta[property="og:description"]').attr('content'));
  }
}

fetchNews();
