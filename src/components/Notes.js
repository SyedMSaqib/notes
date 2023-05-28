import React from 'react'
import { useContext } from "react"
import NotesContext from "../context/notes/NotesContext"
import NoteItem from './NoteItem'


const Notes = () => {
    const {notes,setNotes}=useContext(NotesContext)

  return (
    <div className='row'>
    <h2 className="my-3">Your notes</h2>
       {
        notes.map((data)=>{
            return <NoteItem key={data._id} notes={data}/>
        })
       }

        </div>
  )
}

export default Notes