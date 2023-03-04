import typescript from 'rollup-plugin-typescript2';

export default {
  input: ['src/index.tsx', 'src/schema.ts', 'src/template.ts'],
  output: [
    {
      dir: 'dist',
      entryFileNames: '[name].js',
      format: 'esm',
    },
  ],
  plugins: [typescript()],
  external: ['react'],
};
