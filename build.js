#!/usr/bin/env node

import * as esbuild from "esbuild";
import {createServer} from 'esbuild-server';
import fs from "fs";
import path from "node:path";
import colors from "picocolors";
import cssModulesPlugin from "esbuild-css-modules-plugin";


async function build() {
  const devDir = "./node_modules/@esbuild/dev";
  const PORT = 4000;
  

  let isDev = false;

  if (process.argv.includes("-d")) {
    isDev = true;
  }

  const entryPoints = {    
    "main": "./src/main.tsx"    
  };

  const plugins = [
    cssModulesPlugin({
      inject: false,
      filter: /\.module?\.css$/i,
      v2: true,
      bundle: true,
    }),
  ];

  if (!isDev) {    
    const cfg = {
      entryPoints: entryPoints,
      plugins: plugins,
      outdir: "./dist/public",
      bundle: true,
      minify: true,
      format: "esm",
      loader: { ".svg": "dataurl" },
      define: { "window.IS_PRODUCTION": "true"},
    };

    console.log("prod build");
    await esbuild.build(cfg);      

    await fs.promises.copyFile(path.resolve("src", "index.html"), path.resolve("./dist/public", "index.html"));    
    await fs.promises.cp("./assets", "./dist/public/assets", { recursive: true });

    
  } else {
    console.log("dev build");
    
    if (!fs.existsSync(devDir)) {
      await fs.promises.mkdir(devDir, { recursive: true });
    }
    const cfg = {
      entryPoints: entryPoints,
      plugins: plugins,
      outdir: devDir,
      bundle: true,
      minify: false,
      sourcemap: true,
      loader: { ".svg": "dataurl" },
      define: { "window.IS_PRODUCTION": "false" },
    };

    const context = await esbuild.context(cfg);
    console.log("dev build complete", devDir);
    await fs.promises.copyFile(path.resolve("src", "index.html"), path.resolve(devDir, "index.html"));    
    await fs.promises.cp("./assets", devDir, { recursive: true });
    //context.watch();
    // await context.serve({
    //   servedir: devDir,
    //   port: PORT,
    //   fallback: `${devDir}/index.html`
    // });

    createServer(cfg,{
      port: PORT,
      static: "dist/public",
      open: false,
      historyApiFallback: true,
      proxy: {
        "/api": "http://localhost:3000"
      }
    }).start();

    const url = `${colors.cyan("http://localhost")}:${colors.cyan(
      colors.bold(PORT)
    )}/index.html`;
    console.log(`  ${colors.green("➜")}  ${colors.bold("Local")}:   ${url}`);
  }
}

build().catch((err) => {
  console.log(err);
  process.exit(1);
});