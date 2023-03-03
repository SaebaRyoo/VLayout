import App from './App'
import React from 'react'
import {render, screen} from '@testing-library/react'

describe('unit test of <App/>', () => {
  test('test is working', () => {
    render(<App/>)
    expect(screen.getByText("Vite + React")).toBeInTheDocument()
  })
})
