import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

function Highlight({ content, term }) {
  const regex = new RegExp(`(${term})`, 'gi')
  return !term ? (
    <span data-testid="highlight-empty-term">{content}</span>
  ) : (
    <span data-testid="highlight-content">
      {content
        .split(regex)
        .map((chunk, index) =>
          chunk.toLowerCase() === term.toLowerCase() ? (
            <Mark key={index}>{chunk}</Mark>
          ) : (
            chunk
          )
        )}
    </span>
  )
}

const Mark = styled.mark`
  background-color: yellow;
`

Highlight.propTypes = {
  content: PropTypes.string.isRequired,
  term: PropTypes.string.isRequired
}

export default Highlight
