// creating list of years
export const yearsList = [];
const currentYear = new Date().getFullYear();
for (let i = currentYear; i >= 1999; i--) yearsList.push(i);
