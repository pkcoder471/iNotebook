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
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhYzYzMjYwNGM3MmZiZTZmZDJkMzU0In0sImlhdCI6MTY3MjQwNDczN30.b7tVXRH9poV3bQEpjCEHdcNLKY2YF-I0LOygDflkGLI'
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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhYzYzMjYwNGM3MmZiZTZmZDJkMzU0In0sImlhdCI6MTY3Mjg0MzczOH0.a13VKKFe2p6Zs721Dg7rFXmySvA8JrBa80n8SkK4LM8"
      },
      body: JSON.stringify(title,description,tag)
    });
    const json = response.json();
    const newNote = {
      "_id": "63aeede5403d488b9ae593a5a",
      "user": "63ac632604c72fbe6fd2d354",
      "title": title,
      "description": description,
      "tag": tag,
      "createdAt": "2022-12-30T13:55:49.655Z",
      "updatedAt": "2022-12-30T13:55:49.655Z",
      "__v": 0
    }
    setnotes(notes.concat(newNote));
  }

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => { return note._id !== id });
    setnotes(newNotes);

  }

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/63aef5262e4da52e2103808a`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhYzYzMjYwNGM3MmZiZTZmZDJkMzU0In0sImlhdCI6MTY3Mjg0MzczOH0.a13VKKFe2p6Zs721Dg7rFXmySvA8JrBa80n8SkK4LM8"
      },
      body: JSON.stringify(title,description,tag)
    });
    const json = response.json();

    for (let index = 0; index < notes.length; index++) {
      if (notes[index]._id === id) {
        notes[index].title = title;
        notes[index].description = description;
        notes[index].tag = tag;
      }
    }
  }
    return (
      <NoteContext.Provider value={{ notes, setnotes, addNote, deleteNote, editNote ,getallNotes}}>
        {props.children}
      </NoteContext.Provider>
    )
  }


export default NoteState