// eslint-disable-next-line import/named
import { render, screen } from "@testing-library/react"
//import { userEvent } from "@testing-library/user-event"
import Nav from "../nav"
import { navLinks } from "@/data"

jest.mock("next/navigation", () => ({
  usePathname: () => "localhost:3000/posts",
}))

describe("Nav", () => {
  describe("Render", () => {
    it("should render nav component", () => {
      render(<Nav />)
      const nav = screen.getByRole("navigation")
      expect(nav).toBeInTheDocument()
    })

    describe("Links", () =>
      navLinks.forEach((link) =>
        it(`should render a "${link}" link`, () => {
          render(<Nav />)
          const element = screen.getByText(link)
          expect(element).toBeInTheDocument()
        }),
      ))
  })

  describe("Behavior", () => {
    it("should apply a specific class to the current nav link", () => {
      render(<Nav />)
      const currElement = screen.getByText("posts")
      const otherElement = screen.getByText("about")
      expect(currElement).toHaveClass("opacity-100")
      expect(otherElement).toHaveClass("opacity-60")
    })
  })
})
