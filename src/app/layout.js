import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'Inventa Digital',
  description: 'Comprehensive technical solutions provider in Dubai',
  themeColor: '#ffffff',
  robots: 'index, follow',
  openGraph: {
    title: 'Inventa Digital Technical Services',
    description: 'Professional technical services in Dubai',
    images: '/og-image.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script
          src="https://cdn.tailwindcss.com"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/alpinejs/3.13.3/cdn.min.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} antialiased text-gray-800 min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}