import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header/header"
import Footer from "@/components/footer/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MDX Blog",
  description: "A simple blog template built with Next.js and MDX.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " relative"}>
        <Header />
        <div className="mt-[5rem]">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
