/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");
const esbuild = require("esbuild");
const child_process = require("child_process");
const rimraf = require("rimraf");
const commandExists = require('command-exists');

function getAllTsFiles(dir) {
  const files = [];

  function traverse(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        traverse(fullPath);
      } else if (entry.isFile() && fullPath.endsWith(".ts")) {
        files.push(fullPath);
      }
    }
  }

  traverse(dir);
  return files;
}

async function start() {
  esbuild
    .build({
      entryPoints: getAllTsFiles("src"),
      bundle: false,
      format: "cjs",
      tsconfig: "./tsconfig.json",
      define: process.argv.includes("--production")
        ? { "process.env.NODE_ENV": '"production"' }
        : undefined,
      minify: process.argv.includes("--production"),
      sourcemap: !process.argv.includes("--production"),
      mainFields: ["module", "main"],
      platform: "node",
      target: "node14.14",
      outdir: "node_modules/.esbuild-cache/lib",
      plugins: [],
    })
    .catch((e) => {
      console.error(e);
    })
    .then(async () => {
      try {
        child_process.execSync(
          "rsync -avz --delete ./node_modules/.esbuild-cache/lib ./"
        );
        console.log("rsync completed successfully.");
      } catch (error) {
        console.error("Error occurred while running rsync:", error.message);
        return;
      }
      try {
        child_process.execSync("npx tsc --build tsconfig.json");
        console.log("tsc completed successfully.");
      } catch (e) {
        console.error("Error occurred while running tsc:", e.message);
        return;
      }
      try {
        await commandExists("yalc");
        child_process.execSync("yalc push");
        console.log("yalc pushed successfully.");
      } catch (e) {}
    });
}

function deleteBuild() {
  return rimraf.sync("./node_modules/.esbuild-cache/lib");
}

deleteBuild();
start();

if (process.argv.includes("--watch")) {
  const watcher = chokidar.watch(["src/**/*.*", "yalc.lock"], {
    ignoreInitial: true,
  });

  ["change", "add", "unlink"].forEach((event) => {
    watcher.on(event, (path) => {
      console.log(`File ${event}: ${path}`);
      deleteBuild();
      start();
    });
  });
}
