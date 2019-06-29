export const formatDate = date => {

  const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  const jsDate = new Date(date)

  const day = jsDate.getDate();
  const monthIndex = jsDate.getMonth();
  const year = jsDate.getFullYear();

  return `${day} ${monthNames[monthIndex]} ${year}`;
}
