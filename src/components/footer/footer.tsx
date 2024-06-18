import React from "react"

import { websiteName } from "@/data"

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center gap-2 p-8">
      <small>
        &copy; {new Date().getFullYear()} {websiteName}
      </small>
    </footer>
  )
}

export default Footer
