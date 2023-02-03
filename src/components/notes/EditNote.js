import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const EditNote = () => {

    const [topics, setTopics] = useState([])
    const [notes, update] = useState({
        noteTitle: "",
        topicId: 0,
        body: "",
    })

    const navigate = useNavigate()
    const { noteId } = useParams()

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


        return fetch(`http://localhost:8088/notes/${notes.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(notes)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/")
            })

    }

    return (
        <form className="noteForm">
            <h2 className="noteForm__title">Edit Note</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
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
                        <div className="radio">
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
            <fieldset>
                <div className="form-group">
                    <label htmlFor="body">Note:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Note Body"
                        value={notes.body}
                        onChange={
                            (e) => {
                                const copy = { ...notes }
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
                Edit Note
            </button>
        </form>
    )
}