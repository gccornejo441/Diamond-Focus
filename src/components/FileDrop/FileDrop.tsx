import { useState, useEffect, useRef } from "react";
import Peer, { DataConnection } from "peerjs";
import styles from "./FileDrop.module.css";
import settingStyles from "../Setting/styles/Setting.module.css";

const generateId = () => {
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective}-${randomNoun}`;
};

const FileDrop = () => {
  const [peerId, setPeerId] = useState<string>("");
  const [remotePeerId, setRemotePeerId] = useState<string>("");
  const [connection, setConnection] = useState<DataConnection | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const customPeerId = generateId();
    const peer = new Peer(customPeerId);

    peer.on("open", (id: string) => {
      setPeerId(id);
    });

    peer.on("connection", (conn: DataConnection) => {
      setConnection(conn);
      conn.on("data", handleData);
    });

    return () => {
      peer.disconnect();
    };
  }, []);

  const handleData = (data: unknown) => {
    if (isFileData(data)) {
      const blob = new Blob([data.file], { type: data.file.type });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = data.file.name;
      a.click();
    }
  };

  const isFileData = (data: unknown): data is { file: File } => {
    return (
      typeof data === "object" &&
      data !== null &&
      "file" in data &&
      data.file instanceof File
    );
  };

  const connectToPeer = () => {
    const peer = new Peer();
    const conn = peer.connect(remotePeerId);
    setConnection(conn);

    conn.on("open", () => {
      console.log("Connection opened");
    });

    conn.on("data", handleData);
  };

  const sendFile = () => {
    if (connection && file) {
      connection.send({ file });
    }
  };

  return (
    <div className={settingStyles.content}>
      <div className={styles.header}>
        <h2>P2P File Transfer</h2>
        <p>
          Your Peer ID: <span className={styles.peerId}>{peerId}</span>
        </p>
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Enter remote peer ID"
          value={remotePeerId}
          onChange={(e) => setRemotePeerId(e.target.value)}
          className={styles.input}
        />
        <button onClick={connectToPeer} className={styles.button}>
          Connect
        </button>
      </div>
      <div className={styles.inputContainer}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className={styles.fileInput}
        />
        <button
          onClick={sendFile}
          disabled={!connection || !file}
          className={styles.button}
        >
          Send File
        </button>
      </div>
    </div>
  );
};

const adjectives = [
  "Electric",
  "Radiant",
  "Mystic",
  "Galactic",
  "Quantum",
  "Crimson",
  "Emerald",
  "Celestial",
  "Nebula",
  "Luminous",
  "Enchanted",
  "Vivid",
  "Majestic",
  "Serene",
  "Frosty",
  "Blazing",
  "Shadowy",
  "Zealous",
  "Whimsical",
  "Ethereal",
];
const nouns = [
  "Phoenix",
  "Griffin",
  "Dragonfly",
  "Pegasus",
  "Leviathan",
  "Chimera",
  "Gargoyle",
  "Sphinx",
  "Hydra",
  "Minotaur",
  "Basilisk",
  "Wyrm",
  "Kraken",
  "Sprite",
  "Djinn",
  "Unicorn",
  "Mermaid",
  "Cyclops",
  "Yeti",
  "Goblin",
];

export default FileDrop;
