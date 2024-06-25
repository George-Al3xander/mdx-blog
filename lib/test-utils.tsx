import React, { ReactElement, ReactNode } from "react"
import {
  render,
  type RenderOptions,
  type RenderResult,
} from "@testing-library/react"
import { ThemeProvider } from "next-themes"

type TestProviderOptions = {
  theme?: string
}

type CustomOptions = RenderOptions & TestProviderOptions

const createTestProviders = ({
  theme = "dark",
}: TestProviderOptions): React.FC<{ children: ReactNode }> =>
  function ProvideThemes({ children }) {
    return (
      <ThemeProvider
        defaultTheme={theme}
        enableSystem={false}
        attribute="class"
      >
        {children}
      </ThemeProvider>
    )
  }

export const renderWithThemeContext = (
  ui: ReactElement,
  { theme, ...options }: CustomOptions = {},
): RenderResult =>
  render(ui, { wrapper: createTestProviders({ theme }), ...options })
