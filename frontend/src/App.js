import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/get-anomalies")
      .then(res => res.json())
      .then(data => setCount(data.count));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>⚡ Green-Block Dashboard</h1>
      <h2>Total Anomalies Stored on Blockchain:</h2>
      <h1>{count}</h1>
    </div>
  );
}

export default App;
