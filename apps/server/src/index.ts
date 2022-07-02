import { createServer } from 'http';
import { getVersion, getPlatform } from '@repo/shared/server';

const server = createServer((req, res) => {
    res
        .writeHead(200, { 'Content-Type': 'application/json' })
        .end(
            JSON.stringify({
                node: getVersion(),
                platform: getPlatform()
            }),
            'utf-8'
        );
}).listen(8000);

server.once('listening', () => {
    console.log('\nServer accepting requests at http://localhost:8000\n');
});