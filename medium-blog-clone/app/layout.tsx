import type React from "react"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "TechInsight Blog | Modern Tech & Programming Insights",
  description: "Discover the latest in technology, programming, and design with expert insights and tutorials.",
  keywords: "blog, technology, programming, web development, design, react, javascript",
  authors: [{ name: "Atul Sharma" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://techinsight-blog.vercel.app",
    title: "TechInsight Blog | Modern Tech & Programming Insights",
    description: "Discover the latest in technology, programming, and design with expert insights and tutorials.",
    siteName: "TechInsight Blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechInsight Blog | Modern Tech & Programming Insights",
    description: "Discover the latest in technology, programming, and design with expert insights and tutorials.",
    creator: "@atulsharma",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://techinsight-blog.vercel.app" />
        <meta name="theme-color" content="#1a365d" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased min-h-screen bg-white dark:bg-navy-950 text-gray-900 dark:text-gray-100`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 pt-16 page-transition">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
