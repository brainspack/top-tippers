import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const TextEditor = ({ placeholder, content, setContent }) => {
  const editor = useRef(null);
  //   const [content, setContent] = useState("");
  //   console.log(content, "CONTENT");
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
    }),
    [placeholder]
  );

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1}
      onChange={(newContent) => setContent(newContent)}
    />
  );
};
export default TextEditor;
