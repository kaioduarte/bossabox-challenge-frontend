import React from 'react'
import PropTypes from 'prop-types'
import { ListGroup } from 'reactstrap'

import Tool from 'components/Tool'

function ListTools({ handleOpenDialog, searchInTags, searchTerm, tools }) {
  return (
    <ListGroup data-testid="tools-list">
      {tools.map(tool => (
        <Tool
          key={tool.id}
          openRemoveDialog={handleOpenDialog}
          searchInTags={searchInTags}
          searchTerm={searchTerm}
          tool={tool}
        />
      ))}
      {tools.length <= 0 && (
        <h6 className="text-muted text-center" data-testid="tools-empty-list">
          There is no tools registered!
        </h6>
      )}
    </ListGroup>
  )
}

ListTools.defaultProps = {
  open: false,
  searchInTags: false,
  title: ''
}

ListTools.propTypes = {
  handleOpenDialog: PropTypes.func.isRequired,
  tools: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string,
      description: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  searchInTags: PropTypes.bool,
  searchTerm: PropTypes.string
}

export default ListTools
