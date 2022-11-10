const readXlsxFile = require('read-excel-file/node')
const main = require("./registerUserOnWebsite.js")

const arrayOfObjects = []

readXlsxFile('./data.xlsx').then((rows) => {
    rows.shift()
    rows.forEach(row => {
        arrayOfObjects.push({
            gmail: row[0],
            password: row[1].toString(),
            name: row[2],
            age: row[3].toString()
        })
    })
    return arrayOfObjects
})
.then((dataObject) => {
    main(dataObject)
})