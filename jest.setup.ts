import "@testing-library/jest-dom"
import { TextEncoder, TextDecoder } from "util"
import { config } from "./jest.config"

export const routerPushMock = jest.fn()

const searchParams = new URLSearchParams()
searchParams.set("page", "1")
jest.mock("next/navigation", () => ({
  usePathname: () => `localhost:3000/posts?${searchParams.toString()}`,
  useSearchParams: jest.fn(() => searchParams),
  useRouter: jest.fn(() => ({ push: routerPushMock })),
}))

jest.mock("github-slugger", () => ({
  slug: (str: string) => str.replace(/\s/g, "-").toLowerCase(),
}))

if (config.testEnvironment === "jest-environment-jsdom") {
  window.HTMLElement.prototype.hasPointerCapture = jest.fn()
  window.HTMLElement.prototype.scrollIntoView = jest.fn()
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
}

Object.assign(global, { TextDecoder, TextEncoder })
