import { act, renderHook } from "@testing-library/react"

import useSortBy from "@/hooks/useSortBy"
import { useSearchParams } from "next/navigation"
import { routerPushMock } from "../../../jest.setup"
import { sortOptions } from "@/data"

const setup = (value?: string, params?: URLSearchParams) => {
  if (params) (useSearchParams as jest.Mock).mockReturnValue(params)

  const { result } = renderHook(() => useSortBy())
  if (value) {
    act(() => {
      result.current.onValueChange(value)
    })
  }

  return result
}

describe("useSortBy", () => {
  describe("Behavior", () => {
    describe(`should provide "date-desc" as the default value`, () => {
      it(`no value provided`, () => {
        const result = setup()
        expect(result.current.value).toBe("date-desc")
      })
      it(`wrong value provided`, () => {
        setup("wrong-option")

        expect(routerPushMock).not.toHaveBeenCalledWith(
          expect.stringContaining("wrong-option"),
        )
        expect(routerPushMock).toHaveBeenCalledWith(
          expect.stringContaining("date-desc"),
        )
      })
    })
    it("should change value to the provided", () => {
      setup("date-asc")
      expect(routerPushMock).toHaveBeenCalledWith(
        expect.stringContaining("date-asc"),
      )
    })

    describe(`should check if the specific option is current`, () => {
      beforeEach(() => jest.clearAllMocks())

      sortOptions.forEach((option) => {
        const opt = option.value
        const otherOption = sortOptions.find(
          ({ value }) => value !== opt,
        )?.value!
        const params = new URLSearchParams()
        params.set("sortBy", opt)
        it(`${opt}`, () => {
          const result = setup(opt, params)
          act(() => {
            expect(result.current.checkIfCurrent(opt)).toBe(true)
            expect(routerPushMock).not.toHaveBeenCalledWith(
              expect.stringContaining(otherOption),
            )
          })
        })
      })
    })
  })
})
