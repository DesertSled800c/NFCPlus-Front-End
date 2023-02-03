import { Outlet, Route, Routes } from "react-router-dom"
import { HomeContainer } from "../notes/HomeContainer"
import { EditContainer } from "../notes/EditContainer"
import { ReadContainer } from "../notes/ReadContainer"


export const CustomerViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>

                    <Outlet />
                </>
            }>
                <Route path="/" element={<HomeContainer />} />
                <Route path="/:noteId/edit" element={<EditContainer />} />
                <Route path="/:noteId/read" element={<ReadContainer />} />
            </Route>
        </Routes>
    )
}