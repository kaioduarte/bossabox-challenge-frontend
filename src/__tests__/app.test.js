import React from 'react'
import { act, cleanup, fireEvent, render } from '@testing-library/react'
import fetchMock from 'fetch-mock'

import App from '../app'

describe('App tests', () => {
  beforeAll(() => {
    global.fetch = fetch

    fetchMock.get(`glob:${process.env.REACT_APP_API_BASEURL}/*`, [
      {
        title: '@apollo/react-hooks',
        link: 'https://www.npmjs.com/package/@apollo/react-hooks',
        description: 'React Apollo Hooks.',
        tags: ['apollo', 'graphql', 'react', 'hooks'],
        id: 1
      }
    ])
  })

  beforeEach(() => {
    cleanup()
  })

  afterAll(() => {
    fetchMock.restore()
  })

  it('should add a new tool when form has been submitted', async () => {
    const tool = {
      title: 'Test',
      link: 'http://www.google.com',
      description: 'Test tool',
      tags: 'tool vuttr bossabox'
    }

    fetchMock.post(process.env.REACT_APP_API_BASEURL, {
      ...tool,
      id: new Date().getTime(),
      tags: tool.tags.split(' ')
    })

    const { findByTestId, findByText } = render(<App />)

    const addBtn = await findByTestId('add-tool-btn')
    addBtn.click()

    const formDialog = await findByTestId('form-dialog')
    expect(formDialog).toBeDefined()

    const formDialogBtn = await findByTestId('form-dialog-btn')

    const titleFormField = await findByTestId('form-field-title')
    const linkFormField = await findByTestId('form-field-link')
    const descriptionFormField = await findByTestId('form-field-description')
    const tagsFormField = await findByTestId('form-field-tags')

    fireEvent.change(titleFormField, {
      target: { value: tool.title }
    })
    expect(titleFormField.value).toEqual(tool.title)

    fireEvent.change(linkFormField, {
      target: { value: tool.link }
    })
    expect(linkFormField.value).toEqual(tool.link)

    fireEvent.change(descriptionFormField, {
      target: { value: tool.description }
    })
    expect(descriptionFormField.value).toEqual(tool.description)

    fireEvent.change(tagsFormField, {
      target: { value: tool.tags }
    })
    expect(tagsFormField.value).toEqual(tool.tags)

    await act(async () => {
      formDialogBtn.click()
      const newTool = await findByText(tool.title)
      expect(newTool).toBeDefined()
    })
  })

  it('should delete a tool when click in remove button and confirm', async () => {
    fetchMock.delete(`glob:${process.env.REACT_APP_API_BASEURL}/*`, {})

    const { findByTestId } = render(<App />)

    const removeBtn = await findByTestId('tool-remove-button')
    expect(removeBtn).toBeDefined()
    removeBtn.click()

    const confirmDialogRemoveBtn = await findByTestId(
      'confirm-dialog-remove-btn'
    )
    expect(confirmDialogRemoveBtn).toBeDefined()

    await act(async () => {
      confirmDialogRemoveBtn.click()
      const emptyToolsList = await findByTestId('tools-empty-list')
      expect(emptyToolsList).toBeDefined()
    })
  })
})
