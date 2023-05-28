import React from 'react'
import context from './NotesContext'


const NoteState = (props) => {
    const state={
        "name":"saqib",
        "sem": "7"
    }
  return (
    <context.Provider value={state}>
        {props.children}
    </context.Provider>
  )
}

export default NoteState