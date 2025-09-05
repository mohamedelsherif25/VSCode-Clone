interface IProps {
  filename: string;
  isFolder?: boolean;
  isOpen?: boolean;
  className?: string;
}

const RenderFileIcon = ({
  filename,
  isFolder = false,
  isOpen = false,
  className = "w-4 h-4",
}: IProps) => {
  const extension = filename.split(".").pop()?.toLowerCase();

  // VS Code style folder icons
  if (isFolder) {
    const folderIconPath = isOpen
      ? "/icons/folder-default-open.svg"
      : "/icons/folder-default.svg";

    return (
      <img
        src={folderIconPath}
        className={className}
        alt={`${isOpen ? "Open" : "Closed"} folder`}
      />
    );
  }

  // Get the appropriate icon path for the file
  const getIconPath = (): string => {
    // Special filename handling first
    if (filename === ".gitignore") return "/icons/git.svg";
    if (filename.includes(".env")) return "/icons/tune.svg";
    if (filename === "package.json") return "/icons/nodejs.svg";
    if (filename === "tsconfig.json") return "/icons/tsconfig.svg";
    if (filename === "webpack.config.js" || filename.includes("webpack"))
      return "/icons/webpack.svg";
    if (filename === "vite.config.ts" || filename === "vite.config.js")
      return "/icons/vite.svg";
    if (filename === "tailwind.config.js" || filename === "tailwind.config.ts")
      return "/icons/tailwindcss.svg";
    if (filename.includes("eslint")) return "/icons/eslint.svg";
    if (filename.includes("prettier")) return "/icons/prettier.svg";
    if (filename.includes("docker")) return "/icons/docker.svg";
    if (filename === "README.md") return "/icons/readme.svg";
    if (filename.includes("test") || filename.includes("spec")) {
      if (extension === "js") return "/icons/test-js.svg";
      if (extension === "ts") return "/icons/test-ts.svg";
      if (extension === "jsx") return "/icons/test-jsx.svg";
    }

    // Extension-based mapping using actual available icons
    const iconMap: Record<string, string> = {
      // JavaScript/TypeScript
      js: "/icons/javascript.svg",
      jsx: "/icons/react.svg",
      ts: "/icons/typescript.svg",
      tsx: "/icons/react_ts.svg", // Based on your icon list

      // Web technologies
      html: "/icons/html.svg",
      css: "/icons/css.svg",
      scss: "/icons/sass.svg",
      sass: "/icons/sass.svg",
      less: "/icons/less.svg",
      stylus: "/icons/stylus.svg",

      // Data formats
      json: "/icons/json.svg",
      xml: "/icons/xml.svg",
      yaml: "/icons/yaml.svg",
      yml: "/icons/yaml.svg",

      // Documentation
      md: "/icons/markdown.svg",
      txt: "/icons/text.svg",

      // Programming languages
      py: "/icons/python.svg",
      java: "/icons/java.svg",
      cpp: "/icons/cpp.svg",
      c: "/icons/c.svg",
      php: "/icons/php.svg",
      rb: "/icons/ruby.svg",
      go: "/icons/go.svg",
      rs: "/icons/rust.svg",
      swift: "/icons/swift.svg",

      // Other languages from your icon list
      zig: "/icons/zig.svg",
      vlang: "/icons/vlang.svg", // V language

      // Shell/Config
      sh: "/icons/shell.svg",
      bash: "/icons/shell.svg",
      zsh: "/icons/shell.svg",

      // Images
      svg: "/icons/svg.svg",
      png: "/icons/image.svg",
      jpg: "/icons/image.svg",
      jpeg: "/icons/image.svg",
      gif: "/icons/image.svg",
      webp: "/icons/image.svg",

      // Video
      mp4: "/icons/video.svg",
      avi: "/icons/video.svg",
      mov: "/icons/video.svg",

      // Archives
      zip: "/icons/zip.svg",

      // Build tools and configs available in your icons
      dockerfile: "/icons/docker.svg",

      // Template engines
      twig: "/icons/twig.svg",

      // Other formats
      tex: "/icons/tex.svg",

      // Default fallback
      default: "/icons/file.svg",
    };

    return iconMap[extension || ""] || "/icons/file.svg";
  };

  const iconPath = getIconPath();

  return (
    <img
      src={iconPath}
      className={className}
      alt={`${filename} file icon`}
      onError={(e) => {
        // Fallback to generic file icon if the specific icon doesn't exist
        (e.target as HTMLImageElement).src = "/icons/file.svg";
      }}
    />
  );
};

export default RenderFileIcon;
