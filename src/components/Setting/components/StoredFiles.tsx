import { useAuth } from "@utilities/AuthContext";
import styles from "../styles/Setting.module.css";
import { Toast } from "@utilities/helpers";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
} from "firebase/storage";

import { useEffect, useState } from "react";

interface FileItem {
  name: string;
  url: string;
  fullPath: string;
}

const StoredFiles = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const { user } = useAuth();
  const storage = getStorage();

  useEffect(() => {
    const fetchFiles = async () => {
      if (user) {
        const listRef = ref(storage, `journal_assets/${user.uid}`);
        try {
          const res = await listAll(listRef);
          const filesList = await Promise.all(
            res.items.map(async (itemRef) => {
              const url = await getDownloadURL(itemRef);
              return { name: itemRef.name, url, fullPath: itemRef.fullPath };
            })
          );
          setFiles(filesList);
        } catch (error) {
          Toast("Error fetching files: " + (error as Error).message);
        }
      }
    };

    fetchFiles();
  }, [user, storage]);

  const handleDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.download = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (fullPath: string) => {
    const fileRef = ref(storage, fullPath);
    try {
      await deleteObject(fileRef);
      setFiles(files.filter((file) => file.fullPath !== fullPath));
      Toast("File deleted successfully");
    } catch (error) {
      Toast("Error deleting file: " + (error as Error).message);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleFileUpload = () => {
    if (!file) {
      Toast("No file selected");
      return;
    }
    if (!user) {
      Toast("User is not authenticated");
      return;
    }

    const storageRef = ref(storage, `journal_assets/${user.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Error uploading file: ", error);
        Toast("Error uploading file: " + error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          Toast("File uploaded successfully");
        });
      }
    );
  };

  return (
    <div className={styles.content}>
      <h2>Uploaded Files</h2>
      <ul className={styles.fileList}>
        {files.map((file) => (
          <li key={file.name} className={styles.fileItem}>
            <span className={styles.fileName}>{file.name}</span>
            <div className={styles.buttonGroup}>
              <button
                className={styles.button}
                onClick={() => handleDownload(file.url)}
              >
                Download
              </button>
              <button
                className={styles.button}
                onClick={() => handleDelete(file.fullPath)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.uploadContainer}>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload File</button>
      </div>
    </div>
  );
};

export default StoredFiles;
