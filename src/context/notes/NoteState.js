import React, { useState } from 'react'
import context from './NotesContext'


const NoteState = (props) => {
    const notesDb=[{
        _id: "646e56d65d8f7be3f4a89ccd",
        user: "646e56c35d8f7be3f4a89ccb",
        title: "Name",
        description: " Hello, my name is Saqib",
        tag: "personal",
        date: "1684952790028",
        __v: 0
    }
        ,
    {
        "_id": "6471c36673b2389cecbfa3cd",
        "user": "646e56c35d8f7be3f4a89ccb",
        "title": "Name",
        "description": " Hello, my name is Ali",
        "tag": "personal",
        "date": "1685177190279",
        "__v": 0
      },
      {
        _id: "646e56d65d8f7be3f4a89ccd",
        user: "646e56c35d8f7be3f4a89ccb",
        title: "Name",
        description: " Hello, my name is Saqib",
        tag: "personal",
        date: "1684952790028",
        __v: 0
    }
        ,
        {
            _id: "646e56d65d8f7be3f4a89ccd",
            user: "646e56c35d8f7be3f4a89ccb",
            title: "Name",
            description: " Hello, my name is Saqib",
            tag: "personal",
            date: "1684952790028",
            __v: 0
        }
            ,
            {
                _id: "646e56d65d8f7be3f4a89ccd",
                user: "646e56c35d8f7be3f4a89ccb",
                title: "Name",
                description: " Hello, my name is Saqib",
                tag: "personal",
                date: "1684952790028",
                __v: 0
            }
                
    
    ]
    
      const [notes, setnotes] = useState(notesDb)
  return (
    <context.Provider value={{notes,setnotes}}>
        {props.children}
    </context.Provider>
  )
}

export default NoteState