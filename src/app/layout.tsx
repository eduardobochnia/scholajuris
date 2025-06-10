import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from '@/components/providers/SessionProvider';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Schola Juris",
  description: "Web app de microlearning jurídico gamificado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`scroll-smooth ${inter.variable}`}>
      <body className="min-h-screen bg-aurora-background text-aurora-text antialiased font-sans">
        <SessionProvider>
          <ThemeProvider>
            <AccessibilityProvider>
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </AccessibilityProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
