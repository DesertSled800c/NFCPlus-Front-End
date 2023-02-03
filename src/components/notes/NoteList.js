import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const NoteList = () => {
    const [notes, setNotes] = useState([])
    const [filteredNotes, setFilteredNotes] = useState([])

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
            if (nfcUserObject.staff) {
                setFilteredNotes(notes)
            } else {
                const myNotes = notes.filter(note => note.userId === nfcUserObject.id)
                setFilteredNotes(myNotes)
            }

        }, [notes]
    )

    return <>
        <h2>Your Notes</h2>

        <article className="notes">
            {
                filteredNotes.map(
                    (note) => {
                        return <section className="note">
                            <header>{note.topic.pointy}{note.noteTitle}
                            <Link to={`/${note.id}/edit`}>
                                <button className="note-edit">Edit</button>
                            </Link>
                                <button className="note-delete">Delete</button>
                            </header>
                        </section>
                    }
                )
            }
        </article>

    </>

}