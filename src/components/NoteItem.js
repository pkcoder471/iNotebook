import React from 'react'

const NoteItem = (props) => {
    let {note} = props;
    return (
        <div className='col-md-3'>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{note.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{note.tag}</h6>
                    <p class="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem