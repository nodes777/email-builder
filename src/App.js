import React, { useEffect, useRef } from "react";
import EmailEditor from "react-email-editor";
import testTemplateJson from "./saved-templates/hikeLights1Template.json";

//import testTemplateJson from "./test-template.json";
export const App = (props) => {
  const emailEditorRef = useRef(null);

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log("exportHtml", html);

      let link = document.createElement("a");
      // ToLearn: what is createObjectURL and Blob, and octet stream
      link.href = window.URL.createObjectURL(
        new Blob([html], { type: "application/octet-stream" })
      );
      link.download = "email.html";

      document.body.appendChild(link);

      link.click();
      setTimeout(function () {
        window.URL.revokeObjectURL(link);
      }, 200);
    });
  };

  const saveDesign = () => {
    emailEditorRef.current.editor.saveDesign((design) => {
      console.log("saveDesign", design);

      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(
        new Blob([JSON.stringify(design)], { type: "application/json" })
      );
      link.download = "emailDesign.json";

      document.body.appendChild(link);

      link.click();
      setTimeout(function () {
        window.URL.revokeObjectURL(link);
      }, 200);
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
    emailEditorRef.current.editor.addEventListener("keydown", (e) => {
      console.log(e);
      e.preventDefault();
      if ((e.metaKey || e.ctrlKey) && e.code === "KeyS") {
        console.log("fire!");
      }
    });

    // Error: blocked "http://localhost:3000" from accessing a cross-origin frame.
    // emailEditorRef.current.editor.frame.iframe.contentWindow.document.addEventListener(
    //   "keydown",
    //   (e) => {
    //     console.log(e);
    //     e.preventDefault();
    //     if ((e.metaKey || e.ctrlKey) && e.code === "KeyS") {
    //       console.log("fire!");
    //     }
    //   }
    // );
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
