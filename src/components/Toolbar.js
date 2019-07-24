import React from 'react'
import PropTypes from 'prop-types'

import { Label, Input } from 'reactstrap'
import { ActionButton } from 'components/ActionButton'

function Toolbar({
  handleOpenForm,
  handleSearchTermChange,
  searchInTags,
  searchTerm,
  toggleCheckbox
}) {
  return (
    <div className="d-flex justify-content-between mt-4 mb-3">
      <div className="d-flex align-items-center">
        <div className="mr-2">
          <Input
            onChange={handleSearchTermChange}
            placeholder="Search"
            value={searchTerm}
          />
        </div>
        <div>
          <Label check>
            <input
              checked={searchInTags}
              onChange={toggleCheckbox}
              type="checkbox"
            />{' '}
            search in tags only
          </Label>
        </div>
      </div>
      <div>
        <ActionButton
          data-testid="add-tool-btn"
          color="primary"
          onClick={handleOpenForm}>
          + Add
        </ActionButton>
      </div>
    </div>
  )
}

Toolbar.defaultProps = {
  searchInTags: false,
  searchTerm: ''
}

Toolbar.propTypes = {
  handleOpenForm: PropTypes.func.isRequired,
  handleSearchTermChange: PropTypes.func.isRequired,
  searchInTags: PropTypes.bool,
  searchTerm: PropTypes.string,
  toggleCheckbox: PropTypes.func.isRequired
}

export default Toolbar
