import React from 'react'
import PropTypes from 'prop-types'
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import { ActionButton } from 'components/ActionButton'
import { StyledModal } from 'components/Modal'

function ConfirmDialog({ deleteTool, onClose, open, title, tool }) {
  return (
    <StyledModal isOpen={open} toggle={onClose}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        Are you sure you want to remove <b>{tool ? tool.title : ''}</b>
      </ModalBody>
      <ModalFooter>
        <ActionButton variant="secondary" onClick={onClose}>
          Cancel
        </ActionButton>
        <ActionButton
          data-testid="confirm-dialog-remove-btn"
          onClick={deleteTool(tool.id)}>
          Yes, remove
        </ActionButton>
      </ModalFooter>
    </StyledModal>
  )
}

ConfirmDialog.defaultProps = {
  open: false,
  title: ''
}

ConfirmDialog.propTypes = {
  deleteTool: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  title: PropTypes.string,
  tool: PropTypes.object.isRequired
}

export default ConfirmDialog
