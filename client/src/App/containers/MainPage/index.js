import React, { useState } from 'react';
import createNoteMutation from './mutations/createNote';
import deleteNoteMutation from './mutations/deleteNote';
import updateNoteMutation from './mutations/updateNote';

const MainPage = ({ notes }) => {
    const [newNote, setNewNote] = useState('');
    const [noteContentBeingUpdated, setNoteContentBeingUpdated] = useState('');
    const [noteIdBeingUpdated, setNoteIdBeingUpdated] = useState('');

    return (
        <div className="container">
            <header>Notes</header>
            <ul>
                {notes.map(v => {
                    const isBeingUpdated = noteIdBeingUpdated === v._id;

                    return (
                        <div key={v._id} className="note-holder">
                            {isBeingUpdated ? (
                                <li>
                                    <input 
                                        autoFocus
                                        value={noteContentBeingUpdated}
                                        onChange={e => setNoteContentBeingUpdated(e.target.value)}
                                    />
                                </li>
                            ) : (
                                <li>{v.content}</li>
                            )}
                            <div>
                                <button 
                                    onClick={() => {
                                        if (isBeingUpdated) {
                                            updateNoteMutation(v._id, noteContentBeingUpdated);
                                            setNoteIdBeingUpdated('');
                                            setNoteContentBeingUpdated('');
                                        } else {
                                            setNoteIdBeingUpdated(v._id);
                                            setNoteContentBeingUpdated(v.content);
                                        }
                                    }}
                                >Update</button>
                                <button onClick={() => deleteNoteMutation(v._id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </ul>
            <footer>
                <input
                    value={newNote}
                    onChange={e => setNewNote(e.target.value)}
                    placeholder='Add a note'
                ></input>
                <button
                    onClick={() => {
                        if (newNote) {
                            createNoteMutation(newNote);
                            setNewNote('');
                        }
                    }}
                >Create</button>
            </footer>
        </div>
    );
};

export default MainPage;