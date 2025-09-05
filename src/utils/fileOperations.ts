import { v4 as uuid } from "uuid";
import { IFile } from "../interfaces";

export const createNewFile = (
  _parentId: string,
  name: string,
  isFolder: boolean = false
): IFile => {
  return {
    id: uuid(),
    name,
    isFolder,
    content: isFolder ? undefined : "",
    children: isFolder ? [] : undefined,
    isEdited: false,
    isPinned: false,
  };
};

export const findFileById = (
  fileTree: IFile,
  targetId: string
): IFile | null => {
  if (fileTree.id === targetId) {
    return fileTree;
  }

  if (fileTree.children) {
    for (const child of fileTree.children) {
      const found = findFileById(child, targetId);
      if (found) return found;
    }
  }

  return null;
};

export const findParentOfFile = (
  fileTree: IFile,
  targetId: string
): IFile | null => {
  if (fileTree.children) {
    for (const child of fileTree.children) {
      if (child.id === targetId) {
        return fileTree;
      }
      const found = findParentOfFile(child, targetId);
      if (found) return found;
    }
  }

  return null;
};

export const addFileToTree = (
  fileTree: IFile,
  parentId: string,
  newFile: IFile
): IFile => {
  if (fileTree.id === parentId) {
    return {
      ...fileTree,
      children: [...(fileTree.children || []), newFile],
    };
  }

  if (fileTree.children) {
    return {
      ...fileTree,
      children: fileTree.children.map((child) =>
        addFileToTree(child, parentId, newFile)
      ),
    };
  }

  return fileTree;
};

export const removeFileFromTree = (
  fileTree: IFile,
  targetId: string
): IFile => {
  if (fileTree.children) {
    return {
      ...fileTree,
      children: fileTree.children
        .filter((child) => child.id !== targetId)
        .map((child) => removeFileFromTree(child, targetId)),
    };
  }

  return fileTree;
};

export const renameFileInTree = (
  fileTree: IFile,
  targetId: string,
  newName: string
): IFile => {
  if (fileTree.id === targetId) {
    return { ...fileTree, name: newName };
  }

  if (fileTree.children) {
    return {
      ...fileTree,
      children: fileTree.children.map((child) =>
        renameFileInTree(child, targetId, newName)
      ),
    };
  }

  return fileTree;
};

export const updateFileContentInTree = (
  fileTree: IFile,
  targetId: string,
  content: string
): IFile => {
  if (fileTree.id === targetId) {
    return { ...fileTree, content, isEdited: true };
  }

  if (fileTree.children) {
    return {
      ...fileTree,
      children: fileTree.children.map((child) =>
        updateFileContentInTree(child, targetId, content)
      ),
    };
  }

  return fileTree;
};

export const searchFilesInTree = (fileTree: IFile, query: string): IFile[] => {
  const results: IFile[] = [];
  const searchQuery = query.toLowerCase();

  const searchRecursive = (file: IFile) => {
    if (file.name.toLowerCase().includes(searchQuery)) {
      results.push(file);
    }

    if (file.children) {
      file.children.forEach(searchRecursive);
    }
  };

  searchRecursive(fileTree);
  return results;
};

export const getFileExtension = (filename: string): string => {
  return filename.split(".").pop()?.toLowerCase() || "";
};

export const getFileIcon = (filename: string, isFolder: boolean): string => {
  if (isFolder) return "📁";

  const extension = getFileExtension(filename);
  const iconMap: Record<string, string> = {
    js: "📄",
    jsx: "⚛️",
    ts: "📘",
    tsx: "⚛️",
    html: "🌐",
    css: "🎨",
    scss: "🎨",
    json: "📋",
    md: "📝",
    py: "🐍",
    java: "☕",
    cpp: "⚙️",
    c: "⚙️",
    php: "🐘",
    rb: "💎",
    go: "🐹",
    rs: "🦀",
    xml: "📄",
    yaml: "📄",
    yml: "📄",
  };

  return iconMap[extension] || "📄";
};
