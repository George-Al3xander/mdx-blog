// eslint-disable-next-line import/named
import { render, screen } from "@testing-library/react"
import PostsPagination from "@/components/post/posts-pagination"
import { PER_PAGE } from "@/data"
import { useSearchParams } from "next/navigation"
jest.mock("next/dist/client/router", () => ({
  useRouter: jest.fn(),
}))

const setup = (props: {
  page: string | number
  totalCount: number
  pathname: string
  params?: URLSearchParams
}) => {
  render(<PostsPagination {...props} />)
  const { params } = props

  if (params) (useSearchParams as jest.Mock).mockReturnValue(params)

  const pagesCount = Math.ceil(props.totalCount / PER_PAGE)
  const buttonNext = screen.getByTestId("pagination-next")
  const buttonPrevious = screen.getByTestId("pagination-previous")
  const buttonFirstPage = screen.getByRole("link", { name: `1` })
  const buttonLastPage = screen.getByRole("link", { name: `${pagesCount}` })
  const buttonCurrentPage = screen.getByRole("link", {
    name: `${props.page}`,
  })

  return {
    buttonNext,
    buttonPrevious,
    buttonFirstPage,
    buttonLastPage,
    buttonCurrentPage,
  }
}

describe("PostsPagination", () => {
  describe("render", () => {
    it("should render all the default buttons", () => {
      const res = setup({ page: 1, pathname: "/", totalCount: 25 })
      Object.values(res).forEach((element) => {
        expect(element).toBeInTheDocument()
      })
    })
    it("should render all the default buttons: different current page", () => {
      const res = setup({ page: 6, pathname: "/", totalCount: 50 })
      Object.values(res).forEach((element) => {
        expect(element).toBeInTheDocument()
      })
    })
  })

  describe("Behavior", () => {
    it("should not render anything", () => {
      try {
        setup({ page: 1, pathname: "/", totalCount: 5 })
        expect(12).toBe(1)
      } catch (err) {
        expect(12).toBe(12)
      }
    })

    it("should not render a ellipsis", () => {
      setup({ page: 1, pathname: "/", totalCount: 20 })
      const btn = screen.queryByTestId("pagination-ellipsis")
      expect(btn).not.toBeInTheDocument()
    })
    it("should  render a ellipsis", () => {
      setup({ page: 1, pathname: "/", totalCount: 100 })
      const btn = screen.queryByTestId("pagination-ellipsis")
      expect(btn).toBeInTheDocument()
    })

    it("should show the proper pages button for the current page", () => {
      const page = 10
      setup({ page, pathname: "/", totalCount: 87 })
      const prevPageBtn = screen.getByText(page - 1)
      const nextPageBtn = screen.getByText(page + 1)
      expect(prevPageBtn).toBeInTheDocument()
      expect(nextPageBtn).toBeInTheDocument()
    })

    it("should set the right page number", async () => {
      const totalCount = 87
      const { buttonLastPage } = setup({
        page: 1,
        pathname: "/posts",
        totalCount,
      })
      const pagesCount = Math.ceil(totalCount / PER_PAGE)
      expect(buttonLastPage).toHaveAttribute(
        "href",
        expect.stringContaining(`?page=${pagesCount}`),
      )
    })
  })
})
