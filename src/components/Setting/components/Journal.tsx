import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "@utilities/firebaseSetup";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";
import "highlight.js/styles/github.css";
import styles from "../styles/Setting.module.css";
import { useAuth } from "@utilities/AuthContext";

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

  const handleSave = async () => {
    if (jsonContent.trim() === "") {
      toast.error("Content cannot be empty");
      return;
    }

    try {
      if (user) {
        const docRef = await addDoc(collection(db, `users/${user.uid}/notes`), {
          content: jsonContent,
        });
        setNotes([...notes, { id: docRef.id, content: jsonContent }]);
        setJsonContent("");
        toast.success("Note saved successfully");
      } else {
        toast.error("User is not authenticated");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error("Error adding document: ", e); // Debug log
        toast.error("Error saving note: " + e.message);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      if (user) {
        await deleteDoc(doc(db, `users/${user.uid}/notes`, id));
        setNotes(notes.filter((note) => note.id !== id));
        toast.success("Note deleted successfully");
      } else {
        toast.error("User is not authenticated");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error("Error deleting document: ", e); // Debug log
        toast.error("Error deleting note: " + e.message);
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonContent).then(
      () => {
        toast.success("Copied to clipboard!");
      },
      (err: Error) => {
        toast.error("Failed to copy: " + err.message);
      }
    );
  };

  const handlePaste = () => {
    navigator.clipboard.readText().then(
      (text) => {
        setJsonContent(text);
        toast.success("Pasted from clipboard!");
      },
      (err: Error) => {
        toast.error("Failed to paste: " + err.message);
      }
    );
  };

  const handleCopyNote = (content: string) => {
    navigator.clipboard.writeText(content).then(
      () => {
        toast.success("Copied to clipboard!");
      },
      (err: Error) => {
        toast.error("Failed to copy: " + err.message);
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
    </div>
  );
};

export default Journal;
