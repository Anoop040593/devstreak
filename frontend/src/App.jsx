import "./App.css";
import { useEffect, useState } from "react";
function App() {
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchMessage() {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/message");
      const messageData = await response.json();
      setMessage((prev) => {
        return [...prev, messageData.message];
      });
      setLoading(false);
    } catch (err) {
      console.error("Error Occured", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <>
      <h1>DevStreak Dashboard</h1>
      <button onClick={fetchMessage}>Refresh Message</button>
      <h3>
        {loading ? (
          <span>Loading...</span>
        ) : (
          message.map((m, index) => <div key={index}>{m}</div>)
        )}
      </h3>
    </>
  );
}

export default App;
