import { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useAuth } from "@utilities/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import styles from "./FileList.module.css";
import { Toast } from "@utilities/helpers";

interface FileItem {
  name: string;
  url: string;
  fullPath: string;
}

const FileList = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
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

  return (
    <div className={styles.container}>
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
    </div>
  );
};

export default FileList;
