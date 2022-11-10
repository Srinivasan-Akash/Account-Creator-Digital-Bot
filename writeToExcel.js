const writeXlsxFile = require('write-excel-file/node')

async function writeToExcel(arrayOfObjectsOutput) {
    const data = []

    for(row of arrayOfObjectsOutput){
        data.push(row)
    }
    
    await writeXlsxFile(data, {
        filePath: './users.xlsx'
    })
}

module.exports = writeToExcel