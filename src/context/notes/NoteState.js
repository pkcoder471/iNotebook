import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setnotes] = useState(notesInitial)


  const getallNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token') 
      },
    });
    const json = await response.json();
    
    setnotes(json);
  }



  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token') 
      },
      body: JSON.stringify({title,description,tag})
    });
    const json = await response.json();
    console.log(json);
    setnotes(notes.concat(json));
  }

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhYzYzMjYwNGM3MmZiZTZmZDJkMzU0In0sImlhdCI6MTY3Mjg0MzczOH0.a13VKKFe2p6Zs721Dg7rFXmySvA8JrBa80n8SkK4LM8"
      },
    });
    const json = await response.json();
    console.log(json);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setnotes(newNotes);

  }

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhYzYzMjYwNGM3MmZiZTZmZDJkMzU0In0sImlhdCI6MTY3Mjg0MzczOH0.a13VKKFe2p6Zs721Dg7rFXmySvA8JrBa80n8SkK4LM8"
      },
      body: JSON.stringify({title,description,tag})
    });
    const json = await response.json();
    console.log(json);
    let newNotes= JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      if (newNotes[index]._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes);
  }

  


    return (
      <NoteContext.Provider value={{ notes, setnotes, addNote, deleteNote, editNote ,getallNotes}}>
        {props.children}
      </NoteContext.Provider>
    )
  }


export default NoteState