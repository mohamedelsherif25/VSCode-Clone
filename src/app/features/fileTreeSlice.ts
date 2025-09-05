import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFile, ITab, IFileOperation } from "../../interfaces";

interface IClickedFile {
  activeTabId: string | null;
  filename: string;
  fileContent: string | undefined;
}

interface IInitialState {
  openedFiles: IFile[];
  openedTabs: ITab[];
  clickedFile: IClickedFile;
  tabIdToRemove: string | null;
  fileTree: IFile | null;
  searchQuery: string;
  searchResults: IFile[];
}

const initialState: IInitialState = {
  openedFiles: [],
  openedTabs: [],
  clickedFile: {
    activeTabId: null,
    filename: "",
    fileContent: "",
  },
  tabIdToRemove: null,
  fileTree: null,
  searchQuery: "",
  searchResults: [],
};

const fileTreeSlice = createSlice({
  name: "fileTree",
  initialState,
  reducers: {
    setOpenedFilesAction: (state, action: PayloadAction<IFile[]>) => {
      state.openedFiles = action.payload;
    },
    setOpenedTabsAction: (state, action: PayloadAction<ITab[]>) => {
      state.openedTabs = action.payload;
    },
    setClickedFileAction: (state, action: PayloadAction<IClickedFile>) => {
      state.clickedFile = action.payload;
    },
    setTabIdToRemoveAction: (state, action: PayloadAction<string | null>) => {
      state.tabIdToRemove = action.payload;
    },
    setFileTreeAction: (state, action: PayloadAction<IFile>) => {
      state.fileTree = action.payload;
    },
    updateFileContentAction: (
      state,
      action: PayloadAction<{ id: string; content: string }>
    ) => {
      const updateFileInTree = (file: IFile): IFile => {
        if (file.id === action.payload.id) {
          return { ...file, content: action.payload.content, isEdited: true };
        }
        if (file.children) {
          return { ...file, children: file.children.map(updateFileInTree) };
        }
        return file;
      };
      if (state.fileTree) {
        state.fileTree = updateFileInTree(state.fileTree);
      }
      // Update opened tabs
      state.openedTabs = state.openedTabs.map((tab) =>
        tab.id === action.payload.id
          ? { ...tab, content: action.payload.content, isEdited: true }
          : tab
      );
    },
    toggleTabPinAction: (state, action: PayloadAction<string>) => {
      state.openedTabs = state.openedTabs.map((tab) =>
        tab.id === action.payload ? { ...tab, isPinned: !tab.isPinned } : tab
      );
    },
    reorderTabsAction: (
      state,
      action: PayloadAction<{ startIndex: number; endIndex: number }>
    ) => {
      const { startIndex, endIndex } = action.payload;
      const result = Array.from(state.openedTabs);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      state.openedTabs = result;
    },
    closeAllTabsExceptActiveAction: (state) => {
      const activeTab = state.openedTabs.find((tab) => tab.isActive);
      if (activeTab) {
        state.openedTabs = [activeTab];
      }
    },
    setSearchQueryAction: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchResultsAction: (state, action: PayloadAction<IFile[]>) => {
      state.searchResults = action.payload;
    },
    performFileOperationAction: (
      _state,
      _action: PayloadAction<IFileOperation>
    ) => {
      // This will be implemented with the file operations logic
    },
  },
});

export const {
  setOpenedFilesAction,
  setOpenedTabsAction,
  setClickedFileAction,
  setTabIdToRemoveAction,
  setFileTreeAction,
  updateFileContentAction,
  toggleTabPinAction,
  reorderTabsAction,
  closeAllTabsExceptActiveAction,
  setSearchQueryAction,
  setSearchResultsAction,
  performFileOperationAction,
} = fileTreeSlice.actions;

export default fileTreeSlice.reducer;
