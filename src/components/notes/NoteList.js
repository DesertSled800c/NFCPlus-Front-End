import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const NoteList = () => {
    const [notes, setNotes] = useState([])
    const [filteredNotes, setFilteredNotes] = useState([])
    const [deleting, isDeleting] = useState(false)

    const navigate = useNavigate()
    const localNfcUser = localStorage.getItem("nfc_user")
    const nfcUserObject = JSON.parse(localNfcUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/notes?_expand=topic&_sort=topicId`)
                .then(res => res.json())
                .then((noteArr) => {
                    setNotes(noteArr)
                })
        }, []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/notes?_expand=topic&_sort=topicId`)
                .then(res => res.json())
                .then((noteArr) => {
                    setNotes(noteArr)
                })
        }, [deleting]
    )


    useEffect(
        () => {
            if (nfcUserObject.staff) {
                setFilteredNotes(notes)
            } else {
                const myNotes = notes.filter(note => note.userId === nfcUserObject.id)
                setFilteredNotes(myNotes)
            }

        }, [notes]
    )

    const deleteButton = (note) => {
        if (window.confirm(`Are you sure you want to DELETE this note?`)) {
            isDeleting(true)
            return fetch(`http://localhost:8088/notes/${note}`, {
                method: "DELETE"
            })
        } else {
            isDeleting(false)
        }
    }

    return <>
        <h2>Your Notes</h2>

        <article className="notes">
            {
                filteredNotes.map(
                    (note) => {
                        return <section className="note">
                            <header>{note.topic.pointy}
                                <Link to={`/${note.id}/read`}
                                    className="note-read">
                                    {note.noteTitle}
                                </Link>
                                <Link to={`/${note.id}/edit`}>
                                    <button className="note-edit">
                                        Edit
                                    </button>
                                </Link>
                                <button className="note-delete"
                                    type="submit"
                                    onClick={(clickEvent) => deleteButton(note.id)}>
                                    Delete
                                </button>
                            </header>
                        </section>
                    }
                )
            }
        </article>
    </>

}