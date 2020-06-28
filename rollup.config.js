import postcss from "rollup-plugin-postcss";
import postcssImport from 'postcss-import';
import url from "rollup-plugin-url";
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import multiEntry from "@rollup/plugin-multi-entry";
import del from 'rollup-plugin-delete'

export default {
  input: "src/index.js",
  output: [
    {
      dir: "build/",
      format: "es",
      sourcemap: false,
    },
  ],
  plugins: [
    external({ includeDependencies: true }),
    resolve(),
    // encode all images as base64
    url({ 
      include: ["**/*.png", "**/*.jpg"],
      limit: Infinity,
    }),
    del({ targets: 'build/*' }),
    postcss({
      plugins: [postcssImport()]
    }),
    json(),
    babel({
      presets: ["@babel/env", "@babel/react"],
      exclude: "node_modules/**",
    }),
    commonjs(),
  ],
  //external: ["react", "react-dom"],
};
