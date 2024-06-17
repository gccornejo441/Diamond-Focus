import Peer, { DataConnection, PeerErrorType, PeerError } from "peerjs";

export enum DataType {
  FILE = "FILE",
  OTHER = "OTHER",
}

export interface Data {
  dataType: DataType;
  file?: Blob;
  fileName?: string;
  fileType?: string;
  message?: string;
}

let peer: Peer | undefined;
const connectionMap: Map<string, DataConnection> = new Map<
  string,
  DataConnection
>();

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

const generateId = () => {
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective}-${randomNoun}`;
};

export const PeerConnection = {
  getPeer: () => peer,
  startPeerSession: () =>
    new Promise<string>((resolve, reject) => {
      try {
        const peerId = generateId();
        peer = new Peer(peerId);
        peer
          .on("open", (id) => {
            console.log("My ID: " + id);
            resolve(id);
          })
          .on("error", (err) => {
            console.log(err);
            alert(err);
          });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    }),
  closePeerSession: () =>
    new Promise<void>((resolve, reject) => {
      try {
        if (peer) {
          peer.destroy();
          peer = undefined;
        }
        resolve();
      } catch (err) {
        console.log(err);
        reject(err);
      }
    }),
  connectPeer: (id: string) =>
    new Promise<void>((resolve, reject) => {
      if (!peer) {
        reject(new Error("Peer doesn't start yet"));
        return;
      }
      if (connectionMap.has(id)) {
        reject(new Error("Connection existed"));
        return;
      }
      try {
        const conn = peer.connect(id, { reliable: true });
        if (!conn) {
          reject(new Error("Connection can't be established"));
        } else {
          conn
            .on("open", function () {
              console.log("Connect to: " + id);
              connectionMap.set(id, conn);
              peer?.removeListener("error", handlePeerError);
              resolve();
            })
            .on("error", function (err) {
              console.log(err);
              peer?.removeListener("error", handlePeerError);
              reject(err);
            });
          const handlePeerError = (err: PeerError<`${PeerErrorType}`>) => {
            if (err.type === "peer-unavailable") {
              const messageSplit = err.message.split(" ");
              const peerId = messageSplit[messageSplit.length - 1];
              if (id === peerId) reject(err);
            }
          };
          peer.on("error", handlePeerError);
        }
      } catch (err) {
        reject(err);
      }
    }),
  onIncomingConnection: (callback: (conn: DataConnection) => void) => {
    peer?.on("connection", function (conn) {
      console.log("Incoming connection: " + conn.peer);
      connectionMap.set(conn.peer, conn);
      callback(conn);
    });
  },
  onConnectionDisconnected: (id: string, callback: () => void) => {
    if (!peer) {
      throw new Error("Peer doesn't start yet");
    }
    if (!connectionMap.has(id)) {
      throw new Error("Connection didn't exist");
    }
    const conn = connectionMap.get(id);
    if (conn) {
      conn.on("close", function () {
        console.log("Connection closed: " + id);
        connectionMap.delete(id);
        callback();
      });
    }
  },
  sendConnection: (id: string, data: Data): Promise<void> =>
    new Promise((resolve, reject) => {
      if (!connectionMap.has(id)) {
        reject(new Error("Connection didn't exist"));
      }
      try {
        const conn = connectionMap.get(id);
        if (conn) {
          conn.send(data);
        }
      } catch (err) {
        reject(err);
      }
      resolve();
    }),
  onConnectionReceiveData: (id: string, callback: (f: Data) => void) => {
    if (!peer) {
      throw new Error("Peer doesn't start yet");
    }
    if (!connectionMap.has(id)) {
      throw new Error("Connection didn't exist");
    }
    const conn = connectionMap.get(id);
    if (conn) {
      conn.on("data", function (receivedData) {
        console.log("Receiving data from " + id);
        const data = receivedData as Data;
        callback(data);
      });
    }
  },
};
