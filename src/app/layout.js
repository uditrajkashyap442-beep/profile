import { Bebas_Neue, Syne, Space_Mono } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Udit Raj Kashyap — ECE Student & Developer | VIT Vellore",
  description: "B.Tech ECE student at VIT Vellore. Open to remote internships in embedded systems, VLSI, and software engineering. Vellore, India.",
  openGraph: {
    title: "Udit Raj Kashyap — ECE Student & Developer",
    images: ["/og-image.png"],
    url: "https://your-domain.com",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://your-domain.com",
  }
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${syne.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <head>
        <meta httpEquiv="Content-Security-Policy"
              content="default-src 'self';
                       script-src 'self' 'unsafe-inline' 'unsafe-eval'
                         https://cdnjs.cloudflare.com
                         https://cdn.jsdelivr.net
                         https://unpkg.com
                         https://fonts.googleapis.com;
                       style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
                       font-src 'self' https://fonts.gstatic.com;
                       img-src 'self' data: https:;
                       connect-src 'self' https://api.github.com;" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains" />
        <style>{`body{background:#080810}`}</style>
      </head>
      <body className="min-h-full flex flex-col font-syne bg-[#080810] selection:bg-[#E6FF00] selection:text-black">
        {children}
      </body>
    </html>
  );
}
