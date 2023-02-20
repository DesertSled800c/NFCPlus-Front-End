import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Editor from "./Editor"

export const ReadNote = () => {

    const [read, setRead] = useState(null);
    const { noteId } = useParams()

    useEffect(() => {
        fetch(`http://localhost:8088/notes/${noteId}`)
            .then(res => res.json())
            .then((data) => {
                setRead(data)
            })
    }, [noteId])

    if (read == null) {
        return null;
    }

    return (
        <div>
            <section className="read-note">
                <h2 className="read-title">{read.noteTitle}</h2>
            </section>
            <Editor
                userColor={read.color}
                editorState={read.editorState}
                editableBoolean={false}
            />
        </div>
    )
}
