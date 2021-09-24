import { useCallback, useMemo, useState } from 'react';

import {
  Editor,
  createEditor,
  Transforms,
  Text,
} from 'slate';

import {
  Slate,
  Editable,
  withReact,
  DefaultElement,
} from 'slate-react';

import { withHistory } from 'slate-history';

import CodeElement from './CodeElement';

import { Leaf } from './EditorComponents';

// Define our own custom set of helpers.
const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold === true,
      universal: true,
    });

    return !!match;
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === 'code',
    });

    return !!match;
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true },
    );
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: (n) => Editor.isBlock(editor, n) },
    );
  },
};

const TextEditor = () => {
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const renderElement = useCallback((elementRenderValue) => {
    switch (elementRenderValue.element.type) {
      case 'code':
        return <CodeElement {...elementRenderValue} />;
      default:
        return <DefaultElement {...elementRenderValue} />;
    }
  }, []);

  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          if (!event.ctrlKey) {
            return;
          }

          event.preventDefault();

          switch (event.key) {
            case '`': {
              event.preventDefault();
              CustomEditor.toggleCodeBlock(editor);
              break;
            }

            case 'b': {
              event.preventDefault();
              CustomEditor.toggleBoldMark(editor);
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
