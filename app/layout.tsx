import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "caralstable/style.css";
import Navbar from "@/app/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crestone UI - Figma Design Playground",
  description: "Entorno de pruebas y consideraciones de desarrollo para componentes Figma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-zinc-900  dark:text-zinc-50 font-sans selection:bg-info-light selection:text-info-main">
        {/* Navigation Bar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-200 bg-zinc-100 dark:border-zinc-900 dark:bg-zinc-950 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:flex sm:items-center sm:justify-between">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              &copy; {new Date().getFullYear()} Crestone UI. Prototipos Figma a Código React.
            </p>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-600 mt-2 sm:mt-0">
              Desarrollado para validación de interfaz de usuario y usabilidad.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

