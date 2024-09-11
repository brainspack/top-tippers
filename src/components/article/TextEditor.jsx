import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const TextEditor = ({ placeholder, content, setContent }) => {
  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false,
      height: 400,
      minHeight: 200,
      placeholder: placeholder || "Start writing...",
    }),
    [placeholder]
  );

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1}
      onBlur={(newContent) => setContent(newContent)}
      onChange={(newContent) => {}}
    />
  );
};
export default TextEditor;
