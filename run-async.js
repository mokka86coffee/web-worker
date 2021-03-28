const runAsync = (fn) => {
    const blob = new Blob([`postMessage((${fn})());`], { type: 'application/javascript; charset=utf-8' });
    const objectURL = URL.createObjectURL(blob);
    const worker = new Worker(objectURL);

    return new Promise((res, rej) => {
        worker.onmessage = ({ data }) => {
            res(data);
            worker.terminate();
        }
        worker.onerror = err => {
            rej(err);
            worker.terminate();
        }
    })
}
