import {
  generatePageNumbers,
  estimateReadingTime,
  addSearchParam,
  removeSearchParam,
  changePageParam,
  capitalizeStr,
  checkNavRouteIfCurrent,
  searchParamToSortFilter,
} from "../utils"
import { URLSearchParams } from "url"

describe("Utility Functions", () => {
  describe("generatePageNumbers", () => {
    it("should generate page numbers correctly when totalPages <= 5", () => {
      expect(generatePageNumbers(5, 1)).toEqual([1, 2, 3, 4, 5])
    })

    it("should handle currentPage <= 3 correctly", () => {
      expect(generatePageNumbers(10, 2)).toEqual([1, 2, 3, 4, "...", 10])
    })

    it("should handle currentPage > totalPages - 3 correctly", () => {
      expect(generatePageNumbers(10, 8)).toEqual([1, "...", 7, 8, 9, 10])
    })

    it("should handle other cases correctly", () => {
      expect(generatePageNumbers(10, 5)).toEqual([1, "...", 4, 5, 6, "...", 10])
    })
  })

  describe("estimateReadingTime", () => {
    it("should estimate reading time correctly", () => {
      const text = "This is a sample text for testing reading time estimation."
      expect(estimateReadingTime(text)).toEqual(1)
    })
  })

  describe("addSearchParam", () => {
    it("should add a new search parameter correctly", () => {
      expect(
        addSearchParam("key1=value1", { key: "key2", value: "value2" }),
      ).toEqual("key1=value1&key2=value2")
    })
  })

  describe("removeSearchParam", () => {
    it("should remove a search parameter correctly", () => {
      const params = new URLSearchParams("key1=value1&key2=value2")
      expect(removeSearchParam(params, "key1")).toEqual("key2=value2")
    })
  })

  describe("changePageParam", () => {
    it("should change the page parameter correctly", () => {
      expect(changePageParam("key1=value1", 2)).toEqual("key1=value1&page=2")
    })
  })

  describe("capitalizeStr", () => {
    it("should capitalize the first letter of a string", () => {
      expect(capitalizeStr("hello")).toEqual("Hello")
    })
  })

  describe("checkNavRouteIfCurrent", () => {
    it("should check if the navigation route is current correctly", () => {
      const link = "about"
      const pathname = "/about"
      expect(checkNavRouteIfCurrent({ link, pathname })).toBe(true)
    })
  })

  describe("searchParamToSortFilter", () => {
    it("should convert search parameter to sort filter correctly", () => {
      expect(searchParamToSortFilter("date-desc")).toEqual({ date: "desc" })
    })
  })
})
