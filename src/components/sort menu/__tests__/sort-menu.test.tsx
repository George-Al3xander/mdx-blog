// eslint-disable-next-line import/named
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import SortMenu from "@/components/sort menu/sort-menu"
import { sortOptions } from "@/data"
import { routerPushMock } from "../../../../jest.setup"
import { useSearchParams } from "next/navigation"

function setup(params?: URLSearchParams) {
  if (params) {
    // eslint-disable-next-line
    ;(useSearchParams as jest.Mock).mockReturnValue(params)
  }

  render(<SortMenu />)
  const triggerButton = screen.getByText(new RegExp("Sort By", "i"))
  return { triggerButton }
}

const setupWithOptClick = async (
  clickableOption: (typeof sortOptions)[number],
  params?: URLSearchParams,
) => {
  const { triggerButton } = setup(params)
  await userEvent.click(triggerButton)

  const { title } = clickableOption
  const optButton = screen.getByText(title)
  console.log(params?.toString())
  await userEvent.click(optButton)
}

describe("sort menu", () => {
  beforeEach(() => jest.clearAllMocks())

  describe("Render", () => {
    it("should render sort menu ", () => {
      const { triggerButton } = setup()
      expect(triggerButton).toBeInTheDocument()
    })
  })

  describe("Behavior", () => {
    it("should show all the options after click", async () => {
      const { triggerButton } = setup()

      await userEvent.click(triggerButton)
      sortOptions.forEach(({ title }) => {
        const opt = screen.getByText(title)
        expect(opt).toBeInTheDocument()
      })
    })

    describe("Option click", () => {
      for (const { title, value } of sortOptions) {
        it(`should push to the router "${value}" option`, async () => {
          const params = new URLSearchParams()
          const item = sortOptions.find((opt) => opt.value !== value)!
          params.set("sortBy", item.value)
          const { triggerButton } = setup(params)

          await userEvent.click(triggerButton)
          const opt = screen.getByText(title)
          await userEvent.click(opt)
          expect(routerPushMock).toHaveBeenCalledWith(
            expect.stringContaining(value),
          )
        })
      }
    })
    it("should not remove previous search params after click", async () => {
      const searchParams = new URLSearchParams()
      searchParams.set("page", "12")
      searchParams.set("sortBy", "date-desc")
      await setupWithOptClick(sortOptions[1], searchParams)
      expect(routerPushMock).toHaveBeenCalledWith(
        expect.stringContaining(`?page=12`),
      )
    })
  })
})
