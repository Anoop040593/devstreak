import { useState, useEffect } from "react";
import moment from "moment";
function DevStreak() {
  const [isCompleted, setIsCompleted] = useState(
    localStorage.getItem("lastCompleted") === moment().format("MMMM Do YYYY"),
  );
  const [streak, setStreak] = useState(0);
  const [isBroken, setIsBroken] = useState(false); //for Breaking streak
  const [isContinuing, setIsContinuing] = useState(false); //for Continuing Streak
  const today = moment().format("MMMM Do YYYY");
  const lastCompletedDate = localStorage.getItem("lastCompleted");
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = moment().subtract(i, "days").format("MMMM Do YYYY");
    if (d === lastCompletedDate) {
      return `${d}: ✅ `;
    } else {
      return `${d}: ❌ `;
    }
  });
  const handleTodaysDate = () => {
    let difference = null;
    let newStreak = 1;

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
    else {
      newStreak = 1;
    }

    localStorage.setItem("lastCompleted", today);
    localStorage.setItem("streakCount", newStreak);
    setIsCompleted(true);
    setStreak(newStreak);
  };

  useEffect(() => {
    const lastCompletedDate = localStorage.getItem("lastCompleted");
    const difference = moment().diff(
      moment(lastCompletedDate, "MMMM Do YYYY"),
      "days",
    );
    //We update the status here as well, so that even after page is refreshed data persists.
    const storedStreak = Number(localStorage.getItem("streakCount")) || 0;
    setStreak(storedStreak);
    if (!lastCompletedDate) {
      setIsBroken(false);
      return;
    }

    if (difference > 1) {
      setIsBroken(true);
      setIsContinuing(false);
    } else {
      setIsBroken(false);
      if (difference === 1 && !isCompleted) setIsContinuing(true);
      else setIsContinuing(false);
    }
  }, []);
  return (
    <div>
      <h1>Dev Streak 🔥</h1>
      {isCompleted && <span>Date: {moment().format("MMMM Do YYYY")}</span>}
      <button onClick={handleTodaysDate} disabled={isCompleted}>
        {isCompleted ? "Done ✅😊" : "Mark Today as Complete? 🔥"}
      </button>
      <p>Streak: {streak} days</p>
      {isBroken && <p>Streak Broken</p>}
      {isContinuing && <p>Continue Streak? 🔥🔥</p>}
      {days.map((day, index) => (
        <p key={index}>{day}</p>
      ))}
    </div>
  );
}

export default DevStreak;
