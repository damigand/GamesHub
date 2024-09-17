import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./"),
            "@c": path.resolve(__dirname, "./components/"),
        },
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                mines: resolve(__dirname, "./pages/mines.html"),
                rps: resolve(__dirname, "./pages/rps.html"),
                threeinrow: resolve(__dirname, "./pages/threeinrow.html"),
            },
        },
    },
});
