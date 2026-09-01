import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const isBot = CRAWLER_USER_AGENTS.some((bot) => userAgent.toLowerCase().includes(bot));

  if (isBot) {
    const url = request.nextUrl.clone();
    
    // Optional Fallback values: Customize per route logic if desired
    const title = "My Awesome App";
    const description = "Built with Vite, React 19, and TypeScript.";
    const ogImage = "https://vercel.app"; 

    // Generate a static raw HTML payload specifically optimized for the crawling bot
    const botHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <meta name="description" content="${description}" />
          <meta property="og:title" content="${title}" />
          <meta property="og:description" content="${description}" />
          <meta property="og:image" content="${ogImage}" />
          <meta property="og:url" content="${url.href}" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
        </head>
        <body></body>
      </html>
    `;

    return new NextResponse(botHtml, {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  return NextResponse.next();
}

// Ensure the middleware executes across all app pages, excluding asset files
export const config = {
  matcher: ['/((?!api|_next|static|.*\\..*$).*)'],
};
