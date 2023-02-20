import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ChromePicker } from "react-color"
import Editor from "./Editor"

export const EditNote = () => {

    const [topics, setTopics] = useState([])
    const [editorState, updateEditorState] = useState(null);
    const [notes, update] = useState(null)
    const [showColorPicker, setShowColorPicker] = useState(false)
    const navigate = useNavigate()
    const { noteId } = useParams()
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

    useEffect(() => {
        fetch(`http://localhost:8088/notes/${noteId}`)
            .then(res => res.json())
            .then((data) => {
                update(data)
            })
    }, [noteId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        const noteToSendToAPI = {
            userId: nfcUserObject.id,
            noteTitle: notes.noteTitle,
            topicId: notes.topicId,
            color: notes.color,
            editorState,
        }

        return fetch(`http://localhost:8088/notes/${notes.id}`, {
            method: "PUT",
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

    if (notes == null) {
        return null;
    }

    return (
        <form onSubmit={(event) => event.preventDefault()} className="noteForm create-form">
            <h2 className="noteForm__edit">Edit Note</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title"></label>
                    <input
                        type="text"
                        className="form-control form-title"
                        placeholder="Note Name"
                        value={notes.noteTitle}
                        onChange={
                            (e) => {
                                const copy = { ...notes }
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
                                    checked={notes.topicId === topic.id}
                                    onChange={
                                        (e) => {
                                            const copy = { ...notes }
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
                        style={{ backgroundColor: notes.color }}
                    ></div>
                </button>
                {showColorPicker && (
                    <ChromePicker
                        color={notes.color}
                        onChange={updatedColor => update((colorUpdate) => ({
                            ...colorUpdate,
                            color: updatedColor.hex,
                        }))}
                    />
                )}
            </div>
            <fieldset>
                <div>
                    <Editor
                        userColor={notes.color}
                        handleEditNote={handleEditNote}
                        editorState={notes.editorState}
                        editableBoolean={true}
                    />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                🆂🅰🆅🅴
            </button>
        </form>
    )
}