import './globals.css'
import ThemeWrapper from '../components/ThemeWrapper'
import { themeBackgrounds, THEME_STORAGE_KEY } from '../components/themeConstants'

export const metadata = {
  // Pages set their own title, e.g. 'Projects' becomes 'Projects | Calvin Le'
  title: {
    default: 'Calvin Le',
    template: '%s | Calvin Le',
  },
  description: 'Portfolio of Calvin Le',
}

/**
 * Runs before first paint. The static HTML is rendered in the light theme, so for
 * visitors whose theme is dark or red, paint the matching background and hide the
 * content until React applies the real theme (ThemeWrapper removes 'theme-pending').
 * The timeout guarantees the page is revealed even if the app script fails to load.
 */
const themeInitScript = `(function () {
  try {
    var backgrounds = ${JSON.stringify(themeBackgrounds)};
    var saved = localStorage.getItem('${THEME_STORAGE_KEY}');
    var theme = backgrounds[saved] ? saved
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var root = document.documentElement;
    root.style.backgroundColor = backgrounds[theme];
    root.style.colorScheme = theme === 'light' ? 'light' : 'dark';
    if (theme !== 'light') {
      root.classList.add('theme-pending');
      setTimeout(function () { root.classList.remove('theme-pending'); }, 3000);
    }
  } catch (e) {}
})();`

export default function RootLayout({ children }) {
  return (
    // The init script edits <html> before React hydrates, so skip that mismatch warning
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link
          rel="stylesheet"
          href="https://cdn.cubing.net/v0/css/@cubing/icons/css"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body>
        <ThemeWrapper>{children}</ThemeWrapper>
      </body>
    </html>
  )
}

