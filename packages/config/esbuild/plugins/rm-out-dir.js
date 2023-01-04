import { rm } from 'fs/promises';

const rmOutDir = async ({ path }) => {
    try {
        await rm(path, { recursive: true });
    } catch (error) { }
}

export const rmOutDirPlugin = () => ({
    name: 'rm out dir',
    setup({ onStart }) {
        onStart(async () => {
            await rmOutDir({ path: './out' });
        })
    }
});