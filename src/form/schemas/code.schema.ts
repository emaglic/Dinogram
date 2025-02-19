export default {
  properties: {
    data: {
      properties: {
        code: {
          type: "object",
          properties: {
            language: {
              type: "string",
              enum: [
                { value: "plaintext", label: "Plain Text" },
                { value: "javascript", label: "JavaScript" },
                { value: "typescript", label: "TypeScript" },
                { value: "python", label: "Python" },
                { value: "java", label: "Java" },
                { value: "csharp", label: "C#" },
                { value: "cpp", label: "C++" },
                { value: "c", label: "C" },
                { value: "go", label: "Go" },
                { value: "rust", label: "Rust" },
                { value: "swift", label: "Swift" },
                { value: "php", label: "PHP" },
                { value: "kotlin", label: "Kotlin" },
                { value: "ruby", label: "Ruby" },
                { value: "dart", label: "Dart" },
                { value: "perl", label: "Perl" },
                { value: "r", label: "R" },
                { value: "html", label: "HTML" },
                { value: "css", label: "CSS" },
                { value: "scss", label: "SCSS" },
                { value: "less", label: "Less" },
                { value: "json", label: "JSON" },
                { value: "yaml", label: "YAML" },
                { value: "xml", label: "XML" },
                { value: "shell", label: "Shell Script" },
                { value: "powershell", label: "PowerShell" },
                { value: "bat", label: "Batch Script" },
                { value: "ini", label: "INI" },
                { value: "toml", label: "TOML" },
                { value: "sql", label: "SQL" },
                { value: "mysql", label: "MySQL" },
                { value: "pgsql", label: "PostgreSQL" },
                { value: "graphql", label: "GraphQL" },
                { value: "markdown", label: "Markdown" },
                { value: "dockerfile", label: "Dockerfile" },
                { value: "git-commit", label: "Git Commit" },
                { value: "git-rebase", label: "Git Rebase" },
                { value: "makefile", label: "Makefile" },
                { value: "latex", label: "LaTeX" },
              ],
            },
          },
        },
        stroke: {
          type: "object",
          properties: {
            color: {
              type: "string",
              description: "Please provide a stroke color",
            },
            width: {
              type: "number",
              description: "Please provide a stroke width",
            },
            opacity: {
              type: "number",
              description: "Please provide a stroke opacity",
            },
          },
        },
      },
    },
  },
};
