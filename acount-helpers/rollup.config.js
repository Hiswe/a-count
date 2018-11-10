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
      file: `lib/${NAME}.esm.js`,
      format: 'esm',
    },
  ],
  plugins: [typescript()],
}

export default [config]
