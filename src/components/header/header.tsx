import React from "react"
import Logo from "../logo"
import Nav from "./nav/nav"
import MobileMenu from "../mobile menu/mobile-menu"
import ThemeSwitchMenu from "../theme switch menu/theme-switch-menu"

const Header = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 w-screen border-b border-border backdrop-blur-md">
      <div className="flex items-center gap-10 px-8 py-4">
        <Logo />
        <Nav />
        <ul className={`ml-auto flex`}>
          <ThemeSwitchMenu />
          <MobileMenu />
        </ul>
      </div>
    </header>
  )
}

export default Header
