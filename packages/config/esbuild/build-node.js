import { build } from 'esbuild';
import fg from 'fast-glob';
import { rmOutDirPlugin } from './plugins/rm-out-dir.js';

export const buildNode = async ({ ...args }) => {
    await build({
        entryPoints: await fg('src/**/*.ts'),
        platform: 'node',
        target: 'node16',
        format: 'esm',
        bundle: false,
        outdir: './out',
        sourcemap: false,
        logLevel: 'info',
        plugins: [rmOutDirPlugin()],
        ...args
    })
};
