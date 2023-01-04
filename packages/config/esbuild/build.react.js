import { build } from 'esbuild';

export const buildReact = async ({ ...args }) => {
    await build({
        entryPoints: ['./src/index.tsx'],
        platform: 'browser',
        target: 'es6',
        format: 'iife',
        jsx: 'automatic',
        bundle: true,
        outfile: './out/index.js',
        sourcemap: false,
        logLevel: 'info',
        ...args,
    })
};