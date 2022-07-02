import { copyFile } from 'fs/promises';
import { constants } from 'fs';
import { buildBrowser } from '@repo/config/esbuild/build-browser.mjs';

await buildBrowser({});
await copyFile(
    './src/index.html',
    './out/index.html',
    constants.COPYFILE_FICLONE
);