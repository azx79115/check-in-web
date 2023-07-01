const moment = require("moment");

// 減一天
const result = moment().subtract(1, "days").format("YYYY/MM/DD");

console.log(result);
