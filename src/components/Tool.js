import React from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from 'reactstrap'

import Highlight from 'components/Highlight'

function Tool({ openRemoveDialog, searchInTags, searchTerm, tool }) {
  return (
    <ListGroupItem className="mb-2">
      <div className="d-flex align-items-center justify-content-between">
        <ListGroupItemHeading
          data-testid="tool-link"
          href={tool.link || '#'}
          tag="a">
          <Highlight
            content={tool.title}
            term={searchInTags ? '' : searchTerm}
          />
        </ListGroupItemHeading>
        <Button
          color="link"
          data-testid="tool-remove-button"
          onClick={openRemoveDialog(tool)}>
          &times; remove
        </Button>
      </div>
      <ListGroupItemText data-testid="tool-description">
        {tool.description}
      </ListGroupItemText>
      <div data-testid="tool-tags">
        {tool.tags.map((tag, index) => (
          <b key={index}>
            #<Highlight content={tag} term={searchTerm} />{' '}
          </b>
        ))}
      </div>
    </ListGroupItem>
  )
}

Tool.defaultProps = {
  searchTerm: '',
  searchInTags: false
}

Tool.propTypes = {
  openRemoveDialog: PropTypes.func.isRequired,
  searchInTags: PropTypes.bool,
  searchTerm: PropTypes.string,
  tool: PropTypes.shape({
    link: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
}

export default Tool
