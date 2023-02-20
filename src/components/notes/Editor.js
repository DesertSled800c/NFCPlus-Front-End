import { CLEAR_HISTORY_COMMAND } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import ExampleTheme from "./ExampleTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { createEditor, $getRoot, $getSelection } from 'lexical';
import { useEffect } from "react";


function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const editorConfig = {
  // The editor theme
  theme: ExampleTheme,
  // Handling of errors during update
  onError(error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode
  ]
};

// Whenever the editor state changes (from the parent component) we want to
// update the current editor state.
function UpdateEditorStatePlugin({ initialEditorState }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (initialEditorState != null) {
      const newEditorState = editor.parseEditorState(initialEditorState);
      editor.setEditorState(newEditorState);
      editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);
    }
  }, [editor, initialEditorState]);

  return null;
}

export default function Editor({ handleEditNote, editorState, editableBoolean, userColor }) {
  const editor = createEditor(editorConfig);
  let existingEditorState = undefined;
  if (editorState != null) {
    existingEditorState = editor.parseEditorState(editorState);
  }

  const onChange = (editorState) => {
    editorState.read(() => {
      const root = $getRoot();
      const selection = $getSelection();

      const serializedState = editorState.toJSON();

      if (handleEditNote != null) {
        handleEditNote(serializedState);
      }
    });
  };

  return (
    /* done[1]: Only mark editable as false, if you are in the read view */
    /* Done[2]: When in the read view, how to remove the toolbar from the editor */
    /* done[3]: In EditNote, you need to initialize the note state AND be able to edit and save */
    <LexicalComposer initialConfig={{ ...editorConfig, editorState: existingEditorState, editable: editableBoolean }}>
      <div className="editor-container">
        {
          handleEditNote
            ?
            <ToolbarPlugin />
            :
            ""
        }
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable
              style={{ color: userColor }}
              className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin onChange={onChange} />
          <HistoryPlugin />
          <TreeViewPlugin />
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <UpdateEditorStatePlugin initialEditorState={editorState} />
          <AutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={20} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  );
}
