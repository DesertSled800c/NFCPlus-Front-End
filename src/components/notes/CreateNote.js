import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChromePicker } from "react-color";
import Editor from "./Editor";

import "./editor.css";
import { $getRoot, $getSelection } from "lexical";

export const CreateNote = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [color, setColor] = useState("#237d6b");
  const [showColorPicker, setShowColorPicker] = useState(false);

  // const editorGuts = (editor.getEditorState) => {
  //     editor.getEditorState.read(() => {
  //       // Read the contents of the EditorState here.
  //       const root = $getRoot();
  //       const selection = $getSelection();

  //       console.log(root, selection);
  //       console.log("this is the text", root.__cachedText);

  //     });
  //   }

  const [note, update] = useState({
    noteTitle: "",
    topicId: 0,
    body: "",
    color: `${color}`,
  });

  const [editorState, updateEditorState] = useState(null);

  const localNfcUser = localStorage.getItem("nfc_user");
  const nfcUserObject = JSON.parse(localNfcUser);

  useEffect(() => {
    fetch(`http://localhost:8088/topics`)
      .then((res) => res.json())
      .then((topicsArr) => {
        setTopics(topicsArr);
      });
  }, []);

  const handleSaveButtonClick = (event) => {
    // TODO: Save editor state as JSON on the server.
    console.log(editorState);
    return;

    const noteToSendToAPI = {
      userId: nfcUserObject.id,
      noteTitle: note.noteTitle,
      topicId: note.topicId,
      body: note.body,
      color: note.color,
    };

    return fetch(`http://localhost:8088/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteToSendToAPI),
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/");
      });
  };

  const handleEditNote = (serializedState) => {
    updateEditorState(serializedState);
  };

  return (
    <form className="noteForm create-form">
      <h2 className="noteForm__create">New Note</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title"></label>
          <input
            type="text"
            required
            autoFocus
            className="form-title form-control"
            placeholder="Note Name"
            value={note.noteTitle}
            onChange={(e) => {
              const copy = { ...note };
              copy.noteTitle = e.target.value;
              update(copy);
            }}
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
                  checked={note.topicId === topic.id}
                  onChange={(e) => {
                    const copy = { ...note };
                    copy.topicId = parseInt(e.target.value);
                    update(copy);
                  }}
                />
              </label>
              {topic.topic}
            </div>
          );
        })}
      </fieldset>
      <div className="pickers">
        <button
          onClick={() =>
            setShowColorPicker((showColorPicker) => !showColorPicker)
          }
        >
          {showColorPicker ? " Close color picker" : "Pick a color"}
        </button>
        {showColorPicker && (
          <ChromePicker
            color={color}
            onChange={(updatedColor) => setColor(updatedColor.hex)}
          />
        )}
        <h2>You picked {color}</h2>
      </div>
      <div>
        <Editor handleEditNote={handleEditNote} />
      </div>
      {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="body"></label>
                    <textarea
                        rows="3"
                        cols="50"
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Note Body"
                        style={{ color: `${color}` }}
                        value={note.body}
                        onChange={
                            (e) => {
                                const copy = { ...note }
                                copy.body = e.target.value
                                update(copy)
                            }
                        }
                    ></textarea>
                </div>
            </fieldset> */}
      <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn-primary"
      >
        🆂🅰🆅🅴
      </button>
    </form>
  );
};
