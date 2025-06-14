import "./globals.css";

export const metadata = {
  title: "Sana Kang",
  description: "Personal portfolio and digital playground for Sana Kang",
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="80" font-size="80" font-family="Tossface">⛰️</text></svg>',
        type: 'image/svg+xml',
      }
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link href="https://cdn.jsdelivr.net/gh/toss/tossface/dist/tossface.css" rel="stylesheet" type="text/css" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
