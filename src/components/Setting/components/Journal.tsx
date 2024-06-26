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

  useEffect(() => {
    const fetchNotes = async () => {
      const notesCollection = collection(db, "notes");
      const notesSnapshot = await getDocs(notesCollection);
      const notesList = notesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Note[];
      setNotes(notesList);
    };

    fetchNotes();
  }, []);

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
      const docRef = await addDoc(collection(db, "notes"), {
        content: jsonContent,
      });
      setNotes([...notes, { id: docRef.id, content: jsonContent }]);
      setJsonContent("");
      toast.success("Note saved successfully");
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error("Error saving note: " + e.message);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "notes", id));
      setNotes(notes.filter((note) => note.id !== id));
      toast.success("Note deleted successfully");
    } catch (e: unknown) {
      if (e instanceof Error) {
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
            <button onClick={() => handleDelete(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journal;
