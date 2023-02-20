import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChromePicker } from "react-color"
import Editor from "./Editor"
import "./editor.css"

export const CreateNote = () => {

    const navigate = useNavigate()
    const [topics, setTopics] = useState([])
    const [color, setColor] = useState('#237d6b')
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [note, update] = useState({
        noteTitle: "",
        topicId: 3,
        color: "",
    })
    const [editorState, updateEditorState] = useState(null);
    const localNfcUser = localStorage.getItem("nfc_user")
    const nfcUserObject = JSON.parse(localNfcUser)

    useEffect(() => {
        fetch(`http://localhost:8088/topics`)
            .then(res => res.json())
            .then((topicsArr) => {
                setTopics(topicsArr)
            })
    }, []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        const noteToSendToAPI = {
            userId: nfcUserObject.id,
            noteTitle: note.noteTitle,
            topicId: note.topicId,
            color,
            editorState,
        }

        return fetch(`http://localhost:8088/notes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(noteToSendToAPI)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/")
            })

    }

    const handleEditNote = (serializedState) => {
        updateEditorState(serializedState);
    };

    return (
        <form onSubmit={(event) => event.preventDefault()} className="noteForm create-form">
            <h2 className="noteForm__create">New Note</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title"></label>
                    <input
                        type="text"
                        className="form-title form-control"
                        placeholder="Note Name"
                        value={note.noteTitle}
                        onChange={
                            (e) => {
                                const copy = { ...note }
                                copy.noteTitle = e.target.value
                                update(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                {topics.map((topic) => {
                    return (
                        <div className="radio" key={topic.id}>
                            <label htmlFor="topicId">
                                <input
                                    type="radio"
                                    value={topic.id}
                                    checked={note.topicId === topic.id}
                                    onChange={
                                        (e) => {
                                            const copy = { ...note }
                                            copy.topicId = parseInt(e.target.value)
                                            update(copy)
                                        }
                                    }
                                />
                            </label>
                            {topic.topic}
                        </div>
                    )
                })}
            </fieldset>
            <div className="pickers">
                <button
                    type="button"
                    onClick={() => setShowColorPicker(showColorPicker => !showColorPicker)}>
                    <div
                        className="color--box"
                        style={{ backgroundColor: color }}
                    ></div>
                </button>
                {showColorPicker && (
                    <ChromePicker
                        color={color}
                        onChange={(updatedColor) => { setColor(updatedColor.hex) }}
                    />
                )}
            </div>
            <div>
                <fieldset>
                    <Editor
                        userColor={color}
                        editableBoolean={true}
                        handleEditNote={handleEditNote} />
                </fieldset>
            </div>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                🆂🅰🆅🅴
            </button>
        </form>
    )
}