import { CreateNote } from "./CreateNote"
import { NoteList } from "./NoteList"
import "./notes.css"

export const HomeContainer = () => {
    return (
        <>
            <div className="app">
                <NoteList />
                <CreateNote />
            </div>
        </>
    )
}