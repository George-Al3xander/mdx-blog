import { useSearch } from "@/hooks/useSearch"
import { act, renderHook } from "@testing-library/react"
import { routerPushMock } from "../../../jest.setup"
import { slug } from "github-slugger"

const setup = (value?: string) => {
  const { result } = renderHook(() => useSearch())
  if (value) {
    act(() => {
      result.current.handleChange({ target: { value } } as any)
    })
  }
  return result
}

describe("useSearch", () => {
  describe("Behavior", () => {
    it("should change the search query after the handleChange invocation", () => {
      const value = "test"
      const result = setup(value)
      expect(result.current.searchQuery).toBe(value)
    })

    describe("validation", () => {
      it("should disable the input", () => {
        const result = setup("ok")
        expect(result.current.isValid).toBe(false)
      })
      it("should not disable the input", () => {
        const result = setup("okay")
        expect(result.current.isValid).toBe(true)
      })
    })

    describe("should call router.push method with a right search query", () => {
      const query = "Dog food"
      it("search function", () => {
        const result = setup(query)
        act(() => {
          result.current.search({ preventDefault: () => {} } as any)
        })
        expect(routerPushMock).toHaveBeenCalledWith(
          expect.stringContaining(`searchQuery=${slug(query)}`),
        )
      })
      it("clear function", () => {
        const result = setup(query)
        act(() => {
          result.current.clear({ preventDefault: () => {} } as any)
        })
        expect(routerPushMock).not.toHaveBeenNthCalledWith(
          2,
          expect.stringContaining(`searchQuery=${slug(query)}`),
        )
      })
    })
  })
})
