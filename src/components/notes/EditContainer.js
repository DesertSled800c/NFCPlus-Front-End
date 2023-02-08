import { EditNote } from "./EditNote"
import { NoteList } from "./NoteList"
import "./notes.css"

export const EditContainer = () => {
    return (
        <>
            <div className="edit-container">
                <NoteList />
                <EditNote/>
            </div>
        </>
    )
}