import {
  useState,
  useRef,
  useCallback,
} from 'react';

import {
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';

import { InlineStyleControls, BlockStyleControls } from './Toolbar';

import './TextEditor.css';

const getBlockStyle = (block) => {
  switch (block.getType()) {
    case 'blockquote':
      return 'blockquote';
    default:
      return null;
  }
};

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

export default function MyEditor() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const editor = useRef(null);

  const focusEditor = () => {
    editor.current.focus();
  };

  const handleKeyCommand = useCallback(
    (command, localEditorState) => {
      const newState = RichUtils.handleKeyCommand(localEditorState, command);

      if (newState) {
        setEditorState(newState);
        return 'handled';
      }

      return 'not-handled';
    },
    [editorState, setEditorState],
  );

  return (
    <div
      className="textEditor"
      onClick={focusEditor}
      onKeyPress={() => {}} // Empty functon to comply with linting
      role="textbox"
      tabIndex="0"
    >
      <div className="textEditor__toolbar">
        <div>
          <BlockStyleControls
            editorState={editorState}
            onToggle={(blockType) => {
              const newState = RichUtils.toggleBlockType(
                editorState,
                blockType,
              );
              setEditorState(newState);
            }}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={(inlineStyle) => {
              const newState = RichUtils.toggleInlineStyle(
                editorState,
                inlineStyle,
              );
              setEditorState(newState);
            }}
          />
        </div>
        <button
          type="button"
        >
          Save
        </button>
      </div>
      <hr />
      <Editor
        blockStyleFn={getBlockStyle}
        ref={editor}
        customStyleMap={styleMap}
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
        placeholder="Write something!"
      />
    </div>
  );
}
