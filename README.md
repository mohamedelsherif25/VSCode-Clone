# VS Code Clone

A simple Visual Studio Code clone built with modern web technologies, featuring a complete code editing experience with file management, syntax highlighting, and VS Code-style UI components.

![VS Code Clone](https://img.shields.io/badge/VS%20Code-Clone-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 🚀 Features

### 📝 **Code Editor**

- **Monaco Editor Integration** - Full VS Code editor with syntax highlighting
- **Multi-language Support** - JavaScript, TypeScript, Python, HTML, CSS, JSON, and more
- **Advanced Editing** - Copy/paste, undo/redo, find/replace, multiple cursors
- **Theme Support** - Dynamic light/dark theme switching
- **Auto-completion** - IntelliSense-like code completion

### 📁 **File Management**

- **File Explorer** - Tree-view file navigation with expand/collapse
- **File Operations** - Create, delete, rename files and folders
- **Context Menus** - Right-click context menus for file operations
- **File Icons** - VS Code-style file type icons with 850+ SVG icons
- **Search Functionality** - Quick file search (Ctrl+P)

### 🏷️ **Tab Management**

- **Multiple Tabs** - Open multiple files simultaneously
- **Tab Reordering** - Drag & drop tab reordering
- **Tab Pinning** - Pin important tabs
- **Close Operations** - Close individual tabs or all except active
- **Edited Indicators** - Visual indicators for unsaved changes
- **Tab Preview** - Hover preview of tab content

### 🎨 **VS Code-Style Interface**

- **Activity Bar** - Explorer, Search, Extensions, Debug sections
- **Status Bar** - File information, language mode, Git branch
- **Title Bar** - Dynamic title with file information
- **Sidebar Panel** - Resizable sidebar with file explorer
- **Welcome Tab** - VS Code-style welcome screen
- **Theme Toggle** - Switch between light and dark themes

### 🔧 **Advanced Features**

- **Resizable Panels** - Adjustable sidebar and editor panels
- **Global Context Menu** - Unified context menu system
- **File Tree State** - Persistent file tree state management
- **Search Results** - File search with results highlighting
- **Keyboard Shortcuts** - Common VS Code keyboard shortcuts

## 🛠️ Tech Stack

### **Frontend**

- **React 18.2.0** - Modern React with hooks and functional components
- **TypeScript 5.0.2** - Full type safety and enhanced developer experience
- **Vite 4.4.5** - Lightning-fast build tool and development server

### **State Management**

- **Redux Toolkit 1.9.5** - Efficient state management with modern Redux
- **React Redux 8.1.2** - React bindings for Redux

### **UI & Styling**

- **Tailwind CSS 3.3.3** - Utility-first CSS framework
- **Custom CSS** - Theme-aware styling system
- **SVG Icons** - 850+ professional file type icons

### **Code Editor**

- **Monaco Editor** - VS Code's editor (same engine as VS Code)
- **@monaco-editor/react 4.7.0** - React wrapper for Monaco Editor

### **Additional Libraries**

- **@hello-pangea/dnd 18.0.1** - Drag and drop for tab reordering
- **react-resizable-panels 0.0.54** - Resizable UI panels
- **react-syntax-highlighter 15.5.0** - Syntax highlighting fallback
- **uuid 9.0.0** - Unique identifier generation

## 📋 Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager

## 🚀 Getting Started

### 1. **Clone the Repository**

```bash
git clone <repository-url>
cd vscode-clone-project-code
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Start Development Server**

```bash
npm run dev
```

### 4. **Open in Browser**

Navigate to `http://localhost:5173` to view the application.

## 📜 Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build for production                     |
| `npm run preview` | Preview production build locally         |
| `npm run lint`    | Run ESLint for code quality checks       |

## 🏗️ Project Structure

```
src/
├── app/
│   ├── features/
│   │   └── fileTreeSlice.ts      # Redux slice for file management
│   └── store.ts                  # Redux store configuration
├── components/
│   ├── ui/
│   │   └── ContextMenu.tsx       # Reusable context menu component
│   ├── SVG/                      # Custom SVG icon components
│   ├── ActivityBar.tsx           # VS Code activity bar
│   ├── FileSearch.tsx            # File search functionality
│   ├── GlobalContextMenu.tsx     # Global context menu manager
│   ├── MonacoEditor.tsx          # Monaco editor wrapper
│   ├── OpenedFilesBar.tsx        # Tab management bar
│   ├── OpenedFilesBarTab.tsx     # Individual tab component
│   ├── Preview.tsx               # Editor preview panel
│   ├── RecursiveComponent.tsx    # File tree renderer
│   ├── RenderFileIcon.tsx        # File type icon renderer
│   ├── ResizablePanel.tsx        # Resizable panel wrapper
│   ├── SidebarPanel.tsx          # Main sidebar panel
│   ├── StatusBar.tsx             # VS Code status bar
│   ├── ThemeToggle.tsx           # Theme switching component
│   ├── TitleBar.tsx              # VS Code title bar
│   └── WelcomeTab.tsx            # Welcome screen
├── contexts/
│   └── ThemeContext.tsx          # Theme management context
├── hooks/
│   ├── useContextMenu.ts         # Context menu hook
│   └── useThemeColors.ts         # Theme colors hook
├── styles/
│   ├── index.ts                  # Style constants
│   └── themes.ts                 # Theme configuration
├── utils/
│   └── fileOperations.ts         # File system utilities
├── interfaces/
│   └── index.ts                  # TypeScript interfaces
├── constant/
│   └── index.ts                  # Application constants
└── data/
    └── fileTree.tsx              # Initial file tree data
```

## 🎨 Theming

The application supports both **light** and **dark** themes with:

- **Automatic system theme detection**
- **Manual theme switching** via toggle button
- **Persistent theme preference** (localStorage)
- **Theme-aware components** throughout the application
- **Consistent color palette** across all UI elements

## 🔧 Key Features Implementation

### **File Operations**

- In-memory file system simulation
- CRUD operations for files and folders
- Unique ID generation for file tracking
- File content management and editing

### **Tab Management**

- Drag & drop reordering using @hello-pangea/dnd
- Tab state persistence
- Pin/unpin functionality
- Close all except active functionality

### **Context Menus**

- Global context menu system
- Right-click file operations
- Single menu instance management
- Click-outside-to-close behavior

### **Monaco Editor Integration**

- Full VS Code editor capabilities
- Dynamic theme switching
- File content synchronization
- Keyboard shortcut support

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Microsoft** - For the original VS Code design and Monaco Editor
- **React Team** - For the amazing React framework
- **Vite Team** - For the lightning-fast build tool
- **Tailwind CSS** - For the utility-first CSS framework
- **Redux Toolkit** - For simplified state management

## 📞 Support

If you have any questions or issues, please:

1. **Check the Issues** - Look for existing issues or solutions
2. **Create an Issue** - Report bugs or request features
3. **Discussions** - Join community discussions

---

**Built with ❤️ using React, TypeScript, and modern web technologies**

_This project demonstrates modern web development practices and provides a fully functional VS Code-like experience in the browser._
