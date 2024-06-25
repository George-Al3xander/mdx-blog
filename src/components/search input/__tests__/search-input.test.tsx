// eslint-disable-next-line import/named
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { slug } from "github-slugger"
import SearchInput from "@/components/search input/search-input"
import { routerPushMock } from "../../../../jest.setup"

function setup() {
  render(<SearchInput />)
  const input = screen.getByPlaceholderText("Search for anything...!")
  const buttonClear = screen.getByLabelText("Clear search input")
  const buttonSearch = screen.getByText("Search")
  return { input, buttonClear, buttonSearch }
}

describe("SearchInput", () => {
  beforeEach(() => jest.clearAllMocks())
  describe("Render", () => {
    it("should render search input", () => {
      const { input } = setup()
      expect(input).toBeInTheDocument()
    })
    it("should render all the buttons", () => {
      const { buttonClear, buttonSearch } = setup()

      expect(buttonClear).toBeInTheDocument()
      expect(buttonSearch).toBeInTheDocument()
    })
  })

  describe("Behavior", () => {
    it("it should have an empty input", () => {
      const { input } = setup()
      expect(input).toHaveValue("")
    })

    it("it shouldn't have an empty input after user types", async () => {
      const { input } = setup()
      const text = "Some text"

      await userEvent.type(input, text)
      expect(input).toHaveValue(text)
    })

    it("it should clear an empty input and search params after the clear button click", async () => {
      const text = "Some text"
      const { input, buttonClear, buttonSearch } = setup()

      await userEvent.type(input, text)
      await userEvent.click(buttonSearch)
      expect(routerPushMock).toHaveBeenNthCalledWith(
        1,
        `?page=1&searchQuery=${slug(text)}`,
      )
      await userEvent.click(buttonClear)

      expect(routerPushMock).toHaveBeenNthCalledWith(2, `?page=1`),
        expect(input).toHaveValue("")
    })

    it("it should call router push function with right args", async () => {
      const text = "Some text"
      const { input, buttonSearch } = setup()

      await userEvent.type(input, text)
      await userEvent.click(buttonSearch)

      expect(routerPushMock).toHaveBeenCalledWith(
        expect.stringContaining(`searchQuery=${slug(text)}`),
      )
    })
    it("it should not remove old search params after the submission", async () => {
      const { input, buttonSearch } = setup()

      const text = "Some text"

      await userEvent.type(input, text)
      await userEvent.click(buttonSearch)

      expect(routerPushMock).toHaveBeenCalledWith(
        `?page=1&searchQuery=${slug(text)}`,
      )
    })
  })
})
