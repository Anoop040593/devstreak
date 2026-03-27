import { useState, useEffect } from "react";
import moment from "moment";
function DevStreak() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [done, setDone] = useState("Mark Today as Complete?");
  const handleTodaysDate = () => {
    setIsCompleted(true);
    setDone("Done!");
    localStorage.setItem("lastCompleted", moment().format("MMMM Do YYYY"));
  };

  useEffect(() => {
    //We update the status here as well, so that even after page is refreshed data persists.
    const lastCompletedDate = localStorage.getItem("lastCompleted");
    const today = moment().format("MMMM Do YYYY");
    if (today === lastCompletedDate) {
      setDone("Done!");
      setIsCompleted(true);
    }
  }, []);
  return (
    <div>
      <h1>Dev Streak 🔥</h1>
      {isCompleted && <span>Date: {moment().format("MMMM Do YYYY")}</span>}
      <button onClick={handleTodaysDate} disabled={isCompleted}>
        ✅ {done}
      </button>
    </div>
  );
}

export default DevStreak;
