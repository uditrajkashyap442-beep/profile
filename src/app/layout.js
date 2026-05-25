import { Inter, Oswald, Dancing_Script, Montserrat } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-control",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-control-compressed",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-control-cursive",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-control-tnt",
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
      className={`${inter.variable} ${oswald.variable} ${dancingScript.variable} ${montserrat.variable} h-full antialiased`}
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
        <style>{`body{background:#F4F0EA}`}</style>
      </head>
      <body className="min-h-full flex flex-col font-control selection:bg-vivid-azure selection:text-black">
        {/* Global Grain Overlay */}
        <div className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.03] mix-blend-multiply">
          <svg className="absolute inset-0 w-full h-full">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>
        
        <Cursor />
        <Nav />
        <PageTransition />
        {children}
      </body>
    </html>
  );
}
