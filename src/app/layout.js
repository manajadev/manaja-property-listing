import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { fetchListings } from "@/lib/apiservice";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://manaja.solutions";

const SITE_NAME = "Manaja Solutions";
const SITE_TITLE =
  "Manaja Solutions | Premium and verified Real Estate in Africa";
const SITE_DESCRIPTION =
  "Premium & verified property listing guaranteed across Africa's prime locations. From luxury apartments to investment opportunities, find your perfect space with Manaja Solutions.";

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,

  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",

  keywords: [
    "real estate Africa",
    "property listing Africa",
    "verified properties",
    "luxury apartments Africa",
    "real estate investment Africa",
    "rent property Africa",
    "buy property Africa",
    "Manaja Solutions",
    "Nigeria real estate",
    "premium property listings",
  ],

  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  category: "real estate",

  alternates: {
    canonical: "/",
  },

  manifest: "/manifest.json",

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", sizes: "any", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },

  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_NG",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Premium and verified real estate in Africa`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
    creator: "@manaja",
    site: "@manaja",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  verification: {
    // Fill these in when you have them
    // google: "your-google-site-verification-token",
    // yandex: "your-yandex-token",
    // other: { "msvalidate.01": "your-bing-token" },
  },

  other: {
    "theme-color": "#1A4C9E",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": SITE_NAME,
    "mobile-web-app-capable": "yes",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7f9" },
    { media: "(prefers-color-scheme: dark)", color: "#0D1117" },
  ],
};

// Runs before React hydrates to set `.dark` on <html> and avoid theme flash
const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    var root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  } catch (e) {}
})();
`;

// JSON-LD structured data — Organization + WebSite
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
      description: SITE_DESCRIPTION,
      sameAs: [
        // add your social profile URLs when you have them
        // "https://twitter.com/manaja",
        // "https://www.linkedin.com/company/manaja",
        // "https://www.instagram.com/manaja",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-NG",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/listings?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default async function RootLayout({ children }) {
  // Fetch a small page of listings for the footer (featured items + category counts).
  // Wrapped in try/catch so a fetch failure never crashes the layout.
  let footerListings = [];
  try {
    footerListings = await fetchListings({ limit: 8, offset: 0 });
  } catch {
    // silently fall back to an empty list
  }

  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
          suppressHydrationWarning
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased flex flex-col">
        <Header />
        <div className="grow">{children}</div>
        <Footer listings={footerListings} />
      </body>
    </html>
  );
}