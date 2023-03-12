import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

interface CodeMirrorProps {
  value?: string;
  onChange?: (data: string) => void;
}

export function MyCodeMirror({
  value,
  onChange: handleChange,
}: CodeMirrorProps) {
  const onChange = React.useCallback((value: string) => {
    handleChange && handleChange(value);
  }, []);
  return (
    <div>
      <CodeMirror
        value={value}
        height="400px"
        theme="dark"
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
      />
    </div>
  );
}
