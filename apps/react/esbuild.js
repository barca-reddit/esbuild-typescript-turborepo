import { copyFile } from 'fs/promises';
import { constants } from 'fs';
import { buildReact } from '@repo/config/esbuild';

const config = {
    development: {
        define: { 'process.env.NODE_ENV': '"development"' },
        minify: false,
        target: 'esnext'
    },
    production: {
        define: { 'process.env.NODE_ENV': '"production"' },
        minify: true,
        target: 'es2020'
    }
}

await buildReact({
    ...config.development
});
await copyFile(
    './src/index.html',
    './out/index.html',
    constants.COPYFILE_FICLONE
);