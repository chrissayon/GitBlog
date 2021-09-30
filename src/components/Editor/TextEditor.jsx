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

import './TextEditor.css';

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

const getBlockStyle = (block) => {
  switch (block.getType()) {
    case 'blockquote':
      return 'blockquote';
    default:
      return null;
  }
};

const StyleButton = ({
  onToggle,
  active,
  label,
  style,
}) => {
  let className = 'controls__styleButton ';
  if (active) {
    className += 'controls__activeButton';
  }

  return (
    <span
      className={className}
      role="button"
      tabIndex="0"
      onMouseDown={(e) => {
        e.preventDefault();
        onToggle(style);
      }}
    >
      {label}
    </span>
  );
};

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
];

const BlockStyleControls = ({
  editorState,
  onToggle,
}) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls = ({
  editorState,
  onToggle,
}) => {
  const currentStyle = editorState.getCurrentInlineStyle();
  return (
    <div className="controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
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
      style={{ border: '1px solid black', minHeight: '6em', cursor: 'text' }}
      onClick={focusEditor}
      onKeyPress={() => {}} // Empty functon to comply with linting
      role="textbox"
      tabIndex="0"
    >
      <BlockStyleControls
        editorState={editorState}
        onToggle={(blockType) => {
          const newState = RichUtils.toggleBlockType(editorState, blockType);
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
