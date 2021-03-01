import { terser } from "rollup-plugin-terser";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import vue from "rollup-plugin-vue";
import scss from "rollup-plugin-scss";
import typescript from "rollup-plugin-typescript";
import replace from "rollup-plugin-replace";

const plugins = [
  replace({
    "process.env.NODE_ENV": JSON.stringify("production")
  }),
  resolve({
    jsnext: true,
    main: true,
    module: true
  }),
  commonjs({
    include: "node_modules/**",
    browser: true,
    preferBuiltins: false,
    ignoreGlobal: false,
    sourceMap: false
  }),
  typescript(),
  vue({
    css: true,
    compileTemplate: true
  }),
  terser(),
  scss()
];

export default [
  {
    input: "src/interfaces/dictionary/index.ts",
    output: {
      format: "es",
      file: "dist/interfaces/dictionary/index.js"
    },
    plugins
  }
];
