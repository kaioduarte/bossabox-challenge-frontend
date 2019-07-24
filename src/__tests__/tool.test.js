import React from 'react'
import { cleanup, render } from '@testing-library/react'

import Tool from 'components/Tool'

const TOOL_PROPS = {
  openRemoveDialog: () => {},
  searchTerm: 'h',
  tool: {
    title: '@apollo/react-hooks',
    link: 'https://www.npmjs.com/package/@apollo/react-hooks',
    description: 'React Apollo Hooks.',
    tags: ['apollo', 'graphql', 'react', 'hooks']
  }
}

describe('Tool tests', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should render a tool properly', async () => {
    const { findByTestId } = render(<Tool {...TOOL_PROPS} />)

    const link = await findByTestId('tool-link')
    const description = await findByTestId('tool-description')
    const tags = await findByTestId('tool-tags')

    expect(link.textContent).toEqual(TOOL_PROPS.tool.title)
    expect(description.textContent).toEqual(TOOL_PROPS.tool.description)
    expect(tags.children.length).toEqual(TOOL_PROPS.tool.tags.length)
  })

  it('should highlight tool title based on searchTerm', async () => {
    const { findByTestId } = render(<Tool {...TOOL_PROPS} />)

    const link = await findByTestId('tool-link')
    const highlights = link.querySelectorAll('mark')

    expect(highlights.length).toEqual(1)
    expect(highlights[0].textContent).toEqual(TOOL_PROPS.searchTerm)
  })

  it('should highlight tags based on searchTerm', async () => {
    const { findByTestId } = render(<Tool searchInTags {...TOOL_PROPS} />)

    const tags = await findByTestId('tool-tags')
    const highlights = tags.querySelectorAll('mark')

    expect(highlights.length).toEqual(2)
  })
})
