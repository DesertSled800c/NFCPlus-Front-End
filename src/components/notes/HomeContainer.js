import { CreateNote } from "./CreateNote"
import { NoteList } from "./NoteList"
import "./notes.css"

export const HomeContainer = () => {
    return (
        <>
            <div className="home-container">
                <NoteList />
                <CreateNote />
            </div>
        </>
    )
}