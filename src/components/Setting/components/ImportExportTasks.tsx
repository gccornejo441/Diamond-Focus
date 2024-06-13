import React, { useState, Suspense } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Task } from "@components/Sidebar";
import styles from "../styles/Setting.module.css";

const AceEditor = React.lazy(() => import("react-ace"));

export interface ImportExportTasksProps {
  onClose: () => void;
  importTasks: (tasks: Task[]) => void;
  exportTasks: () => Task[];
}
const ImportExportTasks = ({
  onClose,
  importTasks,
  exportTasks,
}: ImportExportTasksProps) => {
  const [jsonContent, setJsonContent] = useState<string>("");

  const handleImport = () => {
    try {
      const parsedData = JSON.parse(jsonContent) as Task[];
      importTasks(parsedData);
      toast.success("Tasks imported successfully!");
      onClose();
    } catch (error) {
      toast.error("Invalid JSON format");
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(exportTasks(), null, 2);
    setJsonContent(dataStr);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Suspense fallback={<div>Loading editor...</div>}>
        <AceEditor
          mode="json"
          theme="github"
          name="import_export_editor"
          onChange={(newValue) => setJsonContent(newValue)}
          value={jsonContent}
          editorProps={{ $blockScrolling: true }}
          width="100%"
          height="400px"
        />
      </Suspense>
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
