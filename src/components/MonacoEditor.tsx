import { useRef } from "react";
import { Editor } from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { updateFileContentAction } from "../app/features/fileTreeSlice";
import { useTheme } from "../contexts/ThemeContext";

interface IProps {
  content: string | undefined;
  language?: string;
  fileId: string;
}

const MonacoEditor = ({ content, language = "javascript", fileId }: IProps) => {
  const dispatch = useDispatch();
  const editorRef = useRef<any>(null);
  const { theme } = useTheme();

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;

    // Configure editor options
    editor.updateOptions({
      fontSize: 14,
      lineNumbers: "on",
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 2,
      insertSpaces: true,
      wordWrap: "on",
      theme: theme === "dark" ? "vs-dark" : "vs",
    });

    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      handleSave();
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF, () => {
      editor.getAction("actions.find").run();
    });

    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyF,
      () => {
        editor.getAction("editor.action.startFindReplaceAction").run();
      }
    );
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined && fileId) {
      dispatch(updateFileContentAction({ id: fileId, content: value }));
    }
  };

  const handleSave = () => {
    // This will trigger file save logic
    console.log("Saving file:", fileId);
    // You can add actual save logic here, like sending to a backend
  };

  const getLanguageFromFilename = (filename: string): string => {
    const extension = filename.split(".").pop()?.toLowerCase();
    const languageMap: Record<string, string> = {
      js: "javascript",
      jsx: "javascript",
      ts: "typescript",
      tsx: "typescript",
      html: "html",
      css: "css",
      scss: "scss",
      json: "json",
      md: "markdown",
      py: "python",
      java: "java",
      cpp: "cpp",
      c: "c",
      php: "php",
      rb: "ruby",
      go: "go",
      rs: "rust",
      xml: "xml",
      yaml: "yaml",
      yml: "yaml",
    };
    return languageMap[extension || ""] || "plaintext";
  };

  // Get language from filename if not provided
  const { clickedFile } = useSelector(({ tree }: RootState) => tree);
  const detectedLanguage =
    language === "javascript" && clickedFile.filename
      ? getLanguageFromFilename(clickedFile.filename)
      : language;

  return (
    <div className="h-full w-full">
      <Editor
        height="100vh"
        language={detectedLanguage}
        value={content || ""}
        theme={theme === "dark" ? "vs-dark" : "vs"}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        options={{
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false,
          cursorStyle: "line",
          automaticLayout: true,
          glyphMargin: true,
          folding: true,
          lineNumbersMinChars: 3,
          scrollBeyondLastLine: false,
          wordWrap: "on",
          wrappingIndent: "indent",
          renderWhitespace: "selection",
          contextmenu: true,
          mouseWheelZoom: true,
          multiCursorModifier: "ctrlCmd",
          accessibilitySupport: "auto",
        }}
      />
    </div>
  );
};

export default MonacoEditor;
