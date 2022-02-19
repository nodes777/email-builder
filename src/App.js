import React, { useRef } from "react";
import testTemplateJson from "./test-template.json";
import EmailEditor from "react-email-editor";

export const App = (props) => {
  const emailEditorRef = useRef(null);

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log("exportHtml", html);
    });
  };

  const saveDesign = () => {
    emailEditorRef.current.editor.saveDesign((design) => {
      console.log("saveDesign", design);
    });
  };

  const onLoad = () => {
    // editor instance is created
    // you can load your template here;
    const templateJson = testTemplateJson;
    emailEditorRef.current.editor.loadDesign(templateJson);
  };

  const onReady = () => {
    // editor is ready
    console.log("onReady");
    console.log(emailEditorRef.current.editor);
  };

  return (
    <div>
      <div>
        <button onClick={exportHtml}>Export HTML</button>
        <button onClick={saveDesign}>Save Design</button>
      </div>

      <EmailEditor
        ref={emailEditorRef}
        onLoad={onLoad}
        onReady={onReady}
        minHeight={"97vh"}
      />
    </div>
  );
};

// render(<App />, document.getElementById("root"));
