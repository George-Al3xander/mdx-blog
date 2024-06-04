import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header/header"
import Footer from "@/components/footer/footer"
import Providers from "@/components/providers"
import { websiteName } from "@/data"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: websiteName,
  description: "A simple blog template built with Next.js and MDX.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className + " relative bg-[var(--fade-post-color)]"}
      >
        <Providers>
          <Header />
          <div className="mt-[5rem]">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
