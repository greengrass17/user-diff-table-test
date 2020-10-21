import React from 'react'
import { render, fireEvent } from '../../tests/util'
import TableControl from './TableControl'

describe('TableControl', () => {
  it('should display load more button and fetchData when load more', () => {
    const fetchData = jest.fn()
    const { getByTestId } = render(<TableControl fetchData={fetchData} />)
    const button = getByTestId('load-button')
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    expect(fetchData).toBeCalled()
  })

  it('should display spinner when loading', () => {
    const { container } = render(<TableControl status="loading" fetchData={jest.fn()} />)
    const spinner = container.querySelector('.MuiCircularProgress-root')
    expect(spinner).toBeInTheDocument()
  })

  it('should display error status correctly and fetchData when retry', () => {
    const fetchData = jest.fn()
    const { getByTestId } = render(<TableControl status="error" fetchData={fetchData} />)
    expect(getByTestId('error-message')).toBeInTheDocument()
    const button = getByTestId('retry-button')
    fireEvent.click(button)
    expect(fetchData).toBeCalled()
  })

})
