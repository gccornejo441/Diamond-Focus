import * as React from 'react';
import './App.css';
import Timer from './component/Timer';

function App() {
  let [logs, setLogs] = React.useState<string[]>([]);

  return (
    <div className="App">
      <Timer />
    </div>
  );
}

export default App;
