import React from 'react'


const NoteItem = (props) => {
    const {notes}=props
  return (
    <div className='col-md-3 my-3'>
         <div className="card" >
  
  <div className="card-body">
    <h5 className="card-title">{notes.title}</h5>
    <p className="card-text">{notes.description} </p>
    <i className="fa-solid fa-trash-can float-right mx-3 "></i>
    <i className="fa-solid fa-pen mx-3"></i>
    
    
  </div>
</div>
    </div>
  )
}

export default NoteItem