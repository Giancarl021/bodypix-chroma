import './sass/main.scss';

import webcam from './util/webcam';
import mask from './util/mask';

async function main() {
    const input = document.querySelector('video#input');
    const output = document.querySelector('canvas#output');
    const temp = document.querySelector('canvas#temp');

    await webcam(input);
    mask(input, output, temp);
}

main().catch(console.error);