import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TaskListProps } from "@components/Sidebar";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import "highlight.js/styles/github.css";
import styles from "../styles/Setting.module.css";

hljs.registerLanguage("json", json);

export interface ImportExportTasksProps {
  onClose: () => void;
  importTasks: (taskLists: TaskListProps[]) => void;
}

const ImportExportTasks = ({
  onClose,
  importTasks,
}: ImportExportTasksProps) => {
  const [jsonContent, setJsonContent] = useState<string>("");

  const handleImport = () => {
    try {
      const parsedData = JSON.parse(jsonContent) as TaskListProps[];
      importTasks(parsedData);
      toast.success("TaskLists imported successfully!");
      onClose();
    } catch (error) {
      toast.error("Invalid JSON format");
    }
  };

  const handleExport = () => {
    const storedTaskLists = localStorage.getItem("taskLists");
    if (storedTaskLists) {
      const taskLists = JSON.parse(storedTaskLists) as TaskListProps[];
      const dataStr = JSON.stringify(taskLists, null, 2);
      setJsonContent(dataStr);
    } else {
      toast.error("No taskLists found in local storage");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setJsonContent(value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonContent).then(
      () => {
        toast.success("Copied to clipboard!");
      },
      (err) => {
        toast.error("Failed to copy: " + err);
      }
    );
  };

  const handlePaste = () => {
    navigator.clipboard.readText().then(
      (text) => {
        setJsonContent(text);
        toast.success("Pasted from clipboard!");
      },
      (err) => {
        toast.error("Failed to paste: " + err);
      }
    );
  };

  const renderHighlightedJSON = (json: string) => {
    try {
      const highlighted = hljs.highlight(json, { language: "json" }).value;
      return { __html: highlighted };
    } catch (e) {
      return { __html: json };
    }
  };

  return (
    <div className={styles.content}>
      <h2>Transfer Tasklists</h2>
      <div className={styles.textareaContainer}>
        <textarea
          value={jsonContent}
          onChange={handleInputChange}
          className={styles.textarea}
          placeholder="Paste your JSON here..."
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
      <pre
        dangerouslySetInnerHTML={renderHighlightedJSON(jsonContent)}
        className={styles.pre}
      />
      <div className={styles.buttonGroup}>
        <button className={styles.button} onClick={handleImport}>
          Import
        </button>
        <button className={styles.button} onClick={handleExport}>
          Export
        </button>
        <button className={styles.button} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ImportExportTasks;
