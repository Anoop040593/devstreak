import { useState, useEffect } from "react";
import moment from "moment";
function DevStreak() {
  // const [isCompleted, setIsCompleted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(
    localStorage.getItem("lastCompleted") === moment().format("MMMM Do YYYY"),
  );
  // const [done, setDone] = useState("Mark Today as Complete?");
  const [streak, setStreak] = useState(0);
  const today = moment().format("MMMM Do YYYY");
  // const isCompleted = localStorage.getItem("lastCompleted") === today;

  const handleTodaysDate = () => {
    let newStreak = 1;
    let difference = null;
    const lastCompletedDate = localStorage.getItem("lastCompleted");
    const prevStreak = Number(localStorage.getItem("streakCount")) || 0;
    if (lastCompletedDate) {
      difference = moment().diff(
        moment(lastCompletedDate, "MMMM Do YYYY"),
        "days",
      );
    }
    if (!lastCompletedDate) newStreak = 1;
    else if (difference === 1) newStreak = prevStreak + 1;
    else if (difference === 0) newStreak = prevStreak;
    else newStreak = 1;

    localStorage.setItem("lastCompleted", today);
    localStorage.setItem("streakCount", newStreak);
    setIsCompleted(true);
    // setDone("Done!");
    setStreak(newStreak);
  };

  useEffect(() => {
    //We update the status here as well, so that even after page is refreshed data persists.
    const storedStreak = Number(localStorage.getItem("streakCount")) || 0;
    setStreak(storedStreak);
    // if (today === lastCompletedDate) {
    //   // setDone("Done!");
    // setIsCompleted(true);
    // }
  }, []);
  return (
    <div>
      <h1>Dev Streak 🔥</h1>
      {isCompleted && <span>Date: {moment().format("MMMM Do YYYY")}</span>}
      <button onClick={handleTodaysDate} disabled={isCompleted}>
        {isCompleted ? "Done ✅😊" : "Mark Today as Complete? 🔥"}
      </button>
      <p>Streak: {streak} days</p>
    </div>
  );
}

export default DevStreak;
