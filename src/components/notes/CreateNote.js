import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const CreateNote = () => {

    const navigate = useNavigate()
    const [topics, setTopics] = useState([])
    const [note, update] = useState({
        noteTitle: "",
        topicId: 0,
        body: "",
    })

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


        const noteToSendToAPI = {
            userId: nfcUserObject.id,
            noteTitle: note.noteTitle,
            topicId: note.topicId,
            body: note.body,

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

    return (
        <form className="noteForm">
            <h2 className="noteForm__title">New Note</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
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
                        <div className="radio">
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
            <fieldset>
                <div className="form-group">
                    <label htmlFor="body">Note:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Note Body"
                        value={note.body}
                        onChange={
                            (e) => {
                                const copy = { ...note }
                                copy.body = e.target.value
                                update(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Note
            </button>
        </form>
    )
}