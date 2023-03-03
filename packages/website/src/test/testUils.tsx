import React from 'react'
import type { PropsWithChildren } from 'react'
import { setupStore } from '../stores/store'
import type {  RootState, AppStore } from '../stores/store'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import type { PreloadedState } from '@reduxjs/toolkit'
import type { RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// 这个 interface 扩展了 RTL 的默认 render 选项，同时允许用户指定其他选项，例如 initialState 和 store
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

// custom render for support Provider
export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    // 如果没有传入 store, 则自动创建一个 store 实例
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }
  // enhance render methods
  return {
    store, // 增加redux功能
    user: userEvent.setup(), // 在render前配置一个userEvent实例
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  }
}
