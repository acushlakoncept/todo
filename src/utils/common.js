const getWeekNumber = (date) => {
  const today = new Date(date);
  const firstDayOfTheYear = new Date(today.getFullYear(), 0, 1);
  const dayOfYear = ((today - firstDayOfTheYear) / 86400000);
  return Math.ceil(dayOfYear / 7);
};

export default getWeekNumber;