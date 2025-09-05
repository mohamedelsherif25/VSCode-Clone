import { useSelector } from "react-redux";
import MonacoEditor from "./MonacoEditor";
import OpenedFilesBar from "./OpenedFilesBar";
import { RootState } from "../app/store";

const Preview = () => {
  const {
    clickedFile: { fileContent, activeTabId },
  } = useSelector(({ tree }: RootState) => tree);

  return (
    <>
      <OpenedFilesBar />
      {activeTabId && (
        <MonacoEditor content={fileContent} fileId={activeTabId} />
      )}
    </>
  );
};

export default Preview;
