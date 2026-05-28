// IndexNow — instant-indexing protocol used by Bing, Yandex, Seznam, Naver.
// POSTs our URL list to https://api.indexnow.org/IndexNow so the search
// engines crawl us immediately instead of waiting for sitemap polling.
//
// Run after every meaningful content push:
//   node scripts/indexnow-submit.mjs
//
// Or wire to Vercel via "Deploy Hook" → POST to api.indexnow.org.
//
// Spec: https://www.indexnow.org/documentation

const HOST = "thehairextensionsbali.com";
const KEY = "1be079b343e283eb18d664b5d1b3dbbf";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// URLs to ping. Mirrors app/sitemap.ts but inlined to keep this script
// runnable without importing TS source.
const SERVICE_SLUGS = ["keratin-bond", "nano-ring", "micro-ring", "weft", "tape-in", "clip-in"];

const urls = [
  `https://${HOST}/`,
  `https://${HOST}/products`,
  `https://${HOST}/tips`,
  `https://${HOST}/gallery`,
  `https://${HOST}/book`,
  ...SERVICE_SLUGS.map((s) => `https://${HOST}/products/${s}`),
];

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urls,
};

console.log(`Submitting ${urls.length} URLs to IndexNow...`);

const res = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify(payload),
});

console.log(`  status: ${res.status} ${res.statusText}`);

// IndexNow returns 200/202 on success. 4xx codes per spec:
// 400 Bad request, 403 Forbidden (key invalid), 422 Unprocessable
// (URL not on host), 429 Too many requests.
if (res.status === 200 || res.status === 202) {
  console.log(`  ✓ Submitted successfully. Bing will crawl shortly.`);
} else {
  const text = await res.text();
  console.error(`  ✗ Failed:\n${text}`);
  process.exit(1);
}

console.log(`\nURLs submitted:`);
urls.forEach((u) => console.log(`  · ${u}`));
