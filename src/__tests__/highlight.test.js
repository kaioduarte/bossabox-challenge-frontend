import React from 'react'
import { cleanup, render } from '@testing-library/react'

import Highlight from 'components/Highlight'

describe('Highlight tests', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should return the content when searchTerm is empty', async () => {
    const props = {
      content: 'Test',
      term: ''
    }

    const { findByTestId } = render(<Highlight {...props} />)
    const emptyTerm = await findByTestId('highlight-empty-term')

    expect(emptyTerm).toBeDefined()
    expect(emptyTerm.textContent).toEqual(props.content)
  })

  it('should return the content when searchTerm is empty', async () => {
    const props = {
      content: 'Test',
      term: 't'
    }

    const { findByTestId } = render(<Highlight {...props} />)
    const highlightContent = await findByTestId('highlight-content')

    expect(highlightContent).toBeDefined()
    expect(highlightContent.querySelectorAll('mark').length).toEqual(2)
  })
})
