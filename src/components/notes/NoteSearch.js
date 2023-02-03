export const NoteSearch = ({ setterFunction }) => {
    return (
        <input
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
            type="text" placeholder="Search note by title" />
    )
}