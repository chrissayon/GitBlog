import { useCallback, useMemo, useState } from 'react';

import {
  Editor,
  createEditor,
  Transforms,
} from 'slate';

import {
  Slate,
  Editable,
  withReact,
  DefaultElement,
} from 'slate-react';

import { withHistory } from 'slate-history';

import CodeElement from './CodeElement';

const CustomEditor = () => {
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

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <Editable
        renderElement={renderElement}
        onKeyDown={(event) => {
          if (event.key === '`' && event.ctrlKey) {
            // Prevent the "`" from being inserted by default.
            event.preventDefault();
            // Otherwise, set the currently selected blocks type to "code".
            Transforms.setNodes(
              editor,
              { type: 'code' },
              { match: (n) => Editor.isBlock(editor, n) },
            );
          }
        }}
      />
    </Slate>
  );
};

export default CustomEditor;
