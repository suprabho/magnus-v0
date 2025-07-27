import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Web App Prototype",
  description: "A prototype web app with preferences, chat, catalog, and schedule features",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.cdnfonts.com/css/cabinet-grotesk"
          rel="stylesheet"
        />
      </head>
      <body className="font-cabinet-grotesk">{children}</body>
    </html>
  )
}
