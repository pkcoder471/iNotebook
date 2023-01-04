import React from 'react'

const NoteItem = (props) => {
    let {note} = props;
    return (
        <div className='col-md-3 my-2'>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                    <h5 className="card-title mx-1">{note.title}</h5>
                    <i className="fa-solid fa-pen-to-square mx-1"></i>
                    <i className="fa-solid fa-trash-can mx-1"></i>
                    </div>
                    <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem