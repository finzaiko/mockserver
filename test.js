
const fs = require('fs');

const data = []; // put json here

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

data.map((obj) => {
  const randDate = randomDate(new Date(2022, 0, 1), new Date());
  let formatDate = randDate.toISOString().slice(0, 10); // conver to format: yyyy-mm-dd
  return Object.assign(obj, { date: formatDate });
});

// console.log(data);
let dataStr = JSON.stringify(data);
fs.writeFileSync('tmp.json', dataStr);

