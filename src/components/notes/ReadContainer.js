
import { NoteList } from "./NoteList"
import { ReadNote } from "./ReadNote"
import "./notes.css"

export const ReadContainer = () => {
    return (
        <>
            <div className="read-container">
                <NoteList />
                <ReadNote/>
            </div>
        </>
    )
}