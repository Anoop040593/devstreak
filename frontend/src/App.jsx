import "./App.css";
import { useEffect, useState } from "react";
function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    (async function () {
      try {
        const response = await fetch("http://localhost:3000/api/message");
        const messageData = await response.json();
        setMessage(messageData.message);
      } catch (err) {
        console.error("Error Occured", err);
      }
    })();
  }, []);
  return (
    <>
      <h1>DevStreak Dashboard</h1>
      <h3>{message}</h3>
    </>
  );
}

export default App;
