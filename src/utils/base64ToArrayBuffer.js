const base64ToArrayBuffer = (base64) => {
    let binary_string = window.atob(base64.split(',')[1]);
    let len = binary_string.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

export default base64ToArrayBuffer;