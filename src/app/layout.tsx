import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header/header"
import Footer from "@/components/footer/footer"
import Providers from "@/components/providers"
import { websiteDescription, websiteName } from "@/data"
import { ReactNode } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: websiteName,
  description: websiteDescription,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className + " relative bg-[var(--fade-post-color)]"}
      >
        <Providers>
          <Header />
          <div className="mt-[4.5rem]">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
