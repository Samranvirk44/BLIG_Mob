const moment = require("moment")

let name = new Date()
let x = new Date()
var date2 = new Date('12-06-2019');
let v = setInterval(() => {

    setTimeout(() => {
        clearInterval(v)
        }, 3000);
    var date1 = new Date();
    console.log(date1.getSeconds() - date2.getSeconds())
}, 1000);