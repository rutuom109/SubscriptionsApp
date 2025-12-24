// export function getNextRenewalDate(startDate, cycle) {
//   let date = new Date(startDate);
//   const now = new Date();

//   while (date <= now) {
//     if (cycle === 'Monthly') date.setMonth(date.getMonth() + 1);
//     if (cycle === 'Quarterly') date.setMonth(date.getMonth() + 3);
//     if (cycle === 'Yearly') date.setFullYear(date.getFullYear() + 1);
//   }
//   return date;
// }

// export function daysUntil(date) {
//   const diff = new Date(date) - new Date();
//   return Math.ceil(diff / (1000 * 60 * 60 * 24));
// }



// utils/dateUtils.js
export function getNextRenewalDate(startDate, cycle) {
  let date = new Date(startDate);
  let now = new Date();

  // Normalize both dates to midnight
  date.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  while (date <= now) {
    if (cycle === 'Monthly') date.setMonth(date.getMonth() + 1);
    if (cycle === 'Quarterly') date.setMonth(date.getMonth() + 3);
    if (cycle === 'Yearly') date.setFullYear(date.getFullYear() + 1);
  }

  return date;
}

export function daysUntil(date) {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // normalize to midnight
  const diff = new Date(date) - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
