const getFileNameWithoutExtension = (filePath) => {
    const fileName = filePath.split("/").pop();
    return fileName.split(".")[0];
};

export default getFileNameWithoutExtension;