import React from 'react'

const NoteItem = (props) => {
    const {notes}=props
  return (
    <div className='col-md-3 my-3'>
         <div class="card" >
  
  <div class="card-body">
    <h5 class="card-title">{notes.title}</h5>
    <p class="card-text">{notes.description} </p>
    
  </div>
</div>
    </div>
  )
}

export default NoteItem