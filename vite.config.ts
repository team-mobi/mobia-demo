import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "~",
        replacement: path.resolve(__dirname, "src"),
      },
      {
        find: "~apps",
        replacement: path.resolve(__dirname, "src/apps"),
      },
      {
        find: "~entities",
        replacement: path.resolve(__dirname, "src/entities"),
      },
      {
        find: "~features",
        replacement: path.resolve(__dirname, "src/features"),
      },
      {
        find: "~pages",
        replacement: path.resolve(__dirname, "src/pages"),
      },
      {
        find: "~shared",
        replacement: path.resolve(__dirname, "src/shared"),
      },
      {
        find: "~widgets",
        replacement: path.resolve(__dirname, "src/widgets"),
      },
    ],
  },
  plugins: [react({ jsxImportSource: "@emotion/react" })],
});
