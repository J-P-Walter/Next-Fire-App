import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { auth, storage } from "../lib/firebase";
import Loader from "./Loader";

export default function ImageUploader() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setdownloadURL] = useState(null);

  const uploadFile = async (e) => {
    //get the file
    const file = Array.from(e.target.files)[0];
    const extension = file.type.split("/")[1];

    const storageRef = ref(
      storage,
      `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`
    );
    setUploading(true);

    const task = uploadBytesResumable(storageRef, file);
    task.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(task.snapshot.ref).then((downloadURL) => {
          //console.log(downloadURL);
          setdownloadURL(downloadURL);
          setUploading(false);
        });
      }
    );
  };

  return (
    <div className="box">
      <Loader show={uploading} />
      {uploading && <h3>{progress}%</h3>}

      {!uploading && (
        <>
          <label className="btn">
            Upload Img
            <input
              type="file"
              onChange={uploadFile}
              accept="image/x-png,image/gif,image/jpeg"
            />
          </label>
        </>
      )}
      {downloadURL && (
        <code className="upload-snippet">{`![alt](${downloadURL})`}</code>
      )}
    </div>
  );
}
