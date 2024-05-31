import React from "react"
import Logo from "../logo"
import Nav from "./nav/nav"
import SocialMediaLinks from "../social-media-links"
import MobileMenu from "../mobile menu/mobile-menu"
import ThemeSwitchMenu from "../theme switch menu/theme-switch-menu"
const Header = () => {
  return (
    <header className=" fixed z-50  top-0 left-0 right-0 w-screen backdrop-blur-md">
      <div className="flex items-center gap-10 py-4 px-8">
        <Logo />
        <Nav />
        <ul className="flex md:flex-row-reverse ml-auto">
          <ThemeSwitchMenu />
          <SocialMediaLinks />
          <MobileMenu />
        </ul>
      </div>
      <hr className="h-2" />
    </header>
  )
}

export default Header
