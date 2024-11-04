import React, { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { Controller } from "react-hook-form";

const TextEditor = ({ control, name, placeholder, selectArticleType }) => {
  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false,
      height: 400,
      minHeight: 200,
      placeholder:
        selectArticleType === "edit" ? "" : placeholder || "Start writing...",
    }),
    [placeholder]
  );

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field: { onChange, value = "" } }) => (
        <JoditEditor
          ref={editor}
          value={value || ""}
          config={config}
          tabIndex={1}
          onBlur={onChange}
          onChange={(newContent) => {}}
        />
      )}
    />
  );
};

export default TextEditor;
