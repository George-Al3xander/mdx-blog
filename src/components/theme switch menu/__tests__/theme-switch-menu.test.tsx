// eslint-disable-next-line import/named
import { screen } from "@testing-library/react"
import { renderWithThemeContext } from "@/lib/test-utils"
import ThemeSwitchMenu from "@/components/theme switch menu/theme-switch-menu"
import { userEvent } from "@testing-library/user-event"
import { themesVariants } from "@/data"
import { ThemeVariant } from "@/types/types"
import { useTheme } from "next-themes"
import React from "react"

const ThemeSpy: React.FC = () => {
  const { theme } = useTheme()
  return <span data-testid="theme-spy">{theme + "-spy"}</span>
}
const setup = (theme: ThemeVariant | undefined = "dark") => {
  renderWithThemeContext(
    <>
      <ThemeSpy />
      <ThemeSwitchMenu />
    </>,
    { theme },
  )
  const spy = screen.getByTestId("theme-spy")

  const triggerButton = screen.getByText(new RegExp("Toggle Theme", "i"))
  return { triggerButton, spy }
}

describe("ThemeSwitchMenu", () => {
  describe("Render", () => {
    it("should render the dropdown menu", () => {
      const { triggerButton } = setup()
      expect(triggerButton).toBeInTheDocument()
    })
  })

  describe("Behavior", () => {
    beforeEach(() => jest.clearAllMocks())
    it("should open the dropdown menu", async () => {
      const { triggerButton } = setup()
      await userEvent.click(triggerButton)
      themesVariants.forEach((variant) => {
        const opt = screen.getByText(variant)
        expect(opt).toBeInTheDocument()
      })
    })
    for (const themeVar of themesVariants) {
      const notCurrentTheme = themesVariants.find((theme) => theme !== themeVar)
      it(`should change the theme`, async () => {
        const { triggerButton, spy } = setup(notCurrentTheme)
        await userEvent.click(triggerButton)

        const btn = screen.getByText(themeVar)
        await userEvent.click(btn)
        expect(spy).toHaveTextContent(themeVar)
      })
    }
  })
})
