import Header from "@/components/header"
import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Template Showcase",
  description: "Free and premium website templates and components",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}