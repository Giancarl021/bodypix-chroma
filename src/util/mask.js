import * as tf from '@tensorflow/tfjs';
import * as BodyPix from '@tensorflow-models/body-pix';

let net, input, output, temp;

export default async function (inputVideo, outputCanvas, tempCanvas) {
    tf.getBackend();

    net = await BodyPix.load();
    input = inputVideo;
    output = outputCanvas;
    temp = tempCanvas;

    temp.width = input.videoWidth;
    temp.height = input.videoHeight;

    requestAnimationFrame(calculateFrame);
}

async function calculateFrame() {
    getFrame();

    const data = await net.segmentPerson(temp);
    const mask = BodyPix.toMask(data, { r: 0, g: 0, b: 0, a: 0}, { r: 0, g: 255, b: 0, a: 255});

    BodyPix.drawMask(output, temp, mask, 1);

    requestAnimationFrame(calculateFrame);
}

function getFrame() {
    const ctx = temp.getContext('2d');

    ctx.drawImage(input, 0, 0, input.videoWidth, input.videoHeight);
}