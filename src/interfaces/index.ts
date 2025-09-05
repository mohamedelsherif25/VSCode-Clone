export interface IFile {
  id: string;
  name: string;
  isFolder: boolean;
  children?: IFile[];
  content?: string;
  isEdited?: boolean;
  isPinned?: boolean;
}

export interface ITab extends IFile {
  isPinned: boolean;
  isActive: boolean;
}

export interface IFileOperation {
  type: "create" | "delete" | "rename";
  targetId: string;
  newName?: string;
  isFolder?: boolean;
  parentId?: string;
}
