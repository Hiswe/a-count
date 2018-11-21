import typescript from 'rollup-plugin-typescript2'

const NAME = `index`

const config = {
  input: `${NAME}.ts`,
  output: [
    {
      format: `cjs`,
      file: `lib/${NAME}.js`,
    },
    {
      format: `esm`,
      file: `lib/${NAME}.esm.js`,
    },
  ],
  plugins: [typescript()],
  // https://rollupjs.org/guide/en#warning-treating-module-as-external-dependency
  external: [
    `shortid`,
    `lodash.merge`,
    `lodash.isobject`,
    `lodash.flow`,
    `lodash.clonedeep`,
  ],
}

export default [config]
