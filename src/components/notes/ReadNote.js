import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const ReadNote = () => {

    const [read, setRead] = useState({
        noteTitle: "",
        body: "",
    })

    const { noteId } = useParams()


    useEffect(() => {
        fetch(`http://localhost:8088/notes/${noteId}`)
            .then(res => res.json())
            .then((data) => {
                setRead(data)
            })
    }, [noteId])

    return (
        <>
        <section className="read-note">
            <h2 className="read-title">{read.noteTitle}</h2>
            <p className="read-body">{read.body}</p>
        </section>
        </>
    )

}
