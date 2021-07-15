export default async function (videoElement, deviceLabel) {
    let videoDevice;
    if (deviceLabel) {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');

        videoDevice = videoDevices.find(device => device.label === deviceLabel);
    }

    if (navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: videoDevice ? {
                deviceId: videoDevice.deviceId
            } : true
        });
        videoElement.srcObject = stream;
        videoElement.play();
    }
}