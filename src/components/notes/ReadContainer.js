
import { NoteList } from "./NoteList"
import { ReadNote } from "./ReadNote"
import "./notes.css"

export const ReadContainer = () => {
    return (
        <>
            <div className="app">
                <NoteList />
                <ReadNote/>
            </div>
        </>
    )
}