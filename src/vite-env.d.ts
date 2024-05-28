/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  SpeechRecognition: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webkitSpeechRecognition: any;
}
