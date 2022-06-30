import { build } from 'esbuild';
import fg from 'fast-glob';

export const buildBrowser = async ({ ...args }) => {
    await build({
        entryPoints: await fg('src/**/*.ts'),
        platform: 'browser',
        target: 'es6',
        format: 'iife',
        bundle: true,
        outdir: './out',
        outbase: 'src',
        sourcemap: false,
        logLevel: 'info',
        ...args
    })
};