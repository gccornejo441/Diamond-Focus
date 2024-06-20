import { useState, useEffect } from "react";
import styles from "./ShareStream.module.css";
import settingStyles from "../Setting/styles/Setting.module.css";
import {
  PeerConnection,
  Data,
  DataType,
  handlePeerDisconnect,
} from "../../utilities/peer";
import { toast } from "react-toastify";

const ShareStream = () => {
  const [peerId, setPeerId] = useState<string>("");
  const [connectedPeerId, setConnectedPeerId] = useState<string>("");
  const [connectionInput, setConnectionInput] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [receivedData, setReceivedData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<
    Array<{ sender: string; content: string }>
  >([]);

  useEffect(() => {
    PeerConnection.startPeerSession().then(setPeerId);
    PeerConnection.onIncomingConnection((conn) => {
      toast(`Connected to ${conn.peer}`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setConnectedPeerId(conn.peer);
      PeerConnection.onConnectionReceiveData(conn.peer, (data) => {
        if (data.dataType === DataType.FILE && data.file) {
          data.file = new Blob([data.file], { type: data.fileType });
        }
        setReceivedData(data);
        addMessageToChatHistory(conn.peer, data.message || "");
      });
    });
  }, []);

  const handleConnect = async () => {
    setLoading(true);
    await PeerConnection.connectPeer(connectionInput);
    setConnectedPeerId(connectionInput);
    PeerConnection.onConnectionReceiveData(connectionInput, (data) => {
      if (data.dataType === DataType.FILE && data.file) {
        data.file = new Blob([data.file], { type: data.fileType });
      }
      setReceivedData(data);
      addMessageToChatHistory(connectionInput, data.message || "");
    });
    setLoading(false);
  };

  const handleSendFile = async () => {
    if (file) {
      const data: Data = {
        dataType: DataType.FILE,
        file: new Blob([file]),
        fileName: file.name,
        fileType: file.type,
      };
      await PeerConnection.sendConnection(connectedPeerId, data);
    }
  };

  const handleSendMessage = async () => {
    const data: Data = {
      dataType: DataType.OTHER,
      message,
    };
    await PeerConnection.sendConnection(connectedPeerId, data);
    addMessageToChatHistory("You", message);
    setMessage("");
  };

  const addMessageToChatHistory = (sender: string, content: string) => {
    setChatHistory((prevHistory) => [...prevHistory, { sender, content }]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleCopyPeerId = () => {
    navigator.clipboard.writeText(peerId).then(
      () => {
        console.log("Peer ID copied to clipboard");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const handlePastePeerId = async () => {
    const text = await navigator.clipboard.readText();
    setConnectionInput(text);
  };

  const handleDisconnect = async () => {
    handlePeerDisconnect(connectedPeerId);
    toast(`${connectedPeerId} has disconnected`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setConnectedPeerId("");
    setConnectionInput("");
    setChatHistory([]);
  };

  return (
    <div className={settingStyles.content}>
      <div className={styles.header}>
        <h2>Share Stream</h2>
        <p>
          Your Peer ID: <span className={styles.peerId}>{peerId}</span>
          <button className={styles.copyButton} onClick={handleCopyPeerId}>
            Copy
          </button>
        </p>
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter Peer ID to connect"
          value={connectionInput}
          onChange={(e) => setConnectionInput(e.target.value)}
        />
        <button className={styles.pasteButton} onClick={handlePastePeerId}>
          Paste
        </button>
        <button className={styles.button} onClick={handleConnect}>
          {loading ? "Connecting..." : "Connect"}
        </button>
        {loading && (
          <div className={styles.progressBar}>
            <div></div>
          </div>
        )}
      </div>
      <div className={styles.inputContainer}>
        {connectedPeerId && (
          <div className={styles.card}>
            <div className={styles.chatContainer}>
              <div className={styles.chatHistory}>
                {chatHistory.map((chat, index) => (
                  <div
                    key={index}
                    className={
                      chat.sender === "You"
                        ? styles.sentMessage
                        : styles.receivedMessage
                    }
                  >
                    <strong>{chat.sender}:</strong> {chat.content}
                  </div>
                ))}
              </div>
              <div className={styles.space}>
                <input type="file" onChange={handleFileChange} />
                <button
                  className={styles.button}
                  onClick={handleSendFile}
                  disabled={!file}
                >
                  Send File
                </button>
              </div>
              <div className={styles.space}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Enter message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button className={styles.button} onClick={handleSendMessage}>
                  Send Message
                </button>
              </div>
              <button className={styles.button} onClick={handleDisconnect}>
                Disconnect
              </button>
              {receivedData && (
                <div>
                  <h3>Received Data:</h3>
                  {receivedData.dataType === DataType.FILE &&
                    receivedData.file && (
                      <div>
                        <p>File: {receivedData.fileName}</p>
                        <a
                          href={URL.createObjectURL(receivedData.file)}
                          download={receivedData.fileName}
                        >
                          Download
                        </a>
                      </div>
                    )}
                  {receivedData.dataType === DataType.OTHER &&
                    receivedData.message && (
                      <p>Message: {receivedData.message}</p>
                    )}
                  {receivedData.dataType === DataType.DISCONNECT &&
                    receivedData.message && <p>{receivedData.message}</p>}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareStream;
