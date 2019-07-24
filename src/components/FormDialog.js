import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  FormText,
  Label,
  Input
} from 'reactstrap'

import { ActionButton } from 'components/ActionButton'
import { StyledModal } from 'components/Modal'

function FormDialog({ onSubmit, onClose, open, title }) {
  const [formData, setFormData] = useState({
    title: undefined,
    link: undefined,
    description: undefined,
    tags: undefined
  })

  function onChange(event) {
    const { name, value } = event.target

    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
  }

  function _onSubmit(event) {
    event.preventDefault()

    const data = JSON.stringify({
      ...formData,
      tags: formData.tags ? formData.tags.split(' ') : []
    })

    onSubmit(data)
  }

  return (
    <StyledModal data-testid="form-dialog" isOpen={open} toggle={onClose}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <Form onSubmit={_onSubmit}>
          <FormGroup>
            <Label for="title">Tool Name</Label>
            <Input
              data-testid="form-field-title"
              id="title"
              name="title"
              onChange={onChange}
              placeholder="vuttr"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="link">Tool Link</Label>
            <Input
              data-testid="form-field-link"
              id="link"
              name="link"
              onChange={onChange}
              placeholder="https://github.com/kaioduarte/vuttr"
              type="url"
            />
            <FormText>Link must start with http:// or https://</FormText>
          </FormGroup>
          <FormGroup>
            <Label for="description">Tool Description</Label>
            <Input
              data-testid="form-field-description"
              name="description"
              onChange={onChange}
              type="textarea"
              placeholder="App to manage tools"
            />
          </FormGroup>
          <FormGroup>
            <Label for="tags">Tags</Label>
            <Input
              data-testid="form-field-tags"
              name="tags"
              onChange={onChange}
              placeholder="Tags must be separated by space"
            />
          </FormGroup>
          <ModalFooter>
            <ActionButton data-testid="form-dialog-btn" type="submit">
              Add tool
            </ActionButton>
          </ModalFooter>
        </Form>
      </ModalBody>
    </StyledModal>
  )
}

FormDialog.defaultProps = {
  open: false,
  title: ''
}

FormDialog.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  title: PropTypes.string
}

export default FormDialog
