// src/middleware.ts

// List of target bot User-Agents
const CRAWLER_USER_AGENTS = [
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'embedly',
  'quora link preview',
  'pinterest/0.',
  'slackbot',
  'discordbot',
  'telegrambot'
];

export function middleware(request: Request) {
  const userAgent = request.headers.get('user-agent') || '';
  const isBot = CRAWLER_USER_AGENTS.some((bot) => userAgent.toLowerCase().includes(bot));

  if (isBot) {
    const requestUrl = new URL(request.url);
    
    // Fallback values for social crawlers
    const title = "My Awesome App";
    const description = "Built with Vite, React 19, and TypeScript.";
    const ogImage = "https://vercel.app"; 

    // Generate static raw HTML payload specifically optimized for the crawling bot
    const botHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <meta name="description" content="${description}" />
          <meta property="og:title" content="${title}" />
          <meta property="og:description" content="${description}" />
          <meta property="og:image" content="${ogImage}" />
          <meta property="og:url" content="${requestUrl.href}" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
        </head>
        <body></body>
      </html>
    `;

    return new Response(botHtml, {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  // To let the request pass through to your Vite client-side bundle, return nothing or a header modifications response.
  // In Vercel standalone routing middleware, returning nothing continues the routing execution block natively.
}
