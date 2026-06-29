export function calculateStreak(tasks) {
  let completedDates = tasks
    ?.filter((t) => t.completedAt)
    .map((task) => streakDate(new Date(task.completedAt)));

  const uniqueDates = new Set();
  let uniqueCompletedDates = [];
  for (let i = 0; i < completedDates.length; i++) {
    uniqueDates.add(completedDates[i]);
  }
  uniqueCompletedDates = [...uniqueDates].toReversed();

  let temp = 0;
  let today = new Date();
  let yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  today = streakDate(today);
  yesterday = streakDate(yesterday);

  let len = uniqueCompletedDates.length;

  if (len === 0) temp = 0;
  if (len > 0) {
    if (uniqueCompletedDates[0] === today) {
      temp++;
    } else if (uniqueCompletedDates[0] === yesterday) temp++;
    else temp = 0;

    for (let i = 0; i < uniqueCompletedDates.length - 1; i++) {
      let date1 = new Date(uniqueCompletedDates[i]);
      let date2 = new Date(uniqueCompletedDates[i + 1]);
      const diffTime = Math.abs(date1 - date2);
      const diffDays = Number(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        temp += 1;
      } else {
        break;
      }
    }
  }

  return temp;
}

function streakDate(dateNew) {
  const year = dateNew.getFullYear();
  const month = (dateNew.getMonth() + 1).toString().padStart(2, "0");
  const date = dateNew.getDate().toString().padStart(2, "0");

  const properDate = `${year}-${month}-${date}`;
  return properDate;
}
