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
                main: path.resolve(__dirname, "index.html"),
                mines: path.resolve(__dirname, "./games/mines.html"),
                rps: path.resolve(__dirname, "./games/rps.html"),
                threeinrow: path.resolve(__dirname, "./games/threeinrow.html"),
            },
        },
    },
});
