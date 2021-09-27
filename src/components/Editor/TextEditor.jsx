import { useCallback, useMemo, useState } from 'react';

import {
  createEditor,
} from 'slate';

import {
  Slate,
  Editable,

  withReact,
} from 'slate-react';

import { withHistory } from 'slate-history';

import { renderElementNoCallback, renderLeafNoCallback } from './EditorComponents';
import EditorUtilities from './EditorUtilities';
import './TextEditor.css';
import { Toolbar, MarkButton, BlockButton } from './Toolbar';

const TextEditor = () => {
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const renderElement = useCallback(renderElementNoCallback, []);
  const renderLeaf = useCallback(renderLeafNoCallback, []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <Toolbar>
        <MarkButton format="bold" icon="format_bold" />
        <MarkButton format="italic" icon="format_italic" />
        <MarkButton format="underline" icon="format_underlined" />
        <MarkButton format="code" icon="code" />
        <BlockButton format="heading-one" icon="looks_one" />
        <BlockButton format="heading-two" icon="looks_two" />
        <BlockButton format="block-quote" icon="format_quote" />
        <BlockButton format="numbered-list" icon="format_list_numbered" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" />
      </Toolbar>
      <Editable
        className="editor__wrapper"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          if (!event.ctrlKey) {
            return;
          }

          event.preventDefault();

          switch (event.key) {
            case '`': {
              EditorUtilities.toggleCodeBlock(editor);
              break;
            }

            case 'b': {
              EditorUtilities.toggleBoldMark(editor);
              break;
            }

            default: {
              break;
            }
          }
        }}
      />
    </Slate>
  );
};

export default TextEditor;
