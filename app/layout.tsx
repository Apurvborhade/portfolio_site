import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Geist_Mono } from "next/font/google"
import localFont from "next/font/local"

// Satoshi is an Indian Type Foundry font from fontshare.com (ITF Free Font License)
const sans = localFont({
  src: [
    { path: "./fonts/Satoshi-Light.woff2", weight: "300" },
    { path: "./fonts/Satoshi-Regular.woff2", weight: "400" },
    { path: "./fonts/Satoshi-Medium.woff2", weight: "500" },
    { path: "./fonts/Satoshi-Bold.woff2", weight: "700" },
  ],
  variable: "--font-sans",
})
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Apurva Borhade | Full-stack & Blockchain Engineer",
  description:
    "Portfolio of Apurva Borhade, a full-stack and blockchain engineer from Pune building backend systems, event-driven infrastructure and on-chain products.",
}

export const viewport: Viewport = {
  themeColor: "#e8e6e1",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable}`}>{children}</body>
    </html>
  )
}
