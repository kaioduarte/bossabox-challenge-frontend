import React, { useCallback, useEffect, useState } from 'react'

import ConfirmDialog from 'components/ConfirmDialog'
import FormDialog from 'components/FormDialog'
import ListTools from 'components/ListTools'
import Toolbar from 'components/Toolbar'

function App() {
  const [tools, setTools] = useState([])
  const [isDialogOpen, setDialogState] = useState(false)
  const [isFormOpen, setFormState] = useState(false)
  const [tool, setTool] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [searchInTags, setSearchInTags] = useState(false)

  const getTools = useCallback(
    (term = searchTerm) => {
      const query = searchInTags ? 'tags_like' : 'q'

      fetch(`${process.env.REACT_APP_API_BASEURL}/?${query}=${term}`)
        .then(res => res.json())
        .then(res => setTools(res))
    },
    [searchInTags, searchTerm]
  )

  useEffect(() => {
    getTools()
  }, [getTools])

  function handleOpenDialog(tool) {
    return () => {
      setDialogState(true)
      setTool(tool)
    }
  }

  function handleOpenForm() {
    setFormState(true)
  }

  function handleClose(dialog) {
    return () => dialog(false)
  }

  function deleteTool(id) {
    return () => {
      fetch(`${process.env.REACT_APP_API_BASEURL}/${id}`, {
        method: 'delete'
      }).then(() => {
        setTools(tools.filter(tool => tool.id !== id))
        setTool({})
        setDialogState(false)
      })
    }
  }

  function addTool(body) {
    fetch(process.env.REACT_APP_API_BASEURL, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        setTools([res, ...tools])
        setTool({})
        setFormState(false)
      })
  }

  function handleSearchTermChange(e) {
    setSearchTerm(e.target.value)
    getTools(e.target.value)
  }

  function toggleCheckbox() {
    setSearchInTags(!searchInTags)
  }

  return (
    <main className="mx-auto p-4" style={{ maxWidth: '60%' }}>
      <ConfirmDialog
        deleteTool={deleteTool}
        onClose={handleClose(setDialogState)}
        open={isDialogOpen}
        title="Remove tool"
        tool={tool}
      />

      <FormDialog
        onClose={handleClose(setFormState)}
        onSubmit={addTool}
        open={isFormOpen}
        title="Add new tool"
      />

      <h1>VUTTR</h1>
      <h2>Very Useful Tools to Remember</h2>
      <div>
        <Toolbar
          handleOpenForm={handleOpenForm}
          handleSearchTermChange={handleSearchTermChange}
          searchInTags={searchInTags}
          searchTerm={searchTerm}
          toggleCheckbox={toggleCheckbox}
        />
        <ListTools
          handleOpenDialog={handleOpenDialog}
          searchInTags={searchInTags}
          searchTerm={searchTerm}
          tools={tools}
        />
      </div>
    </main>
  )
}

export default App
