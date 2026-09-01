// src/middleware.ts

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

// Definition structure for targeted metadata overrides
interface RouteMeta {
  title: string;
  description: string;
  image: string;
}

// Map key path routing prefixes to contextual content rules
const ROUTE_METADATA_MAP: Record<string, RouteMeta> = {
  '/': {
    title: "Home | My Awesome App",
    description: "Welcome to our modular web platform built with Vite and React 19.",
    image: "https://vercel.app"
  },
  '/about': {
    title: "About Us | My Awesome App",
    description: "Learn more about our dedicated development principles and infrastructure goals.",
    image: "https://vercel.app"
  },
  '/contact': {
    title: "Contact Support | My Awesome App",
    description: "Get in touch with our technical assistance desks and client service departments.",
    image: "https://vercel.app"
  }
};

// Global fallback block used when no hardcoded string pattern matches
const DEFAULT_META: RouteMeta = {
  title: "My Awesome App",
  description: "Built with Vite, React 19, and TypeScript.",
  image: "https://vercel.app"
};

export function middleware(request: Request) {
  const userAgent = request.headers.get('user-agent') || '';
  const isBot = CRAWLER_USER_AGENTS.some((bot) => userAgent.toLowerCase().includes(bot));

  if (isBot) {
    const requestUrl = new URL(request.url);
    const pathname = requestUrl.pathname;
    
    // Select metadata config depending on the matching path or use fallback constants
    let metadata = ROUTE_METADATA_MAP[pathname] || DEFAULT_META;

    // Optional: Match dynamic layout segments (e.g., `/blog/some-slug-string`)
    if (pathname.startsWith('/blog/')) {
      const slug = pathname.replace('/blog/', '').replace(/-/g, ' ');
      // Capitalize slug strings cleanly to display readable auto-generated titles
      const formattedTitle = slug.charAt(0).toUpperCase() + slug.slice(1);
      
      metadata = {
        title: `${formattedTitle} | Our Blog`,
        description: `Read articles covering ${formattedTitle} on our engineering platform channels.`,
        image: `https://vercel.app`
      };
    }

    const botHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${metadata.title}</title>
          <meta name="description" content="${metadata.description}" />
          <meta property="og:title" content="${metadata.title}" />
          <meta property="og:description" content="${metadata.description}" />
          <meta property="og:image" content="${metadata.image}" />
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

  // Pass processing natively down to vercel.json routing configurations
  return new Response(null, {
    headers: { 'x-middleware-next': '1' }
  });
}
