import { build } from 'esbuild';
import fg from 'fast-glob';

export const buildNode = async ({ ...args }) => {
    await build({
        entryPoints: await fg('src/**/*.ts'),
        platform: 'node',
        target: 'node16',
        format: 'esm',
        outdir: './out',
        sourcemap: false,
        logLevel: 'info',
        ...args
    })
};

await buildNode({});