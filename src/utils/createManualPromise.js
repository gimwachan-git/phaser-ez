export default function createManualPromise() {
    let resolve;

    const promise = new Promise((res) => {
        resolve = res;
    });

    return { promise, resolve };
}
