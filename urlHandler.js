const userURL = require("./index");
console.log(`userURL - ${userURL}`)
const urlList = [];

const arr = userURL.split("?q=");
for (let i = 1; i <= 5; i += 1) {
  urlList.push(`${arr[0]}?p=${i}&q=${arr[1]}`);
}



// console.log(urlList);
module.exports = urlList;
