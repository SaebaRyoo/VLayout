import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';

export default {
  input: ['src/index.tsx', 'src/schema.ts', 'src/template.ts'],
  output: [
    {
      dir: 'dist',
      entryFileNames: '[name].js',
      format: 'esm',
    },
  ],
  plugins: [typescript(), postcss()],
  external: ['react'],
};
