/* eslint-disable global-require */
import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import autoprefixer from "autoprefixer";
import minify from "postcss-minify";
import styles from "rollup-plugin-styles";
import url from "@rollup/plugin-url";
import injectProcessEnv from "rollup-plugin-inject-process-env";

import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";

import dotenv from "dotenv";

dotenv.config();

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn("npm", ["run", "start", "--", "--dev", ...process.argv.slice(4)], {
        stdio: ["ignore", "inherit", "inherit"],
        shell: true,
      });

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: "src/main.ts",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
    assetFileNames: "[name][extname]",
  },
  plugins: [
    production && del({ targets: "public" }),

    copy({
      targets: [
        {
          src: [
            ...(production ? ["src/service-worker.js"] : []),
            "src/manifest.json",
            "src/index.html",
            "src/favicon.png",
          ],
          dest: "public/",
        },
      ],
      verbose: true,
    }),

    url({
      limit: 0,
      destDir: "public/assets",
      publicPath: "assets/",
      fileName: "[name]-[hash][extname]",
    }),

    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
      emitCss: true,
      preprocess: sveltePreprocess({
        sourceMap: !production,
      }),
    }),

    // autoModules is enabled to be able to export sass variables
    // we'll extract any component CSS out into
    // a separate file - better for performance
    // then add all external sass files
    // prefix all properties with vendor prefixes
    // and finally minify
    styles({
      autoModules: true,
      mode: "extract",
      plugins: [autoprefixer, minify],
      use: ["sass"],
      url: {
        publicPath: "./assets",
      },
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),

    typescript({
      sourceMap: !production,
      inlineSources: !production,
    }),

    injectProcessEnv(process.env),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};

export default config;
