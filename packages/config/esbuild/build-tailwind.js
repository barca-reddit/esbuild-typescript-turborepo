import { build } from 'esbuild';
import postCSS from 'esbuild-postcss';

export const buildTailwind = async ({ ...args }) => {
    await build({
        entryPoints: ['./src/css/tailwind.css'],
        outfile: './out/css/style.css',
        bundle: true,
        minify: false,
        external: ['*.svg'],
        logLevel: 'info',
        plugins: [postCSS()],
        ...args
    })
}