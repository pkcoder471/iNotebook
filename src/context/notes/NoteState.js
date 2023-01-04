import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const notesInitial = [
            {
              "_id": "63aeede540d488b9ae593a5a",
              "user": "63ac632604c72fbe6fd2d354",
              "title": "my note",
              "description": "Please wak u early",
              "tag": "personal",
              "createdAt": "2022-12-30T13:55:49.655Z",
              "updatedAt": "2022-12-30T13:55:49.655Z",
              "__v": 0
            },
            {
              "_id": "63b4483b1a7ad2da0b208b67",
              "user": "63ac632604c72fbe6fd2d354",
              "title": "my note",
              "description": "Please wa u early",
              "tag": "personal",
              "createdAt": "2023-01-03T15:22:35.537Z",
              "updatedAt": "2023-01-03T15:22:35.537Z",
              "__v": 0
            },
            {
              "_id": "63b4484f1a7ad2da0b208b6b",
              "user": "63ac632604c72fbe6fd2d354",
              "title": "my note",
              "description": "Please wake up early",
              "tag": "personal",
              "createdAt": "2023-01-03T15:22:55.689Z",
              "updatedAt": "2023-01-03T15:22:55.689Z",
              "__v": 0
            },
            {
              "_id": "63b448681a7ad2da0b208b6f",
              "user": "63ac632604c72fbe6fd2d354",
              "title": "my note",
              "description": "nothing",
              "tag": "personal",
              "createdAt": "2023-01-03T15:23:20.932Z",
              "updatedAt": "2023-01-03T15:23:20.932Z",
              "__v": 0
            },
            {
              "_id": "63aeede540d488b9ae5923a5a",
              "user": "63ac632604c72fbe6fd2d354",
              "title": "my note",
              "description": "Please wak u early",
              "tag": "personal",
              "createdAt": "2022-12-30T13:55:49.655Z",
              "updatedAt": "2022-12-30T13:55:49.655Z",
              "__v": 0
            },
            {
              "_id": "63aeede5403d488b9ae593a5a",
              "user": "63ac632604c72fbe6fd2d354",
              "title": "my note",
              "description": "Please wak u early",
              "tag": "personal",
              "createdAt": "2022-12-30T13:55:49.655Z",
              "updatedAt": "2022-12-30T13:55:49.655Z",
              "__v": 0
            },
          ]
    const [notes, setnotes] = useState(notesInitial)

    const addNote = (title,description,tag) =>{
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

    const deleteNote = (id)=>{
      const newNotes = notes.filter((note)=>{return note._id!==id}); 
      setnotes(newNotes);

    }

    const editNote = (id,title,description,tag)=>{
      for (let index = 0; index < notes.length; index++) {
        if(notes[index]._id===id){    
        notes[index].title = title;
        notes[index].description = description;
        notes[index].tag = tag;
      }
    }
    return (
        <NoteContext.Provider value={{notes,setnotes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState