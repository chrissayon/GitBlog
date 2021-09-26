import { useCallback, useMemo, useState } from 'react';

import {
  createEditor,
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

import EditorUtilities from './EditorUtilities';

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
