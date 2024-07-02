import React, { useState, useEffect } from "react";
import { db, storage } from "@utilities/firebaseSetup";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "react-toastify/dist/ReactToastify.css";
import "highlight.js/styles/github.css";
import styles from "../styles/Setting.module.css";
import { useAuth } from "@utilities/AuthContext";
import FileList from "@components/FileList/FileList";
import { Toast } from "@utilities/helpers";
export interface JournalProps {
  onClose: () => void;
}

interface Note {
  id: string;
  content: string;
}

const Journal = ({ onClose }: JournalProps) => {
  const [jsonContent, setJsonContent] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const fetchNotes = async () => {
        const notesCollection = collection(db, `users/${user.uid}/notes`);
        const notesSnapshot = await getDocs(notesCollection);
        const notesList = notesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Note[];
        setNotes(notesList);
      };

      fetchNotes();
    }
  }, [user]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setJsonContent(value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (jsonContent.trim() === "") {
      Toast("Content cannot be empty");
      return;
    }

    try {
      if (user) {
        const docRef = await addDoc(collection(db, `users/${user.uid}/notes`), {
          content: jsonContent,
        });
        setNotes([...notes, { id: docRef.id, content: jsonContent }]);
        setJsonContent("");
        Toast("Note saved successfully");
      } else {
        Toast("User is not authenticated");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error("Error adding document: ", e);
        Toast("Error saving note: " + e.message);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      if (user) {
        await deleteDoc(doc(db, `users/${user.uid}/notes`, id));
        setNotes(notes.filter((note) => note.id !== id));
        Toast("Note deleted successfully");
      } else {
        Toast("User is not authenticated");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error("Error deleting document: ", e);
        Toast("Error deleting note: " + e.message);
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonContent).then(
      () => {
        Toast("Copied to clipboard!");
      },
      (err: Error) => {
        Toast("Failed to copy: " + err.message);
      }
    );
  };

  const handlePaste = () => {
    navigator.clipboard.readText().then(
      (text) => {
        setJsonContent(text);
        Toast("Pasted from clipboard!");
      },
      (err: Error) => {
        Toast("Failed to paste: " + err.message);
      }
    );
  };

  const handleCopyNote = (content: string) => {
    navigator.clipboard.writeText(content).then(
      () => {
        Toast("Copied to clipboard!");
      },
      (err: Error) => {
        Toast("Failed to copy: " + err.message);
      }
    );
  };

  const handleDownloadNote = (content: string) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "note.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
      <h2>Journal</h2>
      <div className={styles.textareaContainer}>
        <textarea
          value={jsonContent}
          onChange={handleInputChange}
          className={styles.textarea}
          placeholder="Add an entry..."
        />
        <div className={styles.copyPasteButtons}>
          <button className={styles.copyPasteButton} onClick={handleCopy}>
            Copy
          </button>
          <button className={styles.copyPasteButton} onClick={handlePaste}>
            Paste
          </button>
        </div>
      </div>
      <div className={styles.uploadContainer}>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload File</button>
      </div>
      <div className={styles.buttonGroup}>
        <button className={styles.button} onClick={handleSave}>
          Save
        </button>
        <button className={styles.button} onClick={onClose}>
          Close
        </button>
      </div>
      <div className={styles.notesList}>
        {notes.map((note) => (
          <div key={note.id} className={styles.note}>
            <p>{note.content}</p>
            <div className={styles.noteButtons}>
              <button onClick={() => handleCopyNote(note.content)}>Copy</button>
              <button onClick={() => handleDownloadNote(note.content)}>
                Download
              </button>
              <button onClick={() => handleDelete(note.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <FileList />
    </div>
  );
};

export default Journal;
