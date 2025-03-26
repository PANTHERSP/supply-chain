import axios from "axios";

async function uploadFile(file, folder) {
    // Request pre-signed URL from backend

    // console.log("Uploading:", file);
    const { data: { uploadUrl, fileUrl } } = await axios.post("http://localhost:8000/get-presigned-url", {
        fileName: file.name,
        fileType: file.type,
        folder
    }, {
        headers: { "Content-Type": "application/json" },
    });

    console.log("Pre-signed URL:", uploadUrl);
    console.log("File URL:", fileUrl);


    // Upload file directly to S3
    await axios.put(uploadUrl, file, {
        headers: { "Content-Type": file.type },
    });

    console.log("Uploaded:", fileUrl);

    // Send URL to backend to save in database
    // await axios.post("http://localhost:8000/save-file", { fileUrl }, {
    //     headers: { "Content-Type": "application/json" },
    // });

    // console.log("File URL saved to database");

    return fileUrl;
}

export default uploadFile;
